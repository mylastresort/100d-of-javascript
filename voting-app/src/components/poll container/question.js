import React from "react";

export default ({ question, answers, updateQuestion, updateAnswers }) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden ">
          <textarea
            rows="4"
            className="w-11/12 font-bold text-blue-600 bg-transparent border outline-none resize"
            placeholder="Type your question here"
            onChange={(_) => updateQuestion(_.target.value)}
          >
            {question ?? ""}
          </textarea>
        </div>
      </div>
      <div className="grid p-2 text-left text-blue-600 bg-transparent">
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          placeholder="Type your answers here"
          onChange={(_) => updateAnswers(_, 0)}
        >
          {answers[0]}
        </textarea>
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          onChange={(_) => updateAnswers(_, 1)}
        >
          {answers[1]}
        </textarea>
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          onChange={(_) => updateAnswers(_, 2)}
        >
          {answers[2]}
        </textarea>
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          onChange={(_) => updateAnswers(_, 3)}
        >
          {answers[3]}
        </textarea>
        <textarea
          className="m-1 font-semibold bg-transparent border-2 rounded-sm outline-none resize-none"
          onChange={(_) => updateAnswers(_, 4)}
        >
          {answers[4]}
        </textarea>
      </div>
    </>
  );
};
