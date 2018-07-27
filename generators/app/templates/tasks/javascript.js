/**
 * Javascript
 */
import webpackConfig from './config/webpack';
import isProduction from './helpers/build';
import { errorLogger, infoLogger } from './helpers/logger';
import webpack from 'webpack';


export const javascript = callback => {
  return new Promise(resolve => {
    if (isProduction()) {
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          errorLogger('Webpack', err.file, err.line, err.messageOriginal);
        }

        infoLogger(
          'Webpack',
          stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: true,
            version: false
          })
        );

        resolve();
      });
    } else {
      resolve();
    }
  });
};

export default javascript;
