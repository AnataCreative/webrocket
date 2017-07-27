'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
// const wiredep = require('wiredep');
// const mkdirp = require('mkdirp');


module.exports = class extends Generator {
	// STEP 1: PROMPTING
	prompting() {
		this.log(yosay(
			'Welcome to the 🚀 ' + chalk.yellow('webrocket') + ' generator!\
			Let us prep for launch commander.'
		));

		const prompts = [{
			type: 'input',
			name: 'name',
			message: 'Your project name: ',
			default: ''
		}, {
			type: 'confirm',
			name: 'hasStyleguide',
			message: 'Would you like to include a ' + chalk.green('Styleguide') + '?',
			default: true
		}, {
			type: 'input',
			name: 'devFolderPath',
			message: 'Path for ' + chalk.green('Dev') + ':',
			default: './dev'
		}, {
			type: 'input',
			name: 'distFolderPath',
			message: 'Path for ' + chalk.green('Dist') + ':',
			default: './dist'
		}, {
			type: 'input',
			name: 'htmlLang',
			message: 'Language of project:',
			default: 'en'
		}];

		return this.prompt(prompts).then(answers => {
			this.appName = answers.name.replace(/\s+/g, '').toLowerCase();
			this.hasStyleguide = answers.hasStyleguide;
			this.devFolderPath = answers.devFolderPath;
			this.distFolderPath = answers.distFolderPath;
			this.htmlLang = answers.htmlLang;
		});
	}


	// STEP 2: WRITING
	writing() {
		this._writingPackageJSON();
		this._writingGit();
		this._writingEditorConfig();
		this._writingJshintrc();

		this._writingTasks();
		this._writingDev();

		if (this.hasStyleguide) {
			this._writingStyleguide();
		}
	}

	_writingPackageJSON() {
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'), {
				appName: this.appName,
				hasStyleguide: this.hasStyleguide
			}
		);
	}

	_writingGit() {
		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore')
		);
	}

	_writingEditorConfig() {
		this.fs.copy(
			this.templatePath('_editorconfig'),
			this.destinationPath('.editorconfig')
		);
	}

	_writingJshintrc() {
		this.fs.copyTpl(
			this.templatePath('_jshintrc'),
			this.destinationPath('.jshintrc'), {
				appName: this.appName
			}
		);
	}

	_writingTasks() {
		this.fs.copyTpl(
			this.templatePath('tasks/**/*'),
			this.destinationPath('./tasks'), {
				appName: this.appName,
				hasStyleguide: this.hasStyleguide,
				devFolderPath: this.devFolderPath,
				distFolderPath: this.distFolderPath
			}
		);
	}

	_writingDev() {
		this.fs.copyTpl(
			this.templatePath('dev/**/*'),
			this.destinationPath(this.devFolderPath), {
				appName: this.appName,
				hasStyleguide: this.hasStyleguide,
				distFolderPath: this.distFolderPath,
				htmlLang: this.htmlLang
			}
		);
	}

	_writingStyleguide() {
		this.fs.copy(
			this.templatePath('styleguide/dev/scss/styleguide.scss'),
			this.destinationPath(this.devFolderPath + '/scss/styleguide.scss')
		);

		this.fs.copy(
			this.templatePath('styleguide/tasks/styleguide.js'),
			this.destinationPath('./tasks/styleguide.js')
		);

		this.fs.copyTpl(
			this.templatePath('styleguide/dev/styleguide/**/*'),
			this.destinationPath(this.devFolderPath + '/styleguide/'), {
				appName: this.appName
			}
		);
	}


	// STEP 3: INSTALL
	install() {
		this.installDependencies({
			npm: true,
			bower: false,
			yarn: false,
			skipMessage: false,
			skipInstall: false
		});
	}


	// STEP 4: END
	end() {
		this.log(
			'All done! Now run ' + chalk.green('npm run dev') + ' to get started. \
			Good luck on your journey and be brave! 🚀'
		);
	}
};
