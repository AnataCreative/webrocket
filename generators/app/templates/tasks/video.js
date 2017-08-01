/**
 * VIDEO
 */

import gulp from 'gulp';
import path from 'path';

import config from './config/general';


const sourceFiles = path.join(config.root.dev, config.video.dev) + config.video.extensions;
const distPath = path.join(config.root.dist, config.video.dist);


export const video = () => {
	return gulp.src(sourceFiles)

		// Set desitination
		.pipe(gulp.dest(distPath));
};


export const watch = () => {
	gulp.watch(sourceFiles, gulp.series(video));
};


export default video;
