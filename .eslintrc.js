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
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/v-on-style": ["error", "shorthand"],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};