module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
        jest: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': ['warn', { 'allow': ['warn', 'error'] }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'require-atomic-updates': 'warn',
        "vue/attribute-hyphenation": ["error", "always"],
        "vue/attributes-order": ["error", {
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
                "CONTENT"
            ]
        }],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never"
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "alignAttributesVertically": true,
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "always",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 5,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/no-multi-spaces": ["error", {
            "ignoreProperties": false
        }],
        "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                "inheritAttrs",
                "model",
                ["props", "propsData"],
                "data",
                "computed",
                "watch",
                "LIFECYCLE_HOOKS",
                "methods",
                ["template", "render"],
                "renderError"
            ]
        }],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/singleline-html-element-content-newline": ["error", {
            "ignoreWhenNoAttributes": true,
            "ignoreWhenEmpty": true,
            "ignores": ["abbr", "pre", "span", "textarea"]
        }],
        "vue/v-bind-style": ["error", "shorthand"],
        "vue/v-on-style": ["error", "shorthand"],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
