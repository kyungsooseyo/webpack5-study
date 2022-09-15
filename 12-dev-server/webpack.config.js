const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    path: '/',
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,//~ 设置是否压缩
    port: 9000,//~ 设置端口号
    //~ 给请求的文件设置响应头
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      'X-Access-Token': 'abc'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    // https: true,//~ 设置是否启用https
    http2: true,//~ 设置是否启用http2 http2自带了https证书
    historyApiFallback: true,//~ 设置是否启用historyApiFallback
  },
  plugins: [
    new HtmlWebpackPlugin({}),
  ]
}