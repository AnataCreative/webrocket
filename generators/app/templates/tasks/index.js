import clean from './clean';
import images from './images';
import javascript from './javascript';
import server from './server';
import styleguide from './styleguide';
import styles from './styles';
import watch from './watch';
import gulp from 'gulp';

export const dev = gulp.series(clean, gulp.parallel(styles, javascript, images), <% if (hasStyleguide) { %> styleguide,<% } %> server, watch);
export const build = gulp.series(clean, gulp.parallel(styles, javascript, images)<% if (hasStyleguide) { %>, styleguide<% } %>);

export default dev;
