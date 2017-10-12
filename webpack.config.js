const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/stylesheets',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new extractTextPlugin('dist/style.css')
  ],
  watch: true
};
