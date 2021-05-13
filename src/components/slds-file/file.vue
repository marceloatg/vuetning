<template>
    <div style="width:20rem">
        <div class="slds-file slds-file_card slds-has-title">
            <figure>
                <a href="javascript:void(0);" class="slds-file__crop">
                    <span class="slds-assistive-text">Preview:</span>
                    <img src="/assets/images/placeholder-img@16x9.jpg" alt="Description of the image">
                </a>
                <figcaption class="slds-file__title slds-file__title_card">
                    <div class="slds-media slds-media_small slds-media_center">
                        <div class="slds-media__figure slds-line-height_reset">
                            <span class="slds-icon_container" title="pdf">
                                <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                                    <use xlink:href="/assets/icons/doctype-sprite/svg/symbols.svg#pdf"/>
                                </svg>
                                <span class="slds-assistive-text">pdf</span>
                            </span>
                        </div>
                        <div class="slds-media__body">
                            <span class="slds-file__text slds-truncate" title="Proposal.pdf">Proposal.pdf</span>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </div>
</template>

<script>
export default {
    name: "SldsFile"
}
</script>

<style scoped>

</style>
