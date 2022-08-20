const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true, // ~每次打包都会清空dist文件夹
    assetModuleFilename: 'images/[contenthash][ext]', //~ 下面rules中的优先级会比这个高
  },
  mode: 'development',
  devtool: 'inline-source-map', // 精准映射，方便调试
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body',
    }),
  ],
  devServer: {
    static: './dist', // devServe的物理路径
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][name][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline', //= 导出一个base64 data url,这个打包后是在dist中看不到文件的
      },
      {
        test: /\.txt$/,
        type: 'asset/source', // = 导出的是一个源代码
      },
      {
        test: /\.jpeg$|\.jpg$/,
        type: 'asset', 
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024, //~ 4mb 大于4M时才生成资源文件 小于4M就是base64;默认是8KB
          },
        },
      },
    ],
  },
};
