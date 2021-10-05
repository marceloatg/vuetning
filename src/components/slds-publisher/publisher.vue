<template>
    <div class="slds-publisher">
        <label for="comment-text-input2" class="slds-publisher__toggle-visibility slds-m-bottom_small">
            <span class="slds-assistive-text">Write a comment</span>To: My followers</label>
        <textarea id="comment-text-input2" class="slds-publisher__input slds-textarea slds-text-longform" placeholder="Write a comment…"/>
        <div class="slds-publisher__actions slds-grid slds-grid_align-spread">
            <ul class="slds-grid slds-publisher__toggle-visibility">
                <li>
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Add User">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#adduser"/>
                        </svg>
                        <span class="slds-assistive-text">Add User</span>
                    </button>
                </li>
                <li>
                    <button class="slds-button slds-button_icon slds-button_icon-container" title="Attach a file">
                        <svg class="slds-button__icon" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#attach"/>
                        </svg>
                        <span class="slds-assistive-text">Attach a file</span>
                    </button>
                </li>
            </ul>
            <button class="slds-button slds-button_brand">
                Share
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SldsPublisher'
}
</script>

<style scoped>

</style>
