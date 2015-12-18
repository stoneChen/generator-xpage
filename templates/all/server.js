var path = require('path');
var ip = require('ip');
var express = require('express');
var open = require('open');

var globalConfig = require('./global.config');
var curIP = ip.address();
var port = globalConfig.serverPort;
var app = express();

var webpack = require('webpack');
var config = require('./webpack.config');

config.entry = ['webpack-hot-middleware/client', config.entry];
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  //noInfo: true,
  publicPath: config.output.publicPath
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


