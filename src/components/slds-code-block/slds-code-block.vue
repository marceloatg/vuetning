<template>
    <div class="slds-form-element">

        <!-- Label -->
        <slds-label v-if="label" :required="required">
            <div class="slds-grid" style="width: 100%">

                <div>
                    {{ label }}
                </div>

                <div v-if="copyButton" class="slds-col_bump-left">
                    <slds-button-icon
                        :icon="icon"
                        title="Copy"
                        @click="onClickCopy"
                    />
                </div>

            </div>
        </slds-label>

        <!-- Control -->
        <div class="slds-form-element__control">
            <pre><code ref="code" :class="codeClass">{{ code }}</code></pre>
        </div>

    </div>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'
import SldsLabel from '@/components/slds-label/slds-label'
import hljs from 'highlight.js'

export default {
    name: 'SldsCodeBlock',

    components: {
        SldsButtonIcon,
        SldsLabel
    },

    props: {
        code: String,
        copyButton: Boolean,
        label: String,
        language: {
            type: String,
            validator: function (value) {
                if (value) {
                    const languages = hljs.listLanguages()
                    const isValid = languages.indexOf(value) !== -1

                    if (!isValid) console.warn(`[slds-code-block] valid "language" values are: ${languages}`)
                    return isValid
                }

                return true
            }
        },
        plainText: Boolean,
        required: Boolean,
    },

    data() {
        return {
            icon: 'utility:copy',
            timer: null
        }
    },

    computed: {
        codeClass() {
            let classNames = ''

            if (this.language) classNames += ` language-${this.language}`
            if (this.plainText) classNames += ' plaintext'

            return classNames
        }
    },

    mounted() {
        hljs.highlightBlock(this.$refs.code)
    },

    methods: {
        onClickCopy() {
            const el = document.createElement('textarea')
            el.value = this.code
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)

            this.icon = 'utility:check'
            if (this.timer) return

            this.timer = setTimeout(function () {
                this.resetIcon()
            }.bind(this), 1500)
        },

        resetIcon() {
            this.icon = 'utility:copy'
            this.timer = null
        }
    }
}
</script>

<style scoped lang="scss">

code {
    border: 1px solid #dddbda;
    border-radius: .25rem;
}

.slds-form-element__label {
    width: 100%;
}

</style>
