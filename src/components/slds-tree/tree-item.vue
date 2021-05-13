<template>

    <!-- Root -->
    <ul
        v-if="isRoot"
        role="tree"
        class="slds-tree"
        aria-labelledby="ariaLabelledby"
    >
        <slds-tree-item
            v-for="(item) in children"
            :key="item.node.key"
            :data-key="item.node.key"
            :node-key="item.node.key"
            :aria-level="item.node.level"
            :aria-label="(item.node.isLeaf) ? null : item.node.label"
            :aria-expanded="(item.node.isLeaf) ? null : item.node.strexpanded"
            :aria-disabled="(item.node.isLeaf) ? null : item.node.isDisabled"
            :label="item.node.label"
            :href="item.node.href"
            :meta-text="item.node.metatext"
            :node-ref="item.node.nodeRef"
            :is-expanded="item.node.isExpanded"
            :is-disabled="item.node.isDisabled"
            :focused-child="item.node.focusedChild"
            :node-name="item.node.name"
            :is-leaf="item.node.isLeaf"
            :child-items="item.node.children"
            :selected-key="selectedKey"
            @select="onClickItem"
            @toggle="onClickToggle"
            @keydown="onKeydown"
        />
    </ul>

    <!-- Item -->
    <li
        v-else
        role="treeitem"
        :aria-level="ariaLevel"
        :aria-selected="isSelected"
        @keydown="onKeydown"
    >
        <div class="slds-tree__item" @click="onClickItem(nodeKey)">

            <!-- Expand/Collapse button -->
            <slds-button-icon
                v-if="!isLeaf && !isDisabled"
                :icon="ariaExpanded === 'true' ? 'utility:chevrondown': 'utility:chevronright'"
                :assistive-text="buttonLabel"
                class="slds-m-right_x-small"
                @click.stop="onClickToggle(nodeKey)"
            />

            <!-- Content -->
            <span class="slds-has-flexi-truncate">

                <!-- Disabled content -->
                <span v-if="isDisabled">
                    Foo
                </span>

                <!-- Content -->
                <a
                    v-else
                    tabindex="-1"
                    role="presentation"
                >

                    <!-- Label -->
                    <span class="slds-tree__item-label slds-truncate unselectable" :title="label">
                        {{ label }}
                    </span>

                    <!-- Meta text -->
                    <template v-if="metaText">
                        <span class="slds-tree__item-meta slds-truncate unselectable" :title="metaText">
                            <span class="slds-assistive-text">:</span>{{ metaText }}
                        </span>
                    </template>

                </a>

            </span>

        </div>
    </li>

    <template v-if="showExpanded">
        <div role="group">
            <slds-tree-item
                v-for="item in children"
                :key="item.node.key"
                :data-key="item.node.key"
                :node-key="item.node.key"
                :aria-level="item.node.level"
                :aria-disabled="item.node.isDisabled"
                :label="item.node.label"
                :href="item.node.href"
                :meta-text="item.node.metatext"
                :node-ref="item.node.nodeRef"
                :is-expanded="item.node.isExpanded"
                :is-disabled="item.node.isDisabled"
                :focused-child="item.node.focusedChild"
                :node-name="item.node.name"
                :is-leaf="item.node.isLeaf"
                :child-items="item.node.children"
                :aria-label="(item.node.isLeaf) ? null : item.node.label"
                :aria-expanded="(item.node.isLeaf) ? null : item.node.strexpanded"
                :selected-key="selectedKey"
                @select="onClickItem"
                @toggle="onClickToggle"
                @keydown="onKeydown"
            />
        </div>
    </template>

</template>

<script>
import SldsButtonIcon from '../slds-button-icon/button-icon.vue'

export default {
    name: "SldsTreeItem",

    components: {
        SldsButtonIcon
    },

    emits: ['keydown', 'select', 'toggle'],

    props: {
        ariaDisabled: Boolean,
        ariaExpanded: [Boolean, String],
        ariaLabel: String,
        ariaLabelledby: String,
        ariaLevel: Number,
        childItems: Array,
        dataKey: String,
        focusedChild: [Number, String],
        isDisabled: Boolean,
        isExpanded: Boolean,
        isLeaf: Boolean,
        isRoot: Boolean,
        href: String,
        label: String,
        metaText: String,
        nodeKey: String,
        nodeName: String,
        nodeRef: Object,
        selectedKey: String,
    },

    data() {
        return {
            tabIndexes: {},
            selected: {}
        }
    },

    computed: {
        buttonLabel() {
            if (this.nodeRef && this.nodeRef.expanded) return 'Collapse Tree Branch';
            return 'Expand Tree Branch';
        },

        children() {
            return this.childItems.map((child, index) => {
                return {
                    node: child,
                    tabindex: this.tabIndexes[index]
                }
            })
        },

        isSelected() {
            return (this.nodeKey === this.selectedKey)
        },

        showExpanded() {
            if (!this.nodeRef) return false
            return (!this.isDisabled && this.nodeRef.expanded)
        }
    },

    methods: {
        onClickItem(nodeKey) {
            this.$emit('select', nodeKey)
        },

        onClickToggle(nodeKey) {
            this.$emit('toggle', nodeKey)
        },

        onKeydown(event, key = null) {
            if (key === null) key = this.nodeKey
            this.$emit('keydown', event, key)
        }
    }
}
</script>

<style>
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
