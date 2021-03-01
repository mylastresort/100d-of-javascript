import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Preview from "./components/Preview";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBBs38e9n2Nk_pRxQpUKqAA6Hx9uL59Aic",
  authDomain: "voting-app-challenge.firebaseapp.com",
  projectId: "voting-app-challenge",
  storageBucket: "voting-app-challenge.appspot.com",
  messagingSenderId: "1097972333505",
  appId: "1:1097972333505:web:2d971a38fc30c491c08d40",
  measurementId: "G-9DV9T4HPEJ",
});

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:pollId" component={Preview} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
