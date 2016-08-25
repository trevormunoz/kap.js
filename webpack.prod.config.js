const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const options = {
  entry: [
    './src/js/main.js',
    './src/js/viewer.js',
    './src/js/map.js',
    './src/css/shim.css'
  ],
  output: {
    path: path.join(__dirname, '_site', 'static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: ['src'],
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['babel-preset-es2015', 'babel-preset-react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.json$/,
        include: ['src'],
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: '_site/static/media/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  ]
};

module.exports = options;
