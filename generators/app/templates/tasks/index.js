import gulp from 'gulp';

import clean from './clean';
import styles from './styles';
import javascript from './javascript';
import images from './images';
import video from './video';
import html from './html';<% if (hasStyleguide) { %>
import styleguide from './styleguide';<% } %>

import server from './server';
import watch from './watch';


export const dev = gulp.series(clean, gulp.parallel(styles, javascript, images, video), html,<% if (hasStyleguide) { %> styleguide,<% } %> server, watch);
export const build = gulp.series(clean, gulp.parallel(styles, javascript, images, video), html<% if (hasStyleguide) { %>, styleguide<% } %>);


export default dev;
