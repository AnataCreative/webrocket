/**
 * Javascript
 */

import gulp from 'gulp';
import webpack from 'webpack';

import config from './config/general';
import isProduction from './helpers/build';

import webpackConfig from './config/webpack';
import {errorLogger, infoLogger} from './helpers/logger';


export const javascript = (callback) => {
	return new Promise((resolve) => {
		if (isProduction()) {
			webpack(webpackConfig, (err, stats) => {
				if (err) {
					errorLogger('Webpack', err.file, err.line, err.messageOriginal);
				}

				infoLogger('Webpack', stats.toString({
					assets: true,
					chunks: false,
					chunkModules: false,
					colors: true,
					hash: false,
					timings: true,
					version: false
				}));

				resolve();
			});
		} else {
			resolve();
		}
	});
};


export default javascript;
