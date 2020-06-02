import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className='search-bar'>
          <input
            onChange={(e) => this.props.onSearchChanged(e.target.value)}
            value={this.props.query}
          />
        </div>
      </>
    );
  }
}
