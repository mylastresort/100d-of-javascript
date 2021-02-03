import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './nav.css';


export default class Nav extends Component {

  componentDidMount() {

    window.onscroll = _ => {
      let nav = document.querySelector('.nav-container');
      if (window.scrollY > 100) nav.style.top = '-64px';
      else if (window.scrollY < 100 && nav.style.top === '-64px') nav.style.top = '0px';
    }
  }

  render() {
    return (

      <div className="container">
        <div className="nav-container">
          <div className="routes">
          Home<i class="fas fa-theater-masks"></i>
            <ul className="setions">
              <li>Movies</li>
              <li>TV Shows</li>
              <li>People</li>
            </ul>
          </div>
          <div className="tools-container">
            <div className="wrapper">
              <ul className="tools">
                <li><i class="fas fa-plus"></i></li>
                <li>EN</li>
                <li>Login</li>
                <li>Join TMDb</li>
                <li><i class="fas fa-search"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
