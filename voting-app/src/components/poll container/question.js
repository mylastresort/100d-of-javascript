import React, { useState } from "react";

export default () => {
  const [question, setQuestion] = useState("Type your question here");
  const [answers, setAnswers] = useState([]);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden ">
          <textarea
            rows="4"
            className="w-11/12 font-bold bg-transparent border outline-none resize"
            placeholder={question}
          />
        </div>
      </div>
      <div className="grid p-2 text-left text-blue-600 bg-transparent">
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          placeholder="Type your answers here"
        >
          {answers[0] ?? ""}
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          {answers[1] ?? ""}
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          {answers[2] ?? ""}
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          {answers[3] ?? ""}
        </textarea>
        <textarea className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none">
          {answers[4] ?? ""}
        </textarea>
      </div>
    </>
  );
};
