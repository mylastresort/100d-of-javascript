import React, { Component } from 'react';
import './join.css';


export default class Join extends Component {
  render() {
    return (
      <div className="join-container">
        <div className="join-title">Join Today</div>
        <div className="join-inst">
          <span className="join-content">
            <p>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like .</p>
            <button className="signup-btn">Sign Up</button>
          </span>
          <span className="join-features">
            <li>Enjoy TMDb ad free</li>
            <li>Maintain a personal watchlist</li>
            <li>Filter by your subscribed streaming services and find something to watch</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </span>
        </div>
      </div>
    );
  }
}