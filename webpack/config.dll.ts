const path = require('path')
const webpack = require('webpack')

const dllConfig = {
  mode: 'production',
  entry: {
    vendors: ['date-fns', 'immer', 'classnames', 'deep-eql'],
  },
  output: {
    filename: '[name].dll.js', // 上面的entry名字
    path: path.resolve(__dirname, './dll'),
    library: '[name]', // 挂载到浏览器中 控制台输入这个名字可以输出
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.resolve(__dirname, './dll/[name].manifest.json'),
    }),
  ],
}

webpack(dllConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 构建过程出错
    console.log(stats.hasErrors())
  }
  // 成功构建
})
