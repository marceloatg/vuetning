<template>
    <main>

        <slds-page-header
            record-home
            icon="standard:lightning_component"
            title="Vertical Navigation"
            details="Components"
        >
            <template #details>
                Navigation represents a list of links that either take the user to another page or parts of the page the
                user is in.
            </template>
        </slds-page-header>

        <slds-card class="slds-m-top_medium">
            <slds-vertical-navigation has-quickfind selected-item="recent">

                <slds-vertical-navigation-section title="Reports">
                    <slds-vertical-navigation-item label="Recent" name="recent" badge="3"/>
                    <slds-vertical-navigation-item label="Created by Me" name="created"/>
                    <slds-vertical-navigation-item label="Private Reports" name="private"/>
                    <slds-vertical-navigation-item label="Public Reports" name="public"/>
                    <slds-vertical-navigation-item label="All Reports" name="all"/>
                </slds-vertical-navigation-section>

                <slds-vertical-navigation-section title="Folders">
                    <slds-vertical-navigation-item label="Created by Me" name="created-by-me" icon="utility:open_folder"/>
                    <slds-vertical-navigation-item label="Shared with Me" name="shared-with-me" icon="utility:open_folder"/>
                    <slds-vertical-navigation-item label="All Reports" name="all-reports"/>
                </slds-vertical-navigation-section>

            </slds-vertical-navigation>
        </slds-card>

    </main>
</template>

<script>
import SldsVerticalNavigationSection from "@/components/slds-vertical-navigation/vertical-navigation-section";
import SldsVerticalNavigationItem from "@/components/slds-vertical-navigation/vertical-navigation-item";

export default {
    name: "VerticalNavigation",
    components: {SldsVerticalNavigationItem, SldsVerticalNavigationSection},
}
</script>
