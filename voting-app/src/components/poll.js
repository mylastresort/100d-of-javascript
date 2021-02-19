import React, { Component } from 'react';
import {Question, Themes, Settings, Share} from './poll container';

export default class Poll extends Component  {
  render() {
    return (
      <div className="pb-10 ">
        <div className="relative max-w-lg m-auto overflow-hidden bg-gray-100 rounded-sm">
          <div className="flex items-center px-8 py-2 pb-5 space-x-16 font-semibold text-gray-700">
            <div className="cursor-pointer">Question</div>
            <div className="cursor-pointer">Themes</div>
            <div className="cursor-pointer">Settings</div>
            <div className="cursor-pointer">Share</div>
          </div>
          <Question />
          <div className="w-11/12 m-auto mb-2">
            <button className="w-full p-2 text-2xl text-white bg-green-500 rounded-lg">
              Create a poll
            </button>
          </div>
        </div>
      </div>
    );
  }
}