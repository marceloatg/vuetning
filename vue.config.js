const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}