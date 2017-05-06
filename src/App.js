import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Viewer from './Viewer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      currentPhoto: 0,
      intervalRef: '',
      maxPhotoIndex: 0,
      direction: 1
    };
  }
  componentDidMount() {
    this._fetchPhotos();
    this._autoMove();
  }

  _autoMove = () => {
    clearTimeout(this.state.intervalRef);
    const intervalRef = setInterval(() => {
      this._handleClick(1)
    }, 7000);
    this.setState({ intervalRef });
  }

  _fetchPhotos = (pagination = 1) => {
    fetch(`https://api.unsplash.com/photos/?page=${pagination}&client_id=6bb5bb78cfde81736048d37f2d3399d5024a6a5be277ad88a4b1a366a5e4f77f`)
    .then((response) => {
      this.setState({maxPhotoIndex: parseInt(response.headers.get("x-total"), 10)});
      return response.json();
    })
    .then((data) => {
      const newPhotos = this.state.photos.concat(data);
      this.setState({ photos: newPhotos });
    })
    .catch(error => console.error(`error in fetch messages ${error}`));
  }

  _handleClick = (val) => {
    this.setState({direction: val});
    if ((this.state.currentPhoto + (val)) <= this.state.maxPhotoIndex && this.state.currentPhoto + (val) >= 0) {
      this.setState({currentPhoto: this.state.currentPhoto + (val)});
      if (this.state.photos.length - 2 === this.state.currentPhoto) {
        const pageNum = Math.floor((this.state.currentPhoto + 2) / 10) + 1;
        this._fetchPhotos(pageNum);
      }
      this._autoMove();
    }
  }

  render() {
    let transiton;
    this.state.direction > -1 ?  transiton = `transition-slide-right` :  transiton = `transition-slide-left`;
    return (
      <div className="app">
        <button className="button" onClick={() => this._handleClick(1)} name="decrement">forward</button>
        <div className="transition-container">
          <CSSTransitionGroup
            component="div"
            className="container"
            transitionName={transiton}
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}>
            {this.state.photos.length > 0 &&
            <Viewer key={this.state.currentPhoto} data={this.state.photos[this.state.currentPhoto]}/> }
          </CSSTransitionGroup>
        </div>
        <button className="button" onClick={() => this._handleClick(-1)} name="increment">back</button>
      </div>
    );
  }
}

export default App;
