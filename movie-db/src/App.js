import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav.js';
import News from './components/news.js';
import Popular from './components/popular.js';
import Trailers from './components/trailers.js'
import Trending from './components/trending.js'
import Join from './components/join.js'
import Footer from './components/footer.js'

export default class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <News />
        <Popular />
        <Trailers />
        <Trending />
        <Join />
        <Footer />
      </>
    );
  }
}
