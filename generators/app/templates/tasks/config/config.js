export default {
  root: {
    npm: './',
    dev: '<%= devFolderPath %>',
    dist: '<%= distFolderPath %>'
  },
  styles: {
    dev: 'scss/**/*',
    dist: 'assets/css',
    extensions: '.scss'
  },
  images: {
    dev: 'img/**/*',
    dist: 'assets/img',
    extensions: '.{jpg,png,svg,gif}'
  },
  javascript: {
    dev: 'js/**/*',
    dist: 'assets/js',
    extensions: '.{js,ts}'
  },
  favicons: {
    dev: 'favicons/**/*',
    dist: '',
    extensions: '.{png,ico}'
  },
  sitegenerator: {
    dev: 'site/**/*',
    dist: '',
    extensions: '.{html,njk,md,json}'
  }
};
