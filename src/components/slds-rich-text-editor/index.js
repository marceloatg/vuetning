import sldsRichTextEditor from './slds-rich-text-editor.vue'
import sldsRichTextToolbar from './slds-rich-text-toolbar'

export default Vue => {
    Vue.component(sldsRichTextEditor.name, sldsRichTextEditor)
    Vue.component(sldsRichTextToolbar.name, sldsRichTextToolbar)
}
