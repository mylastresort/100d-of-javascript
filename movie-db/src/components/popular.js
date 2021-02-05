import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './popular.css';



export default class Popular extends Component {

  state = {
    link: 'https://api.themoviedb.org/3/',
    apiKey: '04c35731a5ee918f014970082a0088b1',
    movie: null,
    tv:null
  }

  async componentDidMount() {
    document.querySelector('.popular-container').querySelector('.results').onscroll = _ => {
      let container = document.querySelector('.popular-container').querySelector('.results');
      if (!container.scrollLeft) document.querySelector('.popular-false-ani').style.opacity = 1;
      else document.querySelector('.popular-false-ani').style.opacity = 0;
    }


    const {link, apiKey} = this.state;
    this.setState({
      tv : (await (await fetch(`${link}tv/popular?api_key=${apiKey}`)).json()).results,
      movie : (await (await fetch(`${link}movie/popular?api_key=${apiKey}`)).json()).results
    })


    ReactDOM.render(
      this.state.tv.map(_ => (
        <div className="popular-demo">
          <div className="popular-img-container"><img src={`https://image.tmdb.org/t/p/w1280${_.poster_path}`} alt="" /></div>
          <div className="popular-demo-name">{_.original_name}</div>
          <p className="popular-date">{new Date(_.first_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="popular-rate">{`${_.vote_average * 10}%`}</div>
        </div>
        ))
    ,document.querySelector('.popular-container').querySelector('.results'))
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
              {
                Array.apply(0, Array(20)).map(_ => (
                  <div className="popular-demo"></div>
                ))
              }
            </div>
          </div>
          <div className="popular-false-ani"></div>
        </div>
      </div>
    );
  }
}