import React, { useState } from "react";

export default ({ id }) => {
  const [link, setLink] = useState(`http://localhost:3000/${id}`);
  return (
    <>
      <a href={link} className="text-2xl font-bold text-blue-400">
        Preview
      </a>
    </>
  );
};
