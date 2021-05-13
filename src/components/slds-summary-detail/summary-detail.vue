<template>
    <div class="slds-summary-detail slds-is-open">
        <button class="slds-button slds-button_icon slds-m-right_x-small" title="Toggle details for Summary Title" aria-controls="expando-unique-id" aria-expanded="true">
            <svg class="slds-button__icon slds-summary-detail__action-icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
            </svg>
            <span class="slds-assistive-text">Toggle details for Summary Title</span>
        </button>
        <div>
            <div class="slds-summary-detail__title">
                <h3 class="slds-text-heading_small slds-truncate" title="summary title">
                    Summary Title
                </h3>
            </div>
            <div id="expando-unique-id" aria-hidden="false" class="slds-summary-detail__content">
                <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsSummaryDetail"
}
</script>

<style scoped>

</style>
