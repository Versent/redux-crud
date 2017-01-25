var path    = require('path')
var webpack = require('webpack')

/*
publicPath is used for finding the bundles during dev
e.g. http://localhost:4002/bundles/app.js

When the index.html is served using the webpack server then just specify the path.

When index.html is served using a framework e.g. from Rails, Phoenix or Go
then you must specify the full url where the webpack dev server is running e.g. http://localhost:4000/bundles/

This path is also used for resolving relative assets e.g. fonts from css. So for production and staging this path has to be
overriden. See webpack.prod.config.js
*/
var publicPath = '/bundles/'

// var providePlugin = new webpack.ProvidePlugin({
//  fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
// });

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: {
    app:           [
      './src/app.jsx',
    ],
  },
  // watchOptions only works with CLI (not dev server)
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: 1000,
  // },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: ['style', 'css!autoprefixer-loader?browsers=last 2 version!less'],
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js|\.jsx/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'public', 'bundles'),
    filename:    '[name].js',
    publicPath:  publicPath,
  },
}
