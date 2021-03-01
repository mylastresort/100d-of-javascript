import React, { useState } from "react";
import { Question, Themes, Settings, Share, Tab, Save } from "./poll container";
import { v4 as uuidv4 } from "uuid";

export default () => {
  const [section, setSection] = useState("Question");
  const changeSection = (section) => setSection(section);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const updateAnswers = (input, answerIndex) =>
    setAnswers(
      answers.map((value, index) =>
        index === answerIndex ? input.target.value : value
      )
    );
  const updateQuestion = (value) => setQuestion(value);
  const [theme, setTheme] = useState(0);
  const [id, setId] = useState(uuidv4());

  return (
    <div className="pb-10 ">
      <div className="relative max-w-lg m-auto overflow-hidden bg-gray-100 rounded-md">
        <div className="flex items-center justify-between px-8 py-2 pb-5 text-sm font-normal text-gray-700">
          <Tab
            title="Question"
            section={section}
            changeSection={changeSection}
          />
          <Tab title="Themes" section={section} changeSection={changeSection} />
          <Tab
            title="Settings"
            section={section}
            changeSection={changeSection}
          />
          <Tab title="Share" section={section} changeSection={changeSection} />
        </div>
        {section === "Question" ? (
          <>
            <Question
              question={question}
              answers={answers}
              updateAnswers={updateAnswers}
              updateQuestion={updateQuestion}
            />
            <Save id={id} pollObject={{ question, answers, theme }} changeSection={changeSection}/>
          </>
        ) : section === "Themes" ? (
          <>
            <Themes />
            <Save id={id} pollObject={{ question, answers, theme }} changeSection={changeSection}/>
          </>
        ) : section === "Settings" ? (
          <>
            <Settings />
            <Save id={id} pollObject={{ question, answers, theme }} changeSection={changeSection}/>
          </>
        ) : (
          <Share id={id} />
        )}
      </div>
    </div>
  );
};
