import React, { Component } from 'react';

export default class Error extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.error ? <>
      <div className="alert alert-danger" role="alert">
        { this.props.error.message }
      </div> 
    </>
    : null
  }
}
