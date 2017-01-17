const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'react-model-forms'),
  output: {
    library: 'ReactModelForms',
    libraryTarget: 'umd',
    filename: 'react-model-forms.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'model-lang': {
      commonjs2: 'model-lang',
      commonjs: 'model-lang'
    }
  }],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    Buffer: false
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
