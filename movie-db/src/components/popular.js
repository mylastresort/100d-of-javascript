import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './popular.css';



export default class Popular extends Component {

  state = {
    link: 'https://api.themoviedb.org/3/',
    apiKey: '04c35731a5ee918f014970082a0088b1',
    movie: null,
    tv: null
  }

  async componentDidMount() {
    const { link, apiKey } = this.state;
    this.setState({
      tv: (await (await fetch(`${link}tv/popular?api_key=${apiKey}`)).json()).results,
      movie: (await (await fetch(`${link}movie/popular?api_key=${apiKey}`)).json()).results
    })
    this.getPopular('tv')

    document.querySelector('.popular-container .results-container').onscroll = _ => {
      let container = document.querySelector('.popular-container .results-container');
      if (!container.scrollLeft) document.querySelector('.popular-false-ani').style.opacity = 1;
      else document.querySelector('.popular-false-ani').style.opacity = 0;
    }
  }

  getPopular = type => {
    const method = this.state[type];
    ReactDOM.render(
      method.map(_ => (
        <div className="popular-demo">
          <div className="img-container">
            <img src={`https://image.tmdb.org/t/p/w1280${_.poster_path}`} alt="" />
            <div className="rate-wrapper">
              <p className="pers">{`${_.vote_average * 10}%`}</p><svg className="rate" height="37" width="37"><circle className="rate-circle" strokeWidth="3" fill="transparent" r={(50 / 2) - (5 * 2)} stroke={
                _.vote_average >= 7 ? "#1c965a"
                : _.vote_average >= 2 ? "#d2d531"
                : "#941616"
              } cx="-19" cy="18.5" style={{
                strokeDasharray: `${15 * 2 * Math.PI} ${15 * 2 * Math.PI}`,
                strokeDashoffset: (15 * 2 * Math.PI) - (_.vote_average * 10) / 100 * (15 * 2 * Math.PI)
              }} /></svg>
            </div>
          </div>
          <div className="demo-name">{_[(type === 'movie') ? 'original_title' : 'original_name']}</div>
          <p className="date">{new Date(_[(type === 'movie') ? 'release_date' : 'first_air_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      ))
      , document.querySelector('.popular-container .results'))
  }

  render() {
    return (
      <div className="popular-container">
        <div className="popular-sub-container">
          <div className="head">
            <span className="popular-txt">What's Popular</span>
            <span className="options">
              <span className="onTv" onClick={_ => {
                this.getPopular('tv')
                _.target.style.backgroundColor = '#032541';
                _.target.style.color = '#0ad6c2';
                document.querySelector('.popular-container .inThs').style.backgroundColor = 'white'
                document.querySelector('.popular-container .inThs').style.color = '#032541';
              }}>On TV</span>
              <span className="inThs" onClick={_ => {
                this.getPopular('movie');
                _.target.style.backgroundColor = '#032541';
                _.target.style.color = '#0ad6c2';
                document.querySelector('.popular-container .onTv').style.backgroundColor = 'white'
                document.querySelector('.popular-container .onTv').style.color = '#032541';
              }}>In Theaters</span>
            </span>
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