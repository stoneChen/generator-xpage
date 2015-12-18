var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*','del']
});
var webpack = require("webpack");
var webpackConfig = require('./webpack.config');

webpackConfig.devtool = null;
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }
));

gulp.task('clean', function () {
  $.del(['dist']);
});

gulp.task("webpack", function (callback) {
  // run webpack
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('default', [ 'clean', 'webpack' ]);



