import { watch as images } from './images';
import { watch as styleguide } from './styleguide';
import { watch as styles } from './styles';

export const watch = () => {
  styles();
  images();<% if (hasStyleguide) { %>
  styleguide();<% } %>
};

export default watch;
