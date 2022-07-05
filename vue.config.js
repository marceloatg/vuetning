const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    extract: false
  },
  transpileDependencies: true
})
