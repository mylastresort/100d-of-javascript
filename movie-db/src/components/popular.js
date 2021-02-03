import React , {Component} from 'react';
import './popular.css';



export default class Popular extends Component {
  render() {
    return (
      <div className="popular-container">
        <div className="popular-sub-container">
          <div className="head">
            <span className="popular-txt">What's Popular</span>
            <span className="options">
              <span className="onTv">On TV</span>
              <span className="inThs">in Theaters</span>
            </span>
            <span className="chosenOption"></span>
          </div>
          <div className="results">
            <span className="demo"></span>
          </div>
        </div>
      </div>
    );
  }
}