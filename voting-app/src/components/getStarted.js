import React from "react";

export default () => {
  return (
    <div className="pt-16 pb-8">
      <h1 className="text-6xl text-center ">How to Make a Poll</h1>
      <div className="flex justify-between mt-12 text-xl">
        <div className="p-6 m-12 border-2 border-gray-500 rounded-md">
          Type your question
        </div>
        <div className="p-6 m-12 border-2 border-gray-500 rounded-md">
          Hit 'Themes' and select a style
        </div>
        <div className="p-6 m-12 border-2 border-gray-500 rounded-md">
          Click Share
        </div>
      </div>
    </div>
  );
};
