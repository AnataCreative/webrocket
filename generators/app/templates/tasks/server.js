import config from './config/config';
import browserSync from 'browser-sync';

const serverConfig = {
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: config.root.dist
  },
  open: false,
  tunnel: false,
  notify: false,
  ghostMode: false,
  cors: true
};

export const server = () => {
  return new Promise(resolve => {
    browserSync.init(serverConfig);
    resolve();
  });
};

export default server;
