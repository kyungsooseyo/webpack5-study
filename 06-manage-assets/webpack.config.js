const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// + 这个插件能够将样式文件打包成一个单独的文件，用link标签并且插入到html文件中,而不是直接写style标签
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// ` 这个插件不写在plugin里面，写在optimization里面，要想应用这个插件 还需要将mode 改为production
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');
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
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
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
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|woff2|eot|tff|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader',
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      },
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
