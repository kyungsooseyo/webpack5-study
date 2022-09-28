const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {

  },
  plugins: [
    new HtmlWebpackPlugin({}),
  ]
}