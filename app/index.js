var generators = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },
  writing: function () {
    this.sourceRoot(path.join(__dirname, '../templates'));
    this.directory('all', './');
  },
  install: function () {
    if(this.options['skip-install']){
      return;
    }
    this.log(chalk.yellow('Start to install npm dependencies:'));
    this.npmInstall();
  },
  end: function () {
    this.log(chalk.green('Yeoman Initialization has been done. Have fun!'));
  }
});