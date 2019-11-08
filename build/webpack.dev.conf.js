const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')

const devConfigs =merge(baseWebpackConfig, {
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: '0.0.0.0',
    port: 8088,
    open: false,
    publicPath: '/',
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      env: 'development'
    })
  ]
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8088
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devConfigs.devServer.port = port

      // Add FriendlyErrorsPlugin
      devConfigs.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://0.0.0.0:8088`],
        },
        onErrors: undefined
      }))

      resolve(devConfigs)
    }
  })
})
