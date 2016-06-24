"use strict";

let webpack = require('webpack')
let config = require('./webpack.base.conf')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let globalConfig = require('./global.config')
// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].[chunkhash:8].js'
config.output.chunkFilename = '[id].[chunkhash:8].js'

// whether to generate source map for production files.
// disabling this can speed up the build.
let SOURCE_MAP = true

config.devtool = SOURCE_MAP ? 'source-map' : false

config.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css')
  },
  {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
  }
)

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /src/index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.template.ejs',
    title: globalConfig.pageConfig.title,
    inject: true,
  })
])

module.exports = config
