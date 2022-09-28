const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/app.js',
  plugins: [
    new HtmlWebpackPlugin(),
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx'],
      exclude: 'node_modules',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    client: {
      // ~ 把eslint错误的时候遮罩层关闭
      overlay: false
    }
  }
}