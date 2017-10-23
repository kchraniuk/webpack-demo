const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractSASS = new ExtractTextPlugin({
  filename: '[name].css?[hash]', 
  allChunks: true,
  disable: false
});
const cleanPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'app.js':'./app.js',
    'assets/css/b': './js/entry-styles.js'
    // 'assets/css/app.css': './stylesheets/app.scss'
    // 'assets/css/example.css': './stylesheets/example.scss',
  },
  output: {
    filename: '[name]?[hash]',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
  },  
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }],

        })
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    extractSASS,
    cleanPlugin
  ],
  watch: true
};
