const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/App.jsx',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],
  },
  plugins: [
    new Dotenv()
  ],
  devServer: {
    open: true,
    hot: true,
    writeToDisk: true,
    contentBase: __dirname,
    port: 1234,
    host: 'localhost'
  }
}