import React, { Component } from 'react';
import './trending.css';



export default class Trending extends Component {


  componentDidMount() {

    document.querySelector('.trending-container').querySelector('.results').onscroll = _ => {
      let container = document.querySelector('.trending-container').querySelector('.results');
      if (!container.scrollLeft) document.querySelector('.trending-false-ani').style.opacity = 1;
      else document.querySelector('.trending-false-ani').style.opacity = 0;
    }
  }

  render() {
    return (
      <div className="trending-container">
        <div className="trending-sub-container">
          <div className="head">
            <span className="trending-txt">Trending</span>
            <span className="options">
              <span className="onTv">Today</span>
              <span className="inThs">This Week</span>
            </span>
            <span className="chosenOption"></span>
          </div>
          <div className="results-container">
            <div className="results">
              {Array.apply(0, Array(20)).map(_ => (
                <div className="popular-demo"></div>
              ))}
            </div>
          </div>
          <div className="trending-false-ani"></div>
        </div>
      </div>
    );
  }
}