const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'wiraof.js',
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader']
        })
      },
      {
		test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: '[name].json'
        }
	  }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'wiraof.css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/views/index.html'
    }),
  ]
};

module.exports = config;