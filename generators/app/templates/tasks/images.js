import config from './config/config';
import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import size from 'gulp-size';
import path from 'path';

const sourceFiles = path.join(config.root.dev, config.images.dev) + config.images.extensions;
const distPath = path.join(config.root.dist, config.images.dist);

export const images = () => {
  return gulp
    .src(sourceFiles)

    .pipe(changed(distPath))

    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false
          }
        ]
      })
    )

    .on('error', err => {
      errorLogger('Images', err.file, err.line, err.messageOriginal);
      return done();
    })

    .pipe(gulp.dest(distPath))

    .pipe(
      size({
        title: 'images'
      })
    );
};

export const watch = () => {
  gulp.watch(sourceFiles, gulp.series(images));
};

export default images;
