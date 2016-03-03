var path = require('path');
var webpack = require('webpack');
var bower_dir = path.join(__dirname, 'bower_components');

module.exports = {
  entry: [
    'babel-polyfill',
    './Source/main'
  ],
  output: {
    path: __dirname + '/Publish',
    filename: 'main.js'
  },
  debug: true,
  resolve: {
    alias: {
      '$': bower_dir + '/jquery/dist/jquery.min.js',
      'd3': bower_dir + '/d3/d3.min.js'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'Source'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }]
  },
  plugins:[
		// This plugin makes a module available as variable in every module
		new webpack.ProvidePlugin({
			d3: "d3",
			jquery: "jquery"
		})],
  devServer: {
    contentBase: "./Source"
  }
};
