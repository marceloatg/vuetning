<template>
    <div class="slds-tabs_scoped">
        <ul class="slds-tabs_scoped__nav" role="tablist">
            <li class="slds-tabs_scoped__item slds-is-active" title="Item One" role="presentation">
                <a
                    id="tab-scoped-1__item"
                    class="slds-tabs_scoped__link"
                    href="javascript:void(0);"
                    role="tab"
                    tabindex="0"
                    aria-selected="true"
                    aria-controls="tab-scoped-1">
                    Item One
                </a>
            </li>
            <li class="slds-tabs_scoped__item" title="Item Two" role="presentation">
                <a
                    id="tab-scoped-2__item"
                    class="slds-tabs_scoped__link"
                    href="javascript:void(0);"
                    role="tab"
                    tabindex="-1"
                    aria-selected="false"
                    aria-controls="tab-scoped-2">
                    Item Two
                </a>
            </li>
            <li class="slds-tabs_scoped__item" title="Item Three" role="presentation">
                <a
                    id="tab-scoped-3__item"
                    class="slds-tabs_scoped__link"
                    href="javascript:void(0);"
                    role="tab"
                    tabindex="-1"
                    aria-selected="false"
                    aria-controls="tab-scoped-3">
                    Item Three
                </a>
            </li>
        </ul>
        <div id="tab-scoped-1" class="slds-tabs_scoped__content slds-show" role="tabpanel" aria-labelledby="tab-scoped-1__item">
            Item One Content
        </div>
        <div id="tab-scoped-2" class="slds-tabs_scoped__content slds-hide" role="tabpanel" aria-labelledby="tab-scoped-2__item">
            Item Two Content
        </div>
        <div id="tab-scoped-3" class="slds-tabs_scoped__content slds-hide" role="tabpanel" aria-labelledby="tab-scoped-3__item">
            Item Three Content
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsScopedTabs"
}
</script>

<style scoped>

</style>
