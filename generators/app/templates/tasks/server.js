/**
 * Server
 */
import config from './config/general';
import webpackConfig from './config/webpack';
import browserSync from 'browser-sync';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


const compiler = webpack(webpackConfig);
const serverConfig = {
  port: 8080,
  ui: {
    port: 8081
  },
  server: {
    baseDir: config.root.dist
  },
  open: false,
  middleware: [
    webpackDevMiddleware(compiler, {
      publicPath: path.join('/', webpackConfig.output.publicPath),
      stats: false
    }),
    webpackHotMiddleware(compiler)
  ],
  tunnel: false
};

export const server = () => {
  return new Promise(resolve => {
    browserSync.init(serverConfig);
    resolve();
  });
};

export default server;
