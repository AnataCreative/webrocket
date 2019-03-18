import config from './config/config';
import { errorLogger } from './helpers/logger';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssMqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import gulp from 'gulp';
import flatten from 'gulp-flatten';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import size from 'gulp-size';
import path from 'path';

const postCssProcessors = [autoprefixer, cssMqpacker, cssnano];
const sourceFiles = path.join(config.root.dev, config.styles.dev) + config.styles.extensions;
const distPath = path.join(config.root.dist, config.styles.dist);
const includePaths = './dev/scss/';

export const styles = done => {
  return gulp
    .src(sourceFiles)
    .pipe(sass({ includePaths }))

    .on('error', err => {
      errorLogger('Styles', err.file, err.line, err.messageOriginal);
      return done();
    })

    .pipe(postcss(postCssProcessors))

    .pipe(
      rename(path => {
        path.basename += '.min';
      })
    )

    .pipe(flatten())

    .pipe(gulp.dest(distPath))

    .pipe(
      size({
        title: 'css'
      })
    )

    .pipe(
      browserSync.reload({
        stream: true
      })
    );
};

export const watch = () => {
  gulp.watch(sourceFiles, gulp.series(styles));
};

export default styles;
