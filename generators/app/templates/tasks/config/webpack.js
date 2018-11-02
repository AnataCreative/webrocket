import isProduction from '../helpers/build';
import config from './general';
import path from 'path';
import webpack from 'webpack';

const sourcePath = path.resolve(config.root.dev, config.javascript.dev);
const distPath = path.resolve(config.root.dist, config.javascript.dist);

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendors.min.js'
  })
];

if (isProduction()) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

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

if (!isProduction()) {
  entry.push('webpack-hot-middleware/client?reload=true');
}

const webpackConfig = {
  cache: false,
  entry: entry,
  module: {
    rules: rules
  },
  output: {
    path: distPath,
    filename: 'app.min.js',
    publicPath: config.javascript.dist
  },
  resolve: {
    modules: [sourcePath, 'node_modules'],
    extensions: config.javascript.extensions
  },
  plugins: plugins
};

export default webpackConfig;
