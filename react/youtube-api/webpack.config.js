const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  console.log('Environment variables: ', env)
  return {
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
      new Dotenv({
        path: (env && env.production) ? './.env' :'./.dev.env'
      })
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
}