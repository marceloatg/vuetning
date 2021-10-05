<template>
    <div>

        <span class="ql-formats">

            <select class="ql-header" defaultValue="0">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="0">Normal</option>
            </select>

            <select class="ql-font">
                <option/>
                <option value="serif"/>
                <option value="monospace"/>
            </select>

        </span>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Bold -->
            <li v-if="bold">
                <slds-button-icon
                    icon="utility:bold"
                    bordered-filled
                    class="ql-bold slds-p-around_x-small"
                />
            </li>

            <!-- Italic -->
            <li v-if="italic">
                <slds-button-icon
                    icon="utility:italic"
                    bordered-filled
                    class="ql-italic slds-p-around_x-small"
                />
            </li>

            <!-- Underline -->
            <li v-if="underline">
                <slds-button-icon
                    icon="utility:underline"
                    bordered-filled
                    class="ql-underline slds-p-around_x-small"
                />
            </li>

            <!-- Strike Through -->
            <li v-if="strikeThrough">
                <slds-button-icon
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-strike slds-p-around_x-small"
                />
            </li>

            <!-- Subscript -->
            <li v-if="subscript">
                <slds-button-icon
                    value="sub"
                    icon="utility:underline"
                    bordered-filled
                    class="ql-script"
                    style="padding: 6px"
                />
            </li>

            <!-- Superscript -->
            <li v-if="superscript">
                <slds-button-icon
                    value="super"
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-script"
                    style="padding: 6px"
                />
            </li>

        </ul>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Color picker -->
            <li v-if="colorPicker">
                <select
                    v-animated
                    class="ql-color slds-button slds-button_icon slds-button_icon-border-filled"
                />
            </li>

            <!-- Background Color picker -->
            <li v-if="backgroundColorPicker">
                <select
                    v-animated
                    class="ql-background slds-button slds-button_icon slds-button_icon-border-filled"
                />
            </li>

        </ul>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Outdent -->
            <li v-if="outdent">
                <slds-button-icon
                    value="-1"
                    icon="utility:underline"
                    bordered-filled
                    class="ql-indent"
                    style="padding: 6px"
                />
            </li>


            <!-- Indent -->
            <li v-if="indent">
                <slds-button-icon
                    value="+1"
                    icon="utility:underline"
                    bordered-filled
                    class="ql-indent"
                    style="padding: 6px"
                />
            </li>


        </ul>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Ordered list -->
            <li>
                <slds-button-icon
                    value="ordered"
                    icon="utility:underline"
                    bordered-filled
                    class="ql-list"
                    style="padding: 6px"
                />
            </li>

            <!-- Bullet list -->
            <li>
                <slds-button-icon
                    value="bullet"
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-list"
                    style="padding: 6px"
                />
            </li>

            <!-- Alignment -->
            <li>
                <select
                    v-animated
                    class="ql-align slds-button slds-button_icon slds-button_icon-border-filled"
                    style="padding: 2px"
                >
                    <option defaultValue/>
                    <option value="center"/>
                    <option value="right"/>
                    <option value="justify"/>
                </select>
            </li>

        </ul>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Link -->
            <li>
                <slds-button-icon
                    value="ordered"
                    icon="utility:underline"
                    bordered-filled
                    class="ql-link"
                    style="padding: 6px"
                />
            </li>

            <!-- Image -->
            <li>
                <slds-button-icon
                    value="bullet"
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-image"
                    style="padding: 6px"
                />
            </li>

            <!-- Video -->
            <li>
                <slds-button-icon
                    value="bullet"
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-video"
                    style="padding: 6px"
                />
            </li>

            <!-- Blockquote -->
            <li>
                <slds-button-icon
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-blockquote"
                    style="padding: 6px"
                />
            </li>

            <!-- Code block -->
            <li>
                <slds-button-icon
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-code-block"
                    style="padding: 6px"
                />
            </li>

            <!-- Formula -->
            <li>
                <slds-button-icon
                    icon="utility:strikethrough"
                    bordered-filled
                    class="ql-formula"
                    style="padding: 6px"
                />
            </li>

        </ul>

        <ul aria-label="Format text" class="slds-button-group-list ql-formats">

            <!-- Clean -->
            <li>
                <slds-button-icon
                    icon="utility:underline"
                    bordered-filled
                    class="ql-clean slds-p-around_x-small"
                />
            </li>

        </ul>

    </div>
</template>

<script>
import Animated from '@/directives/animated'

export default {
    name: 'SldsRichTextToolbar',

    directives: {
        animated: Animated
    },

    props: {
        backgroundColorPicker: Boolean,
        bold: Boolean,
        colorPicker: Boolean,
        indent: Boolean,
        italic: Boolean,
        outdent: Boolean,
        strikeThrough: Boolean,
        subscript: Boolean,
        superscript: Boolean,
        underline: Boolean,
    }
}
</script>

<style scoped>

</style>
