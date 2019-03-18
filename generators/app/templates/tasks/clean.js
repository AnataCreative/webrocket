import config from './config/config';
import del from 'del';

export const clean = () => {
  return del(config.root.dist, {
    force: true
  });
};

export default clean;
