import React, { Component } from 'react';
import Loader from './Loader.jsx';

function Video({ data }) {
  const url = `https://www.youtube.com/embed/${data.id}`;
  return (
    <>
      <div className='video-detail'>
        <div className='embed-responsive embed-responsive-16by9'>
          <iframe
            src={url}
            className='embed-responsive-item'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <div className='details'>
          <div>{data.title}</div>
          <div>{data.description}</div>
        </div>
      </div>
    </>
  );
}

export default class VideoDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.video) {
      return (<Video data={this.props.video} />);
    }
    
    return (<Loader />);
  }
}
