/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "comma-dangle": [
            "warn",
            "always-multiline",
        ],
        "complexity": "warn",
        "eol-last": [
            "warn",
            "always",
        ],
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-unused-vars": "warn",
        "no-var": "error",
        "object-curly-spacing": [
            "warn",
            "always",
        ],
        "require-atomic-updates": "warn",
        "require-await": "error",
        "semi": [
            "warn",
            "never",
        ],
        "quotes": "warn",
        "vue/attribute-hyphenation": [
            "error",
            "always",
        ],
        "vue/attributes-order": [
            "error",
            {
                "order": [
                    "DEFINITION",
                    "CONDITIONALS",
                    "LIST_RENDERING",
                    "RENDER_MODIFIERS",
                    "GLOBAL",
                    "UNIQUE",
                    "TWO_WAY_BINDING",
                    "OTHER_DIRECTIVES",
                    "OTHER_ATTR",
                    "EVENTS",
                    "CONTENT",
                ],
            },
        ],
        "vue/component-name-in-template-casing": [
            "error",
            "kebab-case",
        ],
        "vue/first-attribute-linebreak": ["error", {
            "singleline": "ignore",
            "multiline": "below",
        }],
        "vue/html-closing-bracket-spacing": [
            "error",
            {
                "startTag": "never",
                "endTag": "never",
                "selfClosingTag": "never",
            },
        ],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "always",
        }],
        "vue/html-indent": [
            "error",
            4,
            {
                "attribute": 1,
                "baseIndent": 1,
                "alignAttributesVertically": true,
            },
        ],
        "vue/html-self-closing": [
            "error",
            {
                "html": {
                    "void": "never",
                    "normal": "always",
                    "component": "always",
                },
                "svg": "always",
                "math": "always",
            },
        ],
        "vue/max-attributes-per-line": [
            "warn",
            {
                "multiline": {
                    "max": 1,
                },
                "singleline": {
                    "max": 3,
                },
            },
        ],
        "vue/multiline-html-element-content-newline": "off",
        "vue/multi-word-component-names": "off",
        "vue/mustache-interpolation-spacing": [
            "error",
            "always",
        ],
        "vue/no-v-html": "off",
        "vue/no-multi-spaces": [
            "error",
            {
                "ignoreProperties": false,
            },
        ],
        "vue/no-spaces-around-equal-signs-in-attribute": [
            "error",
        ],
        "vue/order-in-components": [
            "error",
            {
                "order": [
                    "el",
                    "name",
                    "parent",
                    "functional",
                    [
                        "delimiters",
                        "comments",
                    ],
                    [
                        "components",
                        "directives",
                        "filters",
                    ],
                    "extends",
                    "mixins",
                    "inheritAttrs",
                    "model",
                    [
                        "props",
                        "propsData",
                    ],
                    "data",
                    "computed",
                    "watch",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    [
                        "template",
                        "render",
                    ],
                    "renderError",
                ],
            },
        ],
        "vue/prop-name-casing": [
            "error",
            "camelCase",
        ],
        "vue/singleline-html-element-content-newline": [
            "error",
            {
                "ignoreWhenNoAttributes": true,
                "ignoreWhenEmpty": true,
                "ignores": [
                    "abbr",
                    "pre",
                    "span",
                    "textarea",
                ],
            },
        ],
        "vue/v-bind-style": [
            "error",
            "shorthand",
        ],
        "vue/v-on-style": [
            "error",
            "shorthand",
        ],
        "@typescript-eslint/no-explicit-any": "off",
    },
}
