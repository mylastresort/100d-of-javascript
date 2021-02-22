import React from "react";
import "./App.css";
import './assets/font.css'
import "./assets/tailwind.css";
import Nav from "./components/nav";
import Poll from "./components/poll";
import GetStarted from "./components/getStarted";

export default () => {
  return (
    <>
      <div className="text-center font-oswald app-container bg-gradient-to-r from-red-600 to to-yellow-500">
        <Nav />
        <h1 className="text-3xl mt-7 text-gray-50">
          Use the #1 Rated Online Poll Maker
        </h1>
        <h3 className="mt-4 mb-4 text-2xl font-normal text-gray-50">
          Create a Free Poll in Seconds
        </h3>
        <Poll />
      </div>
      <GetStarted />
    </>
  );
};
