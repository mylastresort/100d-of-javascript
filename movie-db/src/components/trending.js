import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './trending.css';



export default class Trending extends Component {

  state = {
    link: 'https://api.themoviedb.org/3/',
    apiKey: '04c35731a5ee918f014970082a0088b1',
    day: { movie: null, tv: null },
    week: { movie: null, tv: null }
  }

  async componentDidMount() {
    const { link, apiKey } = this.state;
    this.setState({
      day: {
        movie: (await (await fetch(`${link}trending/movie/day?api_key=${apiKey}`)).json()).results.slice(0, 10),
        tv: (await (await fetch(`${link}trending/tv/day?api_key=${apiKey}`)).json()).results.slice(0, 10)
      },
      week: {
        movie: (await (await fetch(`${link}trending/movie/week?api_key=${apiKey}`)).json()).results.slice(0, 10),
        tv: (await (await fetch(`${link}trending/tv/week?api_key=${apiKey}`)).json()).results.slice(0, 10)
      }
    })
    this.getTrending('day');

    document.querySelector('.trending-container .results-container').onscroll = _ => {
      let container = document.querySelector('.trending-container .results-container');
      if (!container.scrollLeft) document.querySelector('.trending-false-ani').style.opacity = 1;
      else document.querySelector('.trending-false-ani').style.opacity = 0;
    }
  }


  getTrending = time_show => {
    const results = [];
    const items = [...this.state[time_show].movie, ...this.state[time_show].tv]
    items.forEach((item, index) => {
      if (index <= 9) {
        if (index % 2 === 0) results[index * index] = item
        else results[index + 1] = item
      } else {
        if (index % 2 === 0) results[(index - 10) + 1] = item
        else results[(index - 10) + 2] = item
      }
    })
    ReactDOM.render(
      results.map(_ => (
        <div className="trending-demo">
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
          <div className="demo-name">{_[(_.media_type === 'movie') ? 'original_title' : 'original_name']}</div>
          <p className="date">{new Date(_[(_.media_type === 'movie') ? 'release_date' : 'first_air_date']).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      ))
      , document.querySelector('.trending-container .results'))
  }

  render() {
    return (
      <div className="trending-container">
        <div className="trending-sub-container">
          <div className="head">
            <span className="trending-txt">Trending</span>
            <span className="options">
              <span className="day" onClick={_ => {
                this.getTrending('day')
                _.target.style.backgroundColor = '#032541';
                _.target.style.color = '#0ad6c2';
                document.querySelector('.week').style.backgroundColor = 'white'
                document.querySelector('.week').style.color = '#032541';
              }}>Today</span>
              <span className="week" onClick={_ => {
                this.getTrending('week')
                _.target.style.backgroundColor = '#032541';
                _.target.style.color = '#0ad6c2';
                document.querySelector('.day').style.backgroundColor = 'white'
                document.querySelector('.day').style.color = '#032541';
              }}>This Week</span>
            </span>
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