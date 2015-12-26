var path = require('path');
var ip = require('ip');
var express = require('express');
var open = require('open');

var globalConfig = require('./global.config');
var curIP = ip.address();
var port = globalConfig.serverPort;
var app = express();

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

webpackConfig.entry.unshift('webpack-hot-middleware/client');
webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  //noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, curIP, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  var address = ['http://', curIP, ':', port].join('');
  console.log('Go to %s', address);
  open(address);
});


