<template>
    <table-view :model="model">
        <div slot="header-actions" class="slds-col slds-no-flex slds-grid slds-align-top slds-p-bottom_xx-small">
            <div class="slds-button-group">
                <slds-button label="Add" icon-name="utility:add"/>
            </div>
        </div>
    </table-view>
</template>

<script>
    import Column from "../classes/Column";
    import TableView from "./TableView/Index";

    export default {
        name: 'Components',
        components: {
            TableView
        },
        data() {
            return {
                model: {
                    initialized: true,
                    figure: {
                        name: 'standard:all',
                        color: null,
                    },
                    title: 'Components',
                    listViews: 'All components',
                    columns: [
                        new Column('access', '', 'button', {
                            sortable: false,
                            fixedWidth: 100,
                            textAlign: 'center',
                            typeAttributes: {
                                label: 'Access',
                                variant: 'outline-brand',
                                class: 'slds-button_in-table',
                            }
                        }),
                        new Column('identificationName', 'Identification name', 'link'),
                        new Column('userName', 'User name', 'text'),
                        new Column('instanceName', 'Instance name', 'text'),
                        new Column('instanceUrl', 'Instance URL', 'text'),
                        new Column('environment', 'Environment', 'text'),
                        new Column('actions', '', 'action', {
                            hasCopyButton: false,
                            sortable: false,
                            fixedWidth: 52,
                            actions: [
                                {
                                    label: 'Share',
                                    name: 'share',
                                    leftIcon: {
                                        category: 'utility',
                                        name: 'socialshare',
                                    },
                                },
                                {
                                    label: 'Edit',
                                    name: 'edit',
                                    leftIcon: {
                                        category: 'utility',
                                        name: 'edit',
                                    },
                                },
                                {
                                    label: 'Delete',
                                    name: 'delete',
                                    leftIcon: {
                                        category: 'utility',
                                        name: 'delete',
                                    },
                                },
                            ]
                        }),
                    ],
                    rows: [{identificationName:"sapien.",userName:"Lucius Preston",instanceName:"sed",instanceUrl:"tortor",environment:"amet"},{identificationName:"aliquam",userName:"Colette Steele",instanceName:"eros.",instanceUrl:"sit",environment:"magna"},{identificationName:"tincidunt adipiscing.",userName:"Chester Owens",instanceName:"Cras",instanceUrl:"cursus.",environment:"mus."},{identificationName:"vel",userName:"Mira Moon",instanceName:"arcu.",instanceUrl:"est",environment:"molestie"},{identificationName:"varius.",userName:"Alexa George",instanceName:"tellus",instanceUrl:"eget",environment:"tellus"},{identificationName:"pretium aliquet,",userName:"Aphrodite Ferrell",instanceName:"cursus",instanceUrl:"in",environment:"et"},{identificationName:"Aenean sed pede",userName:"Irma Moon",instanceName:"nisi.",instanceUrl:"nulla.",environment:"faucibus"},{identificationName:"quam. Pellentesque habitant",userName:"Sybill Sandoval",instanceName:"ac",instanceUrl:"montes,",environment:"Vestibulum"},{identificationName:"Maecenas",userName:"Orson Gibbs",instanceName:"non",instanceUrl:"ipsum.",environment:"dolor"},{identificationName:"velit. Aliquam",userName:"Cora House",instanceName:"dapibus",instanceUrl:"dolor",environment:"mattis"},{identificationName:"Ut nec",userName:"Jocelyn Gibson",instanceName:"et",instanceUrl:"magna.",environment:"blandit"},{identificationName:"Nullam suscipit,",userName:"Thomas Blevins",instanceName:"Vivamus",instanceUrl:"ante,",environment:"id"},{identificationName:"Donec",userName:"Risa Lester",instanceName:"porttitor",instanceUrl:"ultricies",environment:"quis,"},{identificationName:"at augue id",userName:"Hyacinth Pratt",instanceName:"eget",instanceUrl:"ut",environment:"nec"},{identificationName:"aliquet. Phasellus",userName:"Ian Cash",instanceName:"ipsum",instanceUrl:"non",environment:"mollis."},{identificationName:"egestas. Fusce aliquet",userName:"Colin Winters",instanceName:"vel",instanceUrl:"hendrerit",environment:"quis"},{identificationName:"et, commodo",userName:"Ross Cummings",instanceName:"vel,",instanceUrl:"Nunc",environment:"eu,"},{identificationName:"hendrerit a, arcu.",userName:"Yuli Bailey",instanceName:"mattis",instanceUrl:"posuere",environment:"felis."},{identificationName:"quis",userName:"Dacey Neal",instanceName:"sit",instanceUrl:"in,",environment:"In"},{identificationName:"Cum",userName:"Ria Tran",instanceName:"pellentesque",instanceUrl:"justo",environment:"Morbi"},{identificationName:"molestie orci",userName:"Justine Hines",instanceName:"penatibus",instanceUrl:"massa.",environment:"posuere"},{identificationName:"sed, sapien. Nunc",userName:"Garth Garcia",instanceName:"amet",instanceUrl:"egestas",environment:"quis"},{identificationName:"tellus.",userName:"Baxter Bush",instanceName:"feugiat.",instanceUrl:"libero",environment:"In"},{identificationName:"velit.",userName:"Seth Church",instanceName:"sed",instanceUrl:"malesuada.",environment:"tellus,"},{identificationName:"mollis dui,",userName:"Cole Wright",instanceName:"nisl",instanceUrl:"Phasellus",environment:"Fusce"},{identificationName:"a mi",userName:"Jenette Meyers",instanceName:"elementum",instanceUrl:"congue",environment:"ornare"},{identificationName:"malesuada",userName:"Sybil Stein",instanceName:"cursus",instanceUrl:"Integer",environment:"eu,"},{identificationName:"massa. Suspendisse eleifend.",userName:"Salvador Sweet",instanceName:"elit",instanceUrl:"id",environment:"sapien."},{identificationName:"mattis.",userName:"Brody Wyatt",instanceName:"sagittis",instanceUrl:"diam.",environment:"Vestibulum"},{identificationName:"Nulla eget metus",userName:"Matthew Dickson",instanceName:"congue",instanceUrl:"Cras",environment:"massa."},{identificationName:"inceptos hymenaeos. Mauris",userName:"Tanya Watkins",instanceName:"eu,",instanceUrl:"eros",environment:"mauris"},{identificationName:"Suspendisse",userName:"Brennan Waller",instanceName:"mauris.",instanceUrl:"neque",environment:"pharetra"},{identificationName:"nisi a",userName:"Jacqueline Davidson",instanceName:"at",instanceUrl:"eu,",environment:"varius"},{identificationName:"pede blandit",userName:"Xerxes Mcleod",instanceName:"sit",instanceUrl:"ullamcorper",environment:"est."},{identificationName:"lorem ut aliquam",userName:"Rina Jones",instanceName:"Nunc",instanceUrl:"eros",environment:"Proin"},{identificationName:"dictum. Phasellus",userName:"Destiny Pierce",instanceName:"Aliquam",instanceUrl:"Aliquam",environment:"nulla."},{identificationName:"Integer",userName:"Wyoming Pate",instanceName:"facilisis",instanceUrl:"sit",environment:"feugiat"},{identificationName:"eu augue",userName:"Wade Parsons",instanceName:"luctus.",instanceUrl:"Duis",environment:"Duis"},{identificationName:"sit amet",userName:"Ria Cortez",instanceName:"per",instanceUrl:"sed,",environment:"magna."},{identificationName:"Integer sem",userName:"Hedley Luna",instanceName:"massa.",instanceUrl:"eu",environment:"vitae"},{identificationName:"tincidunt",userName:"Solomon Bates",instanceName:"ligula.",instanceUrl:"Donec",environment:"tellus."},{identificationName:"eget magna. Suspendisse",userName:"Kyra Green",instanceName:"erat",instanceUrl:"venenatis",environment:"rutrum."},{identificationName:"sem ut",userName:"Tobias Giles",instanceName:"dapibus",instanceUrl:"enim",environment:"amet"},{identificationName:"gravida",userName:"Amal Lynch",instanceName:"tempor",instanceUrl:"Curabitur",environment:"mauris"},{identificationName:"ornare, facilisis eget,",userName:"Ashely Wheeler",instanceName:"non",instanceUrl:"erat",environment:"cursus"},{identificationName:"Cras",userName:"Karyn Ballard",instanceName:"imperdiet",instanceUrl:"magna",environment:"sollicitudin"},{identificationName:"ultrices.",userName:"Amir Pugh",instanceName:"nec,",instanceUrl:"fermentum",environment:"at,"},{identificationName:"adipiscing",userName:"Alfreda Watkins",instanceName:"quis",instanceUrl:"Fusce",environment:"odio"},{identificationName:"arcu.",userName:"Dorothy Mcintyre",instanceName:"nec",instanceUrl:"vel,",environment:"et"},{identificationName:"lectus",userName:"Stuart Maldonado",instanceName:"odio.",instanceUrl:"vel,",environment:"lobortis"},{identificationName:"mauris sit",userName:"Liberty Brewer",instanceName:"mauris",instanceUrl:"enim",environment:"eu"},{identificationName:"semper",userName:"Evan Yates",instanceName:"in",instanceUrl:"eleifend.",environment:"lacinia"},{identificationName:"massa non ante",userName:"Edward Ramirez",instanceName:"porttitor",instanceUrl:"blandit",environment:"Curabitur"},{identificationName:"rutrum non, hendrerit",userName:"Jared Mitchell",instanceName:"risus.",instanceUrl:"et",environment:"ante"},{identificationName:"egestas. Duis ac",userName:"Jackson Pacheco",instanceName:"cursus,",instanceUrl:"fringilla",environment:"amet,"},{identificationName:"risus quis diam",userName:"Chandler Colon",instanceName:"nascetur",instanceUrl:"aliquet",environment:"est"},{identificationName:"magna.",userName:"Libby Peck",instanceName:"ante.",instanceUrl:"enim.",environment:"Nulla"},{identificationName:"sed,",userName:"Alice Knight",instanceName:"fermentum",instanceUrl:"mus.",environment:"ac,"},{identificationName:"ipsum. Suspendisse",userName:"Jenna Wong",instanceName:"malesuada",instanceUrl:"diam",environment:"lorem"},{identificationName:"molestie tellus. Aenean",userName:"Rebekah Galloway",instanceName:"sit",instanceUrl:"Aliquam",environment:"ut"},{identificationName:"lacus pede sagittis",userName:"Noah Pennington",instanceName:"amet",instanceUrl:"Quisque",environment:"metus."},{identificationName:"arcu.",userName:"Geoffrey Harris",instanceName:"at",instanceUrl:"mauris",environment:"Donec"},{identificationName:"mattis. Integer eu",userName:"Keely Bean",instanceName:"ultrices.",instanceUrl:"justo.",environment:"arcu."},{identificationName:"Nunc ac",userName:"Dakota Blanchard",instanceName:"est,",instanceUrl:"dolor",environment:"a"},{identificationName:"dictum placerat, augue.",userName:"Jana Gonzalez",instanceName:"auctor,",instanceUrl:"scelerisque",environment:"dolor."},{identificationName:"risus a",userName:"Adele Hoffman",instanceName:"ante",instanceUrl:"rutrum",environment:"lacus."},{identificationName:"dictum.",userName:"Keiko Love",instanceName:"interdum",instanceUrl:"Nam",environment:"scelerisque"},{identificationName:"dui augue",userName:"Neve Peters",instanceName:"laoreet",instanceUrl:"ligula.",environment:"pellentesque."},{identificationName:"dolor. Fusce mi",userName:"September Fowler",instanceName:"justo",instanceUrl:"In",environment:"Ut"},{identificationName:"lobortis augue",userName:"Laurel Livingston",instanceName:"augue",instanceUrl:"rutrum",environment:"amet"},{identificationName:"accumsan convallis,",userName:"Wyatt Mcdowell",instanceName:"est.",instanceUrl:"turpis.",environment:"Duis"},{identificationName:"sollicitudin adipiscing",userName:"Peter Riggs",instanceName:"lectus",instanceUrl:"senectus",environment:"ipsum."},{identificationName:"consectetuer",userName:"Whilemina Mcdonald",instanceName:"facilisis,",instanceUrl:"tellus",environment:"bibendum"},{identificationName:"elit. Aliquam",userName:"August Dominguez",instanceName:"arcu",instanceUrl:"et",environment:"Nunc"},{identificationName:"blandit",userName:"Finn Workman",instanceName:"sit",instanceUrl:"elit,",environment:"ultrices"},{identificationName:"arcu.",userName:"Angela Mason",instanceName:"velit.",instanceUrl:"eu,",environment:"risus."},{identificationName:"ligula tortor, dictum",userName:"Joan Dunlap",instanceName:"nisl",instanceUrl:"a,",environment:"hymenaeos."},{identificationName:"dapibus id, blandit",userName:"Joel Leonard",instanceName:"pellentesque",instanceUrl:"nibh.",environment:"nec"},{identificationName:"est.",userName:"Quintessa Myers",instanceName:"et",instanceUrl:"justo.",environment:"ut"},{identificationName:"Morbi quis",userName:"Iliana Mack",instanceName:"adipiscing",instanceUrl:"vulputate",environment:"a"},{identificationName:"sed, est. Nunc",userName:"Charde Newman",instanceName:"magna.",instanceUrl:"quis,",environment:"Aenean"},{identificationName:"leo.",userName:"Eugenia Cohen",instanceName:"arcu.",instanceUrl:"eros",environment:"magna."},{identificationName:"In",userName:"Kim Newton",instanceName:"at,",instanceUrl:"dis",environment:"eget"},{identificationName:"pede.",userName:"Jaden Howe",instanceName:"odio,",instanceUrl:"Donec",environment:"Lorem"},{identificationName:"ac mattis ornare,",userName:"Anika Knapp",instanceName:"ornare",instanceUrl:"diam",environment:"magna."},{identificationName:"sit amet",userName:"Garrett Carson",instanceName:"adipiscing",instanceUrl:"mi,",environment:"elit,"},{identificationName:"vulputate mauris",userName:"Cain Martinez",instanceName:"eu",instanceUrl:"eget",environment:"mauris,"},{identificationName:"mauris sit",userName:"Gary Vaughan",instanceName:"Phasellus",instanceUrl:"metus",environment:"nibh."},{identificationName:"quis",userName:"Warren Foreman",instanceName:"sem",instanceUrl:"Nullam",environment:"vitae"},{identificationName:"tincidunt",userName:"Alden Barrett",instanceName:"augue",instanceUrl:"mauris.",environment:"blandit"},{identificationName:"erat. Vivamus nisi.",userName:"Daphne Paul",instanceName:"id,",instanceUrl:"eu",environment:"dignissim"},{identificationName:"aliquet, sem",userName:"Tashya Irwin",instanceName:"Mauris",instanceUrl:"ipsum.",environment:"diam"},{identificationName:"ac mattis semper,",userName:"Aretha Witt",instanceName:"Suspendisse",instanceUrl:"vulputate",environment:"varius"},{identificationName:"Quisque nonummy",userName:"Calista Roberts",instanceName:"pellentesque.",instanceUrl:"Curabitur",environment:"elementum,"},{identificationName:"semper",userName:"Macy Dyer",instanceName:"a,",instanceUrl:"luctus",environment:"fermentum"},{identificationName:"et, commodo at,",userName:"Kieran Witt",instanceName:"adipiscing",instanceUrl:"non",environment:"ultrices,"},{identificationName:"lacus. Quisque imperdiet,",userName:"Adrian Bridges",instanceName:"Etiam",instanceUrl:"Fusce",environment:"Curabitur"},{identificationName:"Sed congue,",userName:"Dexter Tillman",instanceName:"felis",instanceUrl:"Maecenas",environment:"malesuada"},{identificationName:"vel, venenatis vel,",userName:"Leonard Madden",instanceName:"Integer",instanceUrl:"vitae",environment:"nunc"},{identificationName:"elit elit fermentum",userName:"Nero Koch",instanceName:"feugiat",instanceUrl:"dolor",environment:"Aliquam"}],
                    //rows: [{identificationName:"sapien.",userName:"Lucius Preston",instanceName:"sed",instanceUrl:"tortor",environment:"amet"},{identificationName:"aliquam",userName:"Colette Steele",instanceName:"eros.",instanceUrl:"sit",environment:"magna"},{identificationName:"tincidunt adipiscing.",userName:"Chester Owens",instanceName:"Cras",instanceUrl:"cursus.",environment:"mus."}],
                },
            }
        },
    }
</script>

<style scoped>

</style>