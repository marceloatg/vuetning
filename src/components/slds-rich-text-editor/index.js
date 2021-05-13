import sldsRichTextEditor from './rich-text-editor.vue'
import sldsRichTextToolbar from './rich-text-toolbar'

export default Vue => {
    Vue.component(sldsRichTextEditor.name, sldsRichTextEditor)
    Vue.component(sldsRichTextToolbar.name, sldsRichTextToolbar)
}
