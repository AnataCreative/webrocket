/**
 * Throw error
 */

import gutil from 'gulp-util';


const errorLogger = (taskName, file, line, msg) => {
	gutil.log(
		'[' + gutil.colors.red('Error') + ']' +
		'\n' + gutil.colors.grey('---------------------------------------') +
		'\n  Task: ' + gutil.colors.red(taskName) +
		'\n Error: ' + gutil.colors.red(msg) +
		'\n  Line: ' + gutil.colors.magenta(line) +
		'\n  File: ' + gutil.colors.magenta(file.replace(process.cwd(), '')) +
		'\n' + gutil.colors.grey('---------------------------------------') +
		'\n'
	);
};

const infoLogger = (taskName, message) => {
	gutil.log(taskName, gutil.colors.blue(message));
};


export {errorLogger, infoLogger};
