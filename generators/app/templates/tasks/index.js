import clean from './clean';
import favicons from './favicons';
import images from './images';
import javascript from './javascript';
import server from './server';
import sitegenerator from './sitegenerator';
import styles from './styles';
import watch from './watch';
import gulp from 'gulp';

export const dev = gulp.series(
  clean,
  gulp.parallel(styles, images, javascript, favicons),
  sitegenerator,
  server,
  watch
);

export const build = gulp.series(clean, gulp.parallel(styles, images, javascript, favicons), sitegenerator);

export default dev;
