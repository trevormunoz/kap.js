const webpack = require('webpack');
const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

const options = {
  entry: [
    './src/js/main.js'
  ],
  output: {
    filename: '[name].js',
    path: 'dist'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    colors: true,
    quiet: true,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['babel-preset-es2015', 'babel-preset-react']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.join(__dirname, 'eslint.js'),
              useEslintrc: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        include: ['src'],
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dist/static/media/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
    new HtmlWebpackPlugin({
      title: "KAP Collection Search",
      template: 'index.ejs'
    }),
    new DashboardPlugin(dashboard.setData)
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  }
};

module.exports = options;
