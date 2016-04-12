var webpack = require('webpack')
var config = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var globalConfig = require('./global.config')

var PUBLIC_PATH = ['http://', ip.address(), ':', globalConfig.serverPort, '/'].join('')
// eval-source-map is faster for development
config.devtool = 'eval-source-map'

// add hot-reload related code to entry chunks
var polyfill = 'eventsource-polyfill'
var hotClient = 'webpack-hot-middleware/client?reload=true&path=' + PUBLIC_PATH + '__webpack_hmr'
Object.keys(config.entry).forEach(function (name, i) {
  var extras = i === 0 ? [polyfill, hotClient] : [hotClient]
  config.entry[name] = extras.concat(config.entry[name])
})

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = PUBLIC_PATH

config.module.loaders.push(
  {
    test: /\.css$/,
    loader: "style-loader!css-loader"
  },
  {
    test: /\.scss/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
  }
)
config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.template.ejs',
    title: globalConfig.pageConfig.title,
    inject: true,
  })
])

module.exports = config
