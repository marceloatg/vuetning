<template>
    <div class="table-view_header slds-shrink-none">

        <!-- First row -->
        <div class="slds-grid">

            <!-- Text -->
            <div class="slds-col slds-has-flexi-truncate">
                <div class="slds-media slds-no-space slds-grow">

                    <!-- Figure -->
                    <div class="slds-media__figure">
                        <slds-icon :icon-name="figure.name" :icon-class="adjustmentClass" :class="figure.color"/>
                    </div>

                    <!-- Body -->
                    <div class="slds-media__body slds-align-middle">
                        <nav>
                            <ol class="slds-breadcrumb slds-list_horizontal">
                                <li class="slds-breadcrumb__item slds-line-height_reset">
                                    {{ title }}
                                </li>
                            </ol>
                        </nav>
                        <h1 class="slds-page-header__title slds-text-color--default slds-p-right-x-small">
                            <div class="slds-button slds-button--reset slds-type-focus slds-truncate">
                                {{ listViews }}
                                <a class="slds-m-top_xxx-small slds-p-right_xxx-small">
                                    <slds-svg icon-name="utility:down" class="slds-icon slds-icon-text-default slds-icon_x-small"/>
                                </a>
                            </div>
                        </h1>
                    </div>

                </div>
            </div>

            <!-- Actions -->
            <slot name="actions"/>

        </div>

        <!-- Second row -->
        <div class="slds-grid ">

            <!-- Details -->
            <div class="slds-col slds-align-bottom">
                <p v-if="initialized" class="slds-text-body_small">
                    {{ count }} items • Updated {{ relativeUpdatedTime }}
                </p>
            </div>

            <!-- Search input -->
            <div class="slds-col slds-no-flex slds-grid slds-align-bottom slds-shrink">
                <div class="slds-form-element">
                    <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                        <slds-svg icon-name="utility:search" class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"/>
                        <input
                            class="slds-input"
                            type="text"
                            value=""
                            placeholder="Search this list...">
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="slds-col slds-no-flex slds-grid slds-align-bottom">
                <div class="slds-m-left_xx-small">

                    <!-- Filter -->
                    <slds-button-icon icon-name="utility:filterList" @click="onFilter"/>

                    <!-- Refresh -->
                    <slds-button-icon icon-name="utility:refresh" :disabled="refreshing" @click="onRefresh"/>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            count: {
                type: Number,
                required: true,
            },
            figure: {
                type: Object,
                required: true,
            },
            initialized: {
                type: Boolean,
                required: true,
            },
            listViews: {
                type: String,
                required: true,
            },
            refreshing: {
                type: Boolean,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            updateTime: {
                type: Number,
            },
        },
        data() {
            return {
                relativeUpdatedTime: null,
            }
        },
        computed: {
            adjustmentClass() {
                const iconName = this.figure.name;
                if (iconName == null) return null;
                if (iconName.startsWith('utility')) return 'utility-category-adjustment';
                return null;
            },
        },
        watch: {
            initialized: function (newValue, oldValue) {
                if (newValue === false || oldValue === true) return;
                this.relativeUpdatedTime = moment(this.updateTime).fromNow();
            },
            updateTime: function (newValue) {
                this.relativeUpdatedTime = moment(newValue).fromNow();
            },
        },
        created() {
            if (this.updateTime != null) this.relativeUpdatedTime = moment(this.updateTime).fromNow();
            setInterval(this.updateRelativeUpdatedTime, 60000);
        },
        destroyed() {
            clearInterval(this.updateTime);
        },
        methods: {
            onFilter() {
                this.$emit('filter');
            },
            onRefresh() {
                this.$emit('refresh');
            },
            updateRelativeUpdatedTime() {
                if (this.updateTime == null) return;
                this.relativeUpdatedTime = moment(this.updateTime).fromNow();
            },
        },
    }
</script>

<style scoped lang="scss">
    .table-view_header {
        padding: 1rem 1rem 0.75rem 1rem;
        background: #f3f2f2;
        background-clip: padding-box;
        border: 1px solid #dddbda;
        border-radius: 0.25rem 0.25rem 0 0;

        .slds-icon.utility {
            padding: 5px;
        }
    }
</style>
