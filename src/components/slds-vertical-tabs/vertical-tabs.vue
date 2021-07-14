<template>
    <div class="slds-vertical-tabs">
        <ul class="slds-vertical-tabs__nav" role="tablist" aria-orientation="vertical">
            <li class="slds-vertical-tabs__nav-item slds-is-active" title="Tab 1" role="presentation">
                <a
                    id="slds-vertical-tabs-0__nav"
                    class="slds-vertical-tabs__link"
                    href="javascript:void(0)"
                    role="tab"
                    tabindex="0"
                    aria-selected="true"
                    aria-controls="slds-vertical-tabs-0">
                    <span class="slds-vertical-tabs__left-icon"/>
                    <span class="slds-truncate" title="Tab 1">Tab 1</span>
                    <span class="slds-vertical-tabs__right-icon"/>
                </a>
            </li>
            <li class="slds-vertical-tabs__nav-item" title="Tab 2" role="presentation">
                <a
                    id="slds-vertical-tabs-1__nav"
                    class="slds-vertical-tabs__link"
                    href="javascript:void(0)"
                    role="tab"
                    tabindex="-1"
                    aria-selected="false"
                    aria-controls="slds-vertical-tabs-1">
                    <span class="slds-vertical-tabs__left-icon"/>
                    <span class="slds-truncate" title="Tab 2">Tab 2</span>
                    <span class="slds-vertical-tabs__right-icon"/>
                </a>
            </li>
            <li class="slds-vertical-tabs__nav-item" title="Tab 3 has a really long label and can wrap or truncate" role="presentation">
                <a
                    id="slds-vertical-tabs-2__nav"
                    class="slds-vertical-tabs__link"
                    href="javascript:void(0)"
                    role="tab"
                    tabindex="-1"
                    aria-selected="false"
                    aria-controls="slds-vertical-tabs-2">
                    <span class="slds-vertical-tabs__left-icon"/>
                    <span class="slds-truncate" title="Tab 3 has a really long label and can wrap or truncate">Tab 3 has a really long label and can wrap or truncate</span>
                    <span class="slds-vertical-tabs__right-icon"/>
                </a>
            </li>
        </ul>
        <div id="slds-vertical-tabs-0" class="slds-vertical-tabs__content slds-show" role="tabpanel" aria-labelledby="slds-vertical-tabs-0__nav">
            <div class="slds-text-longform">
                <h3 class="slds-text-heading_medium">
                    Tab Title
                </h3>
                <p>Content for Tab 1</p>
                <p>Lorem ipsum dolor...</p>
                <p>Lorem ipsum dolor...</p>
            </div>
        </div>
        <div id="slds-vertical-tabs-1" class="slds-vertical-tabs__content slds-hide" role="tabpanel" aria-labelledby="slds-vertical-tabs-1__nav">
            <div class="slds-text-longform">
                <h3 class="slds-text-heading_medium">
                    Tab Title
                </h3>
                <p>Content for Tab 1</p>
                <p>Lorem ipsum dolor...</p>
                <p>Lorem ipsum dolor...</p>
            </div>
        </div>
        <div id="slds-vertical-tabs-2" class="slds-vertical-tabs__content slds-hide" role="tabpanel" aria-labelledby="slds-vertical-tabs-2__nav">
            <div class="slds-text-longform">
                <h3 class="slds-text-heading_medium">
                    Tab Title
                </h3>
                <p>Content for Tab 1</p>
                <p>Lorem ipsum dolor...</p>
                <p>Lorem ipsum dolor...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsVerticalTabs"
}
</script>

<style scoped>

</style>
