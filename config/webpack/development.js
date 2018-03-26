const environment = require('./environment')
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge({
  module: {
    rules: [
      {
        test: /\.(ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins:[
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
      })
  ]
}, environment.toWebpackConfig())
