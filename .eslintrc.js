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
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "vue/attribute-hyphenation": ["error", "always"],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never"
        }],
        "vue/html-indent": ["warn", 4, {
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
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 3,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/mustache-interpolation-spacing": ["warn", "always"],
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/v-on-style": ["error", "shorthand"],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};