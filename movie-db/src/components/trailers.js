import React, { Component } from 'react';
import './trailers.css';
import './popular.css';

export default class Trailers extends Component {
  componentDidMount() {

    document.querySelector('.trailers-container').querySelector('.results').onscroll = _ => {
      let container = document.querySelector('.trailers-container').querySelector('.results');
      if (!container.scrollLeft) document.querySelector('.trailers-false-ani').style.opacity = 1;
      else document.querySelector('.trailers-false-ani').style.opacity = 0;
    }
  }

  render() {
    return (
      <div className="trailers-container">
        <div className="trailers-sub-container">
          <div className="head">
            <span className="trailers-txt">Latest Trailers</span>
            <span className="options">
              <span className="onTv">On TV</span>
              <span className="inThs">In Theaters</span>
            </span>
            <span className="chosenOption"></span>
          </div>
          <div className="results-container">
            <div className="results">
              {Array.apply(0, Array(18)).map(_ => (
                <div className="trailers-demo"></div>
              ))}
            </div>
          </div>
          <div className="trailers-false-ani"></div>
        </div>
      </div>
    )
  }
}