import { watch as images } from './images';
import { watch as javascript } from './javascript';
import { watch as sitegenerator } from './sitegenerator';
import { watch as styles } from './styles';

export const watch = () => {
  styles();
  images();
  javascript();
  sitegenerator();
};

export default watch;
