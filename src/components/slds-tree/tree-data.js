import {getTreeNode} from './tree-node'

export class TreeData {
    constructor() {
        this._currentFocusedItemIndex = 0
        this._treeItemsInTraversalOrder = []
        this._visibleTreeItems = null
        this._indices = {}
        this._nameKeyMapping = {}
    }

    get treeItemsInTraversalOrder() {
        return this._treeItemsInTraversalOrder
    }

    get visibleTreeItems() {
        return this._visibleTreeItems
    }

    get currentFocusedItemIndex() {
        return this._currentFocusedItemIndex
    }

    get indices() {
        return this._indices
    }

    get nameKeyMapping() {
        return this._nameKeyMapping
    }

    syncSelectedToData(itemName) {
        if (itemName) {
            const item = this.getItemFromName(itemName)

            if (item) {
                this.updateExpanded(item.key)
                return item
            }
        }

        return null
    }

    syncDataToSelected(node) {
        this.updateExpanded(node.key)
    }

    cloneItems(item) {
        const newItem = {
            label: item.label,
            name: item.name,
            expanded: item.expanded,
            metatext: item.metatext,
            href: item.href,
            disabled: item.disabled,
            items: []
        }

        if (item.items && item.items.length > 0) {
            newItem.items = item.items.map(leaf => this.cloneItems(leaf))
        }

        return newItem
    }

    parse(data, selected) {
        const root = {}
        root.items = data
        const seen = new WeakSet()
        let _selectedItem = null

        function buildTree(currentNode, parent, level, childNum) {
            if (!isNodeValid(currentNode, level)) return null

            const node = getTreeNode(
                currentNode,
                level,
                parent ? parent.key : null,
                childNum + 1
            )

            if (parent && parent.visible && parent.isExpanded && !parent.isDisabled) {
                node.visible = true
            }

            level++
            seen.add(currentNode)

            if (node.key && parent) {
                this.treeItemsInTraversalOrder.push(node.key)
                const indexedObj = {
                    index: this.treeItemsInTraversalOrder.length - 1,
                    key: node.key,
                    parent: parent.key,
                    level: node.level,
                    treeNode: node
                }

                this.indices[node.key] = indexedObj
                this.nameKeyMapping[node.name] = node.key
                if (node.name === selected) {
                    this.syncDataToSelected(
                        node,
                        indexedObj.index,
                        selected
                    )

                    _selectedItem = indexedObj
                }
            }

            if (
                // eslint-disable-next-line no-prototype-builtins
                currentNode.hasOwnProperty('items') &&
                Array.isArray(currentNode.items)
            ) {
                for (
                    let i = 0, length = currentNode.items.length;
                    i < length;
                    i++
                ) {
                    const buildTreeFn = buildTree.bind(this)
                    buildTreeFn(currentNode.items[i], node, level, i)
                }
            }

            if (parent) {
                parent.children.push(node)
                if (node.visible) {
                    parent.visibleItems.push(node.key)
                    parent.visibleItems.push.apply(
                        parent.visibleItems,
                        node.visibleItems
                    )
                }
                level--
            }

            seen.delete(currentNode)
            return node
        }

        function isNodeValid(currentNode, level) {
            const hasCycle = seen.has(currentNode)
            const hasLabel = level === 0 ? true : !!currentNode.label

            if (hasCycle) console.warn(`Data passed to lightning:tree has circular reference. Skipping the node`)
            if (!hasLabel) console.warn(`The node passed to lightning:tree has empty label. Skipping the node`)

            return !hasCycle && hasLabel
        }

        const buildTreeFn = buildTree.bind(this)
        const tree = buildTreeFn(root, null, 0, 1)
        if (tree) {
            this._visibleTreeItems = new Set()
            tree.visibleItems.forEach((item) => {
                this._visibleTreeItems.add(item)
            })
            tree.selectedItem = _selectedItem
            return tree
        }

        return null
    }

