const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    open: true,
    hot: true,
    writeToDisk: true,
    contentBase: __dirname,
    port: 1234,
    host: 'localhost'
  }
}