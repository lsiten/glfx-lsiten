'use strict'
const path = require('path')
const config = require('../config');
let webpackConfig = {
  entry: {
    glfx: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './' ,config.dev.dist),
    publicPath: ''
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
  ]
}
module.exports = webpackConfig
