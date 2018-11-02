import isProduction from '../helpers/build';
import config from './general';
import path from 'path';
import webpack from 'webpack';

const sourcePath = path.resolve(config.root.dev, config.javascript.dev);
const distPath = path.resolve(config.root.dist, config.javascript.dist);

const plugins = [new webpack.NoEmitOnErrorsPlugin()];

const rules = [
  {
    test: /\.js$/,
    exclude: path.resolve(config.root.npm, 'node_modules/'),
    loaders: 'babel-loader',
    options: {
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ]
    }
  }
];

if (!isProduction()) {
  rules.push({
    test: /\.js$/,
    exclude: path.resolve(config.root.npm, 'node_modules/'),
    loaders: 'webpack-module-hot-accept'
  });
}

const entry = [path.resolve(config.root.dev, './js/app.js')];

const webpackConfig = {
  cache: false,
  entry: entry,
  mode: isProduction() ? 'development' : 'production',
  module: {
    rules: rules
  },
  output: {
    filename: '[name].bundle.js',
    path: distPath,
    chunkFilename: '[name].bundle.js',
    publicPath: 'assets/' + config.javascript.dist
  },
  optimization: {
    minimize: isProduction(),
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    modules: [sourcePath, 'node_modules'],
    extensions: config.javascript.extensions
  },
  plugins: plugins
};

export default webpackConfig;
