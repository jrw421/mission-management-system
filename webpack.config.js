const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const webpack = require('webpack');

const webpackConfig = {
  entry: {
    scripts: './client/src/index.jsx',
  },
  output: {
    filename: 'bundle/[name].js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
      },
    }),
    new webpack.optimize.DedupePlugin(),
  );
}

module.exports = webpackConfig;
