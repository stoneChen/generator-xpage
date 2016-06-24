"use strict";

let webpack = require('webpack')
let config = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let globalConfig = require('./global.config')
let ip = require('ip')
let PUBLIC_PATH = ['http://', ip.address(), ':', globalConfig.serverPort, '/'].join('')
// eval-source-map is faster for development
config.devtool = 'eval-source-map'

// add hot-reload related code to entry chunks
let polyfill = 'eventsource-polyfill'
let hotClient = 'webpack-hot-middleware/client?reload=true&path=' + PUBLIC_PATH + '__webpack_hmr'
Object.keys(config.entry).forEach(function (name, i) {
  let extras = i === 0 ? [polyfill, hotClient] : [hotClient]
  config.entry[name] = extras.concat(config.entry[name])
})

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = PUBLIC_PATH

config.module.loaders.push(
  {
    test: /\.css$/,
    loader: "style!css"
  },
  {
    test: /\.styl$/,
    loader: 'style!css!postcss!stylus'
  }
)
config.plugins = (config.plugins || []).concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.template.ejs',
    title: globalConfig.pageConfig.title,
    inject: true,
  })
])

module.exports = config
