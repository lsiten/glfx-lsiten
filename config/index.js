'use strict'

module.exports = {
  build: {
    dist: '../dist'
  },
  dev: {
    dist: '../dist',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}