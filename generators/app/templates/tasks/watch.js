/**
 * WATCHER
 */
import { watch as html } from './html';
import { watch as images } from './images';
import { watch as styleguide } from './styleguide';
import { watch as styles } from './styles';
import { watch as video } from './video';


export const watch = () => {
	styles();
	images();
	video();
	html();<% if (hasStyleguide) { %>
	styleguide();<% } %>
};


export default watch;
