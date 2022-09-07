const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    clean: true,
  },
  // ~hidden-source-map 会生成一个隐藏的 source map 文件，但不会在 bundle 中引入它
  devtool: 'hidden-source-map',
  plugins: [
    new HtmlWebpackPlugin({})
  ]
}