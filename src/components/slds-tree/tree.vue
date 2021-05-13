<template>
    <div class="slds-tree_container">

        <!-- Heading -->
        <h4 v-if="header" class="slds-tree__group-header slds-truncate slds-p-horizontal_small">
            {{ header }}
        </h4>

        <!-- Items -->
        <tree-item
            v-if="hasChildren"
            is-root
            :node-key="key"
            :child-items="childNodes"
            :focused-child="focusedChild"
            :selected-key="selectedItem ? selectedItem.key : null"
            aria-labelledby="treeheading"
            @select="onSelect"
            @toggle="onToggle"
            @keydown="onKeydownDown"
            @keydown.up="onKeydownUp"
            @keydown.left="onKeydownLeft"
            @keydown.right="onKeydownRight"
        />

    </div>
</template>

<script>
import TreeItem from './tree-item'
import {TreeData} from './tree-data'

export default {
    name: "SldsTree",

    components: {
        TreeItem
    },

    props: {
        header: String,
        items: {
            type: Array,
            default: () => []
        },
        selectedItem: Object,
    },

    data() {
        return {
            callbackMap: {},
            childNodes: null,
            currentFocusedItem: null,
            defaultFocused: {key: '1', parent: '0'},
            focusedChild: null,
            hasDetachedListeners: true,
            key: null,
            normalizedItems: [],
        }
    },

    computed: {
        hasChildren() {
            return this.items && this.items.length > 0
        }
    },

    watch: {
        items: {
            handler: function (value) {
                this.normalizeData(value)
            },
            deep: true
        },

        selectedItem(item) {
            console.log('watch selectedItem', item)
            this.currentFocusedItem = this.treedata.updateCurrentFocusedItemIndex(item.index)
        }
    },

    created() {
        this.normalizeData(this.items)
    },

    methods: {
        collapseBranch(node) {
            if (node.isLeaf || node.isDisabled) return

            node.nodeRef.expanded = false
            this.treedata.updateVisibleTreeItemsOnCollapse(node.key)
        },

        expandBranch(node) {
            if (node.isLeaf || node.isDisabled) return;

            node.nodeRef.expanded = true
        },

        normalizeData(items) {
            if (items == null || items.length === 0) return;

            this.treedata = new TreeData()
            this.normalizedItems = items.map(item => this.treedata.cloneItems(item))

            const treeRoot = this.treedata.parse(this.items, this.selectedItem)
            this.childNodes = treeRoot ? treeRoot.children : []
            //this.selectedItem = treeRoot.selectedItem
            this.key = this.childNodes.length > 0 ? treeRoot.key : null
            if (this.key) this.syncCurrentFocused();
        },

        // eslint-disable-next-line no-unused-vars
        onKeydownDown(event, key) {
            const nextNode = this.treedata.findNextNodeToFocus()
            if (nextNode && nextNode.index !== -1) this.setFocusToItem(nextNode)
        },

        onKeydownLeft(event, key) {
            console.log(event, key)
        },

        onKeydownRight(event, key) {
            console.log(event, key)
        },

        // eslint-disable-next-line no-unused-vars
        onKeydownUp(event, key) {
            const prevNode = this.treedata.findPrevNodeToFocus()
            if (prevNode && prevNode.index !== -1) this.setFocusToItem(prevNode)
        },

        onSelect(key) {
            const item = this.treedata.getItem(key)
            if (item != null) this.setFocusToItem(item)
        },

        onToggle(key) {
            const item = this.treedata.getItem(key)

            if (item.treeNode.nodeRef.expanded) this.collapseBranch(item.treeNode)
            else this.expandBranch(item.treeNode)
        },

        // eslint-disable-next-line no-unused-vars
        setFocusToItem(item, shouldFocus = true, shouldSelect = true) {
            if (item == null) return

            const index = this.treedata.findIndex(item.key)
            console.log(index)
            this.currentFocusedItem = this.treedata.updateCurrentFocusedItemIndex(index)
            if (shouldSelect) this.$emit('select', item.treeNode)
        },

        syncCurrentFocused() {
            if (this.selectedItem) this.currentFocusedItem = this.selectedItem;
            else this.currentFocusedItem = this.defaultFocused

            this.updateCurrentFocusedChild()
        },

        updateCurrentFocusedChild() {
            if (this.key === this.currentFocusedItem.parent) {
                this.focusedChild = this.treedata.getChildNum(this.currentFocusedItem.key)
            }
            else {
                this.focusedChild = this.currentFocusedItem.key;
                this.treedata.updateCurrentFocusedChild(this.currentFocusedItem.key)
            }
        }
    }
}
</script>
