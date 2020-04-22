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