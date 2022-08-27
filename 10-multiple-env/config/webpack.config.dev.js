
module.exports = {
  output: {
    //= 因为上面是多个入口，所以这里出口文件名不能是相同的
    filename: 'scripts/[name].js',
  },
  mode: 'development', // ` 如果是production，那么就是生产环境，如果是development，那么就是开发环境
  devtool: 'inline-source-map', // 精准映射，方便调试
  devServer: {
    static: './dist', // devServe的物理路径
  },
};