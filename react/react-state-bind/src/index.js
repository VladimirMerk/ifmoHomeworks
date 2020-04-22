import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }
  change(e) {
    const input = e.target.value;
    this.setState(() => {
      return { input }
    });
  }
  render() {
    return (
      <>
        <input
          type='text'
          value={this.state.input}
          onChange={this.change.bind(this)}
        />
        <br />
        <input
          type='text'
          value={this.state.input}
          onChange={this.change.bind(this)}
        />
      </>
    );
  }
}
render(<App />, document.querySelector('.cont'));
