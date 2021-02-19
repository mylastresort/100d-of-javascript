import React from 'react';

export default () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden ">
          <textarea
            cols="45"
            rows="4"
            className="font-bold bg-transparent border outline-none resize"
            placeholder="what makes this poll so different?"
          />
        </div>
      </div>
      <div className="grid p-2 text-left text-blue-600 bg-transparent">
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          generating links
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          the features
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          website design
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          what the receiver see
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">

        </textarea>
      </div>
    </>
  );
}