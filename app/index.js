var yeoman = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appName', {
      type: String,
      required: false,
      defaults:path.basename(process.cwd())
    });
  },
  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the swell ' + chalk.red('XKS Page Scaffolding') + ' generator!'
    ));
    var prompts = [
      {
        type: 'confirm',
        name: 'isMobile',
        message: 'Is the app mobile?\n',
        default: true
      }
    ];
    this.prompt(prompts, function (props) {
      this.isMobile = props.isMobile;
      done();
    }.bind(this));
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