import React from "react";

export default ({ section, title, changeSection }) => {
  return (
    <div
      onClick={() => changeSection(title)}
      className="cursor-pointer"
      style={section === title ? { color: "#005699" } : {}}
    >
      {title}
    </div>
  );
};
