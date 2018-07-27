/**
 * HTML
 */
import config from './config/general';
import gulp from 'gulp';
import path from 'path';


const sourceFiles = path.join(config.root.dev, config.html.dev) + config.html.extensions;
const distPath = path.join(config.root.dist, config.html.dist);

export const html = () => {
  return (
    gulp
      .src(sourceFiles)

      // Set desitination
      .pipe(gulp.dest(distPath))
  );
};

export const watch = () => {
  gulp.watch(sourceFiles, gulp.series(html));
};

export default html;
