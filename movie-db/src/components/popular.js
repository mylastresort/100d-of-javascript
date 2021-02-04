import React, { Component } from 'react';
import './popular.css';



export default class Popular extends Component {


  componentDidMount() {

    document.querySelector('.popular-container').querySelector('.results').onscroll = _ => {
      let container = document.querySelector('.popular-container').querySelector('.results');
      if (!container.scrollLeft) document.querySelector('.popular-false-ani').style.opacity = 1;
      else document.querySelector('.popular-false-ani').style.opacity = 0;
    }
  }

  render() {
    return (
      <div className="popular-container">

        <div className="popular-sub-container">


          <div className="head">
            <span className="popular-txt">What's Popular</span>
            <span className="options">
              <span className="onTv">On TV</span>
              <span className="inThs">In Theaters</span>
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

          <div className="popular-false-ani"></div>

        </div>

      </div>
    );
  }
}