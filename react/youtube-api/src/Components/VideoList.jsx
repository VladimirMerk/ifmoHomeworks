import React, { Component } from 'react';
import VideoListItem from './VideoListItem.jsx';

export default class VideoPreview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listItems = this.props.video.map((item, i) => {
      const video = item || null;
      return (<VideoListItem
        onVideoSelect={this.props.onVideoSelect}
        key={video.id || i}
        video={video}
      />);
    });

    return (
      <>
        <ul className='list-group'>{listItems}</ul>
      </>
    );
  }
}
