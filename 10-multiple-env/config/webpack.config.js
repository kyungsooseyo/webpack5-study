const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const prodConfig = require('./webpack.config.prod');
const devConfig = require('./webpack.config.dev');
module.exports = env => {
  switch (true) {
    case env.development:
      return merge(commonConfig, devConfig);
    case env.production:
      return merge(commonConfig, prodConfig);
    default:
      return new Error('请指定环境变量');
      break;
  }
}