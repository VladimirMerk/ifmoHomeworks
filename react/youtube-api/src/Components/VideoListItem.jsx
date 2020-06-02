import React, { Component } from 'react';
import Loader from './Loader.jsx';

export default class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.video) {
      const video = this.props.video;
      const image = video.thumbnails.default;
      return (
        <>
          <li
            onClick={() => { this.props.onVideoSelect(video) }}
            className='list-group-item'
          >
            <div className='video_list media'>
              <div className='media-left'>
                <img
                  alt={video.description}
                  width={image.width}
                  height={image.height}
                  className='media-object'
                  src={image.url}
                />
              </div>
              <div className='media-body'>
                <div className='media-heading'>{video.title}</div>
              </div>
            </div>
          </li>
        </>
      );
    } else {
      return <Loader />;
    }
  }
}
