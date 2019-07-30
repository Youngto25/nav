const webpack = require('webpack')

module.exports = {
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    hot: true
  },
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [
              "style-loader", // 将 JS 字符串生成为 style 节点
              "css-loader", // 将 CSS 转化成 CommonJS 模块
              "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'imgs/[name].[hash].[ext]',
                publicPath: '/dist/'
              }
            },
            // {
            //   loader: 'file-loader',
            //   query: {
            //     name: '[name].[ext]',
            //     outputPath: 'static/img/',
            //     publicPath: '/dist/static/img/'
            //   }
            // }
          ]
        }
      ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};