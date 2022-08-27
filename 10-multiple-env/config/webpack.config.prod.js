//+ 这个插件只在生产环境对打包出来的js进行压缩，开发环境不压缩
const TerserWebpackPlugin = require('terser-webpack-plugin');
// ` 这个插件不写在plugin里面，写在optimization里面，要想应用这个插件 还需要将mode 改为production
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  output: {
    //= 因为上面是多个入口，所以这里出口文件名不能是相同的
    filename: 'scripts/[name].[contenthash].js', //! 因为浏览器有缓存的功能，如果我们改了文件的内容，却没有改输出文件的名字，那么浏览器就会从缓存中读取，这样就会出现问题，所以我们需要改输出文件的名字，即使用contenthash
    publicPath: 'http://localhost:8080/', // ~ 后面不是我写的 是自动提示的--- 这个是资源的路径，如果是相对路径，那么就是相对于当前文件的路径，如果是绝对路径，那么就是相对于服务器的路径
  },
  mode: 'production', // ` 如果是production，那么就是生产环境，如果是development，那么就是开发环境
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ],
  },
  performance: {
    // hints: 'warning', // 提示性能警告
    hints: false, // 关闭性能提示
  }
};