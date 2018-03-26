const environment = require('./environment')
const merge = require('webpack-merge');

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
  }
}, environment.toWebpackConfig())
