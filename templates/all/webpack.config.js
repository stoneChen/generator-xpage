var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var globalConfig = require('./global.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: ['./src/index.js'],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    //publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin('index.css', {allChunks: false}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      title: globalConfig.pageTitle,
      inject: true,
      //minify: {
      //  minifyJS: true,
      //  minifyCSS: true,
      //  collapseWhitespace: true
      //}
    })
  ],
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        //loader: 'style!css'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.styl/,
        //loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
        loader: 'style-loader!css-loader!stylus-loader?outputStyle=expanded'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};