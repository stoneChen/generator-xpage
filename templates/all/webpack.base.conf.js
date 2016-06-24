"use strict";

let path = require('path')
let autoprefixer = require('autoprefixer');<% if (isMobile) { %>
let pxtorem = require('postcss-pxtorem');<% } %>
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    publicPath: 'static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      { test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)$/,
        loader: 'url',
        query: {
          limit: 8912,
          name: 'resources/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: function () {
    return [<% if (isMobile) { %>
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
        replace: true,
        minPixelValue: 3
      }),<% } %>
      autoprefixer({browsers: '> 1%'}) ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
