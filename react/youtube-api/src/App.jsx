import React, { Component } from 'react';
import { render } from 'react-dom';
import Search from './Components/Search.jsx';
import VideoDetail from './Components/VideoDetail.jsx';
import VideoList from './Components/VideoList.jsx';
import Error from './Components/Error.jsx';
import youtubeSearch from 'youtube-search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: '',
      query: '',
      video: [],
      selectedVideo: null,
    };
    this.timeout = null;
    this.opts = {
      maxResults: 6,
      key: process.env.YOUTUBE_API_KEY,
    };
  }
  
  videoSearch(query = '') {
    if (process.env.DEVELOPMENT) {
      const video = JSON.parse(process.env.DEMODATA);
      this.setState({
        error: void 0,
        video: video,
        selectedVideo: video[0],
      });
      return;
    }
    youtubeSearch(query, this.opts, (error, video) => {
      if (! error) {
        // Html entity decode
        function decodeHtml(html) {
          const txt = document.createElement('textarea');
          txt.innerHTML = html;
          return txt.value;
        }
        video.forEach(item => {
          item.title = decodeHtml(item.title);
          item.description = decodeHtml(item.description);
        })
      }
      this.setState({
        error,
        video,
        selectedVideo: video[0],
      });
    });
  }
  onVideoSelect(video) {
    this.setState({
      selectedVideo: video,
    });
  }
  onVideoSearch(query) {
    this.setState({ query });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.videoSearch(this.state.query);
    }, 500);
  }
  componentDidMount() {
    this.videoSearch();
  }
  render() {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Search
                onSearchChanged={this.onVideoSearch.bind(this)}
                query={this.state.query}
              />
              <Error error={this.state.error} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-8'>
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className='col-md-4'>
              <VideoList
                onVideoSelect={this.onVideoSelect.bind(this)}
                loading={this.state.loading}
                count={this.opts.maxResults}
                video={this.state.video}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
render(<App />, document.querySelector('.cont'));
