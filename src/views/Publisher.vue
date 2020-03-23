<template>
    <article class="slds-card">
        <div class="slds-card__body slds-card__body_inner">
            <slds-publisher label="To: My followers" placeholder="Write a comment..." rich-text>
                <template #actions>

                    <!-- Mention people and groups -->
                    <slds-button-icon bare icon="utility:adduser" title="Mention people and groups"/>

                    <!-- Reference records -->
                    <slds-button-icon bare icon="utility:topic2" title="Reference records"/>

                    <!-- Attach files -->
                    <slds-button-icon bare icon="utility:attach" title="Attach files"/>

                </template>
            </slds-publisher>
        </div>
    </article>
</template>
