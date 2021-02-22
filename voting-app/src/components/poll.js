import React, { useState } from "react";
import { Question, Themes, Settings, Share, Tab } from "./poll container";

export default () => {
  const [section, setSection] = useState("Question");
  const changeSection = section => setSection(section);
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
          <Question />
        ) : section === "Themes" ? (
          <Themes />
        ) : section === "Settings" ? (
          <Settings />
        ) : (
          <Share />
        )}
        <div className="w-11/12 m-auto mb-2">
          <button className="w-full p-2 text-2xl text-white bg-green-500 rounded-lg">
            Create a poll
          </button>
        </div>
      </div>
    </div>
  );
};
