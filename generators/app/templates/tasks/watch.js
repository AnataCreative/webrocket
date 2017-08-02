/**
 * WATCHER
 */

import gulp from 'gulp';
import path from 'path';

import config from './config/general';

import {watch as styles} from './styles';
import {watch as images} from './images';
import {watch as video} from './video';
import {watch as html} from './html';<% if (hasStyleguide) { %>
import {watch as styleguide} from './styleguide';<% } %>

export const watch = () => {
	styles();
	images();
	video();
	html();<% if (hasStyleguide) { %>
	styleguide();<% } %>
};


export default watch;
