'use strict'
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const config = require('../config')
const JavaScriptObfuscator = require('webpack-obfuscator');

const webpack = require('webpack')
const webpackConfig = require('./webpack.base.conf')
webpackConfig.mode = process.env.NODE_ENV
webpackConfig.plugins.push(new JavaScriptObfuscator({
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'mangled',
  log: false,
  renameGlobals: false,
  rotateStringArray: false,
  selfDefending: false,
  stringArray: true,
  stringArrayEncoding: true,
  stringArrayThreshold: 1,
  unicodeEscapeSequence: false
}, ['**.debug.**']))

const spinner = ora('building for production...')
spinner.start()



rm(path.resolve(__dirname, './' ,config.build.dist), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
