# Развернуть react приложение

```
npm init -y
npm install --save react react-dom
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server
touch .babelrc
touch webpack.config.js
touch index.html
mkdir src
touch ./src/index.js
```
#### index.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div class="cont"></div>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

#### index.js
```
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        Simple React App
      </>
    );
  }
}
render(<App />, document.querySelector('.cont'));
```

#### package.json

```
"scripts": {
	"start": "webpack-dev-server",
	"build": "webpack -p"
},
```

#### .babelrc
```
{
  "presets": ["@babel/env", "@babel/react"]
}
```

#### webpack.config.js
```
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
```

Для запуска:

```
npm start
```
```
npm build
```

http://localhost:1234
