import clean from './clean';
import html from './html';
import images from './images';
import javascript from './javascript';
import server from './server';
import styleguide from './styleguide';
import styles from './styles';
import video from './video';
import watch from './watch';
import gulp from 'gulp';


export const dev = gulp.series(clean, gulp.parallel(styles, javascript, images, video), html,<% if (hasStyleguide) { %> styleguide,<% } %> server, watch);
export const build = gulp.series(clean, gulp.parallel(styles, javascript, images, video), html<% if (hasStyleguide) { %>, styleguide<% } %>);


export default dev;
