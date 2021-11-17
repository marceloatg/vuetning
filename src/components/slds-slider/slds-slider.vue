<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" for="slider-id-01">
            <span class="slds-slider-label">
                <span class="slds-slider-label__label">Slider Label</span>
                <span class="slds-slider-label__range">0 - 100</span>
            </span>
        </label>
        <div class="slds-form-element__control">
            <div class="slds-slider">
                <input id="slider-id-01" type="range" class="slds-slider__range" value="50">
                <span class="slds-slider__value" aria-hidden="true">50</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SldsSlider'
}
</script>

<style scoped>

</style>
