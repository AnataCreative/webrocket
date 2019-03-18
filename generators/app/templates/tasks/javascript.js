import config from './config/config';
import gulp from 'gulp';
import babel from 'gulp-babel';
import size from 'gulp-size';
import path from 'path';

const sourceFiles = path.join(config.root.dev, config.javascript.dev) + config.javascript.extensions;
const distPath = path.join(config.root.dist, config.javascript.dist);

export const javascript = () => {
  return gulp
    .src(sourceFiles)

    .pipe(babel())

    .on('error', err => {
      errorLogger('Javascript', err.file, err.line, err.messageOriginal);
      return done();
    })

    .pipe(gulp.dest(distPath))

    .pipe(
      size({
        title: 'Javascript'
      })
    );
};

export const watch = () => {
  gulp.watch(sourceFiles, gulp.series(javascript));
};

export default javascript;
