var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {app: './public/app/App.js'},
  output: { filename: 'public/build/bundle.js' },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }	
      }
    ]
  },
};