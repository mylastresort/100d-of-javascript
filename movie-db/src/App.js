import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav.js';
import News from './components/news.js';
import Popular from './components/popular.js';


export default class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <News/>
        <Popular/>
      </>
    );
  }
}
