import React, { Component } from 'react';
import './footer.css';


export default class Footer extends Component {
  render() {
    return (
      <footer className="homepage-footer">
        <div className="footer-container">
          <div className="join-com">
            <div><i className="fas fa-theater-masks"></i></div>
            <button>JOIN THE COMMUNITY</button>
          </div>
          <div className="the-basics">
            <div className="footer-titles">THE BASICS</div>
            <div className="basics-options">
              About TMDb <br />
              Contact Us <br />
              Support Forums <br />
              API <br />
              System Status <br />
            </div>
          </div>
          <div className="get-involved">
            <div className="footer-titles">GET INVOLVED</div>
            <div className="getInvolved-options">
              Contribution Bible <br />
                3rd Part Applications <br />
                Add New Movie <br />
                Add New TV Show <br />
            </div>
          </div>
          <div className="community">
            <div className="footer-titles">COMMUNITY</div>
            <div className="com-options">
              Guidelines <br />
                Discussions <br />
                Leaderboard <br />
                Twitter <br />
            </div>
          </div>
          <div className="legal">
            <div className="footer-titles">Legal</div>
            <div className="basics-options">
              Terms of Use <br />
              API Terms of Use <br />
              Privacy Policy <br />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}