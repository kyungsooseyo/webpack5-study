const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// + 这个插件能够将样式文件打包成一个单独的文件，用link标签并且插入到html文件中,而不是直接写style标签
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');
module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {

    path: path.resolve(__dirname, '../dist'),
    clean: true, // ~每次打包都会清空dist文件夹
    assetModuleFilename: 'images/[contenthash][ext]', //~ 下面rules中的优先级会比这个高
  },
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            //· 我只用上面的presets是没有报错的 其实是不需要下面这个的
            plugins: [['@babel/plugin-transform-runtime',]]
          }
        },
      }
    ],
  },
  optimization: {
   
    splitChunks: {
      // chunks: 'all',
      //= 把第三方库的文件进行缓存，只要是第三方库的文件都会被缓存 eg lodash;就是像lodash这种文件不必每次都发请求，直接使用浏览器缓存的文件
      cacheGroups: {
        vender: {
          test: /[\\/]node_modules[\\/]/,
          name: 'venders', // .输出的名字是venders 但是在上面又对output filename进行了配置，所以生成的文件名是venders.[contenthash].js
          chunks: 'all',
        }
      }
    }
  },
};
