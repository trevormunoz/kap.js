const webpack = require('webpack');
const path = require('path');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

const options = {
  entry: [
    './src/js/main.js'
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, "_site", "static"),
    publicPath: 'http://localhost:8080/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: 'http://localhost:4000/',
    colors: true,
    quiet: true,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
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
        loader: 'style!css!sass'
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
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
  ]
};

module.exports = options;
