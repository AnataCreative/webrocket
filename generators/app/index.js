'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  // STEP 1: PROMPTING YALL
  prompting() {
    this.log(yosay('Welcome to 🚀 ' + chalk.yellow('webrocket') + ' ! Let us prep for launch commander.'));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name: ',
        default: ''
      },
      {
        type: 'input',
        name: 'devFolderPath',
        message: 'Path for ' + chalk.green('Dev') + ':',
        default: './dev'
      },
      {
        type: 'input',
        name: 'distFolderPath',
        message: 'Path for ' + chalk.green('Dist') + ':',
        default: './dist'
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.appName = answers.name.replace(/\s+/g, '').toLowerCase();
      this.devFolderPath = answers.devFolderPath;
      this.distFolderPath = answers.distFolderPath;
    });
  }

  // STEP 2: WRITING A NOVAL
  writing() {
    this._writingPackageJSON();
    this._writingGit();
    this._writingEditorConfig();
    this._writingPrettierConfig();
    this._writingJshintrc();
    this._writingBabelrc();
    this._writingSitegenerator();
    this._writingTsconfig();

    this._writingTasks();
    this._writingDev();
  }

  _writingPackageJSON() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      appName: this.appName,
      hasStyleguide: this.hasStyleguide
    });
  }

  _writingTsconfig() {
    this.fs.copy(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));
  }

  _writingGit() {
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
  }

  _writingEditorConfig() {
    this.fs.copy(this.templatePath('_editorconfig'), this.destinationPath('.editorconfig'));
  }

  _writingPrettierConfig() {
    this.fs.copy(this.templatePath('_prettierrc'), this.destinationPath('.prettierrc'));
  }

  _writingJshintrc() {
    this.fs.copyTpl(this.templatePath('_jshintrc'), this.destinationPath('.jshintrc'), {
      appName: this.appName
    });
  }

  _writingBabelrc() {
    this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
  }

  _writingSitegenerator() {
    this.fs.copyTpl(this.templatePath('_eleventy.js'), this.destinationPath('.eleventy.js'), {
      devFolderPath: this.devFolderPath,
      distFolderPath: this.distFolderPath
    });
  }

  _writingTasks() {
    this.fs.copyTpl(this.templatePath('tasks/**/*'), this.destinationPath('./tasks'), {
      appName: this.appName,
      hasStyleguide: this.hasStyleguide,
      devFolderPath: this.devFolderPath,
      distFolderPath: this.distFolderPath
    });
  }

  _writingDev() {
    this.fs.copyTpl(this.templatePath('dev/**/*'), this.destinationPath(this.devFolderPath), {
      appName: this.appName,
      hasStyleguide: this.hasStyleguide,
      distFolderPath: this.distFolderPath,
      htmlLang: this.htmlLang
    });
  }

  // STEP 3: INSTALL ALL THE THINGS
  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false,
      skipMessage: false,
      skipInstall: false
    });
  }

  // STEP 4: THE END, MY FRIEND
  end() {
    this.log(
      'All done! Now run ' + chalk.green('npm start') + ' to get started. Good luck on your journey and be brave! 🚀'
    );
  }
};
