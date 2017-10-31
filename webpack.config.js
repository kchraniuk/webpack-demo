const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanPlugin = new CleanWebpackPlugin(['dist']);
const copyStaticContent = new CopyWebpackPlugin([
    { from: 'html', to: '../' },
    { from: 'images', to: 'images' }
]);
const extractSASS = new ExtractTextPlugin({
  filename: 'css/app.css',
  allChunks: true,
  disable: false
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './scripts/app.js',
  output: {
    filename: 'scripts/app.js',
    path: path.join(__dirname, "/dist/assets/"),
    publicPath: "/assets/"
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
    cleanPlugin,
    extractSASS,
    copyStaticContent
  ],
  watch: true
};
