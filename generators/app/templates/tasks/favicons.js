import config from './config/config';
import gulp from 'gulp';
import size from 'gulp-size';
import path from 'path';

const sourceFiles = path.join(config.root.dev, config.favicons.dev) + config.favicons.extensions;
const distPath = path.join(config.root.dist, config.favicons.dist);

export const favicons = () => {
  return gulp
    .src(sourceFiles)

    .pipe(gulp.dest(distPath))

    .pipe(
      size({
        title: 'favicons'
      })
    );
};

export default favicons;
