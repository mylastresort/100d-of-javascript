import React, { Component } from 'react';
import './news.css';


export default class News extends Component {
  render() {
    return (
      <div className="news-container">
        <span className="text-news">News</span>
        <img src="https://img1.looper.com/img/gallery/theres-a-small-shred-of-hope-for-mindhunter-season-3/l-intro-1605823286.jpg" alt="News" />
        <div className="search-bar">
          <input type="text" placeholder="Search for a movie, tv show, person..." id="search" />
          <input type="submit" id="search-fired" value="Search" />
        </div>
      </div>
    )
  }
}