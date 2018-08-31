const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//entry: './src/app.js',

module.exports = (env) => {

  return {
  mode: 'development',
  entry: ["babel-polyfill", './src/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
          }
        }]
      }, {
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test:  /\.s?css$/,
      use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
    }
    ],
    },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [
    CSSExtract
  ]
}
};
