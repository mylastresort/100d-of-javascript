import React, { Component } from 'react';
import './trailers.css';

export default class Trailers extends Component {
  componentDidMount() {

    document.querySelector('.trailers-container').querySelector('.results-container').onscroll = _ => {
      let container = document.querySelector('.trailers-container').querySelector('.results-container');
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
              {Array.apply(0, Array(17)).map(_ => (
                <div className="trailers-demo">
                  <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="Trailer (video)"/>
                  <div>Title of the trailer</div>
                  <div>Infos of the episode/movie</div>
                </div>
              ))}
            </div>
          </div>
          <div className="trailers-false-ani"></div>
        </div>
      </div>
    )
  }
}