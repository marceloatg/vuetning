<template>
    <li class="slds-global-actions__item">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
            <button
                class="slds-button slds-global-actions__avatar slds-global-actions__item-action"
                :title="title"
                aria-haspopup="true"
            >
                <span class="slds-avatar slds-avatar_circle slds-avatar_medium">
                    <img :alt="alt" :src="src" :title="title">
                </span>
            </button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SldsGlobalActionAvatar',

    props: {
        alt: String,
        src: {type: String, required: true},
        title: String
    }
}
</script>

