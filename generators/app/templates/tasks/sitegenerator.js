import config from './config/config';
import { errorLogger } from './helpers/logger';
import browserSync from 'browser-sync';
import child from 'child_process';
import gulp from 'gulp';
import path from 'path';

const sourceFiles = path.join(config.root.dev, config.sitegenerator.dev) + config.sitegenerator.extensions;
const getAllMessages = buffer => buffer.toString().split(/\n/);

const reload = () => {
  return new Promise(resolve => {
    browserSync.reload();
    resolve();
  });
};

export const sitegenerator = () => {
  const eleventy = child.spawn('npx', ['eleventy']);
  eleventy.stderr.on('data', logBuffer => getAllMessages(logBuffer).forEach(msg => errorLogger('Docs', msg)));

  return eleventy;
};

export const watch = () => {
  gulp.watch(sourceFiles, gulp.series(sitegenerator, reload));
};

export default sitegenerator;