    updateExpanded(key) {
        const node = this._indices[key]
        if (node == null) return;

        let parentKey = node.parent
        let parentNode = this._indices[parentKey]

        while (parentKey && parentKey !== '0' && parentNode) {
            parentKey = parentNode.parent
            parentNode = parentNode.treeNode
            if (!parentNode.nodeRef.expanded) parentNode.nodeRef.expanded = true
            parentNode = this._indices[parentKey]
        }
    }

    isVisible(treeItem) {
        return this.visibleTreeItems.has(treeItem)
    }

    findNextNodeToFocus() {
        const current = this.currentFocusedItemIndex
        const treeItems = this.treeItemsInTraversalOrder
        let nextNode = null
        if (current < treeItems.length - 1) {
            for (let i = current + 1; i < treeItems.length; i++) {
                if (this.isVisible(treeItems[i])) {
                    nextNode = treeItems[i]
                    break
                }
            }
        }

        return this.indices[nextNode]
    }

    findPrevNodeToFocus() {
        const current = this.currentFocusedItemIndex
        const treeItems = this.treeItemsInTraversalOrder
        let prevNode = null

        if (current > 0) {
            for (let i = current - 1; i >= 0; i--) {
                if (this.isVisible(treeItems[i])) {
                    prevNode = treeItems[i]
                    break
                }
            }
        }

        return this.indices[prevNode]
    }

    findFirstNodeToFocus() {
        return this.indices[this.treeItemsInTraversalOrder[0]]
    }

    findLastNodeToFocus() {
        let lastNode = null
        const treeItems = this.treeItemsInTraversalOrder

        for (let i = treeItems.length - 1; i >= 0; i--) {
            if (!this.isVisible(treeItems[i])) continue;
            lastNode = treeItems[i]
            break
        }

        return this.indices[lastNode]
    }

    getItem(key) {
        return this.indices[key]
    }

    getItemAtIndex(index) {
        if (index < -1 || index > this.treeItemsInTraversalOrder.length) return null
        return this.indices[this.treeItemsInTraversalOrder[index]]
    }

    getItemFromName(itemName) {
        if (typeof itemName !== 'string') return null

        const itemKey = this.nameKeyMapping[itemName]
        if (itemKey) return this.getItem(itemKey)
    }

    addVisible(child) {
        this.visibleTreeItems.add(child)
    }

    removeVisible(child) {
        this.visibleTreeItems.delete(child)
    }

    updateVisibleTreeItemsOnCollapse(branchCollapsed) {
        const treeItems = this.treeItemsInTraversalOrder
        const branchItem = this.getItem(branchCollapsed)
        const branchKeyIndex = branchItem.index
        const branchLevel = branchItem.level
        let level, child = null

        for (let i = branchKeyIndex + 1; i < treeItems.length; i++) {
            child = this.getItem(treeItems[i])
            level = child.level

            if (level <= branchLevel) break

            this.visibleTreeItems.delete(treeItems[i])
        }
    }

    updateCurrentFocusedChild(focusedKey) {
        const item = this.getItem(focusedKey)

        if (item) {
            const parent = this.getItem(item.parent)
            if (parent) parent.treeNode.focusedChild = this.getChildNum(item.key)
        }
    }

    updateCurrentFocusedItemIndex(focused) {
        if (focused > -1 && focused < this.treeItemsInTraversalOrder.length) {
            this._currentFocusedItemIndex = focused
            return this.getItemAtIndex(this.currentFocusedItemIndex)
        }

        this._currentFocusedItemIndex = 0
        return null
    }

    isValidCurrent(currentFocusedItem) {
        return !!(
            currentFocusedItem.index &&
            this.getItemAtIndex(currentFocusedItem.index)
        )
    }

    isCurrentFocusedNode(key) {
        return this.findIndex(key) === this.currentFocusedItemIndex
    }

    findIndex(key) {
        return this.indices[key] !== undefined ? this.indices[key].index : -1
    }

    getChildNum(key) {
        const idx = key.lastIndexOf('.')
        return idx > -1
            ? parseInt(key.substring(idx + 1), 10) - 1
            : parseInt(key, 10) - 1
    }
}
