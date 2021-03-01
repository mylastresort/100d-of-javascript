import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

export default ({ match }) => {
  const f = match;
  const getPoll = async () =>
    await firebase
      .firestore()
      .collection("polls")
      .doc(match.params.pollId)
      .get();
  const [pollObject, setPollObject] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    setPollObject(await getPoll());
    setLoading(false);
  }, [loading]);
  return (
    <div>
      {loading ? (
        <div className="m-12 font-medium text-center uppercase animate-pulse">
          Loading...
        </div>
      ) : pollObject.exists ? (
        <div className="text-center ">
          {console.log(pollObject)}
          <div className="m-6">{`Question : ${
            pollObject.data().question
          }`}</div>
          <div className="m-6">{`Answers : ${pollObject.data().answers}`}</div>
          <div className="m-6">{`Theme : ${pollObject.data().theme}`}</div>
          <div className="m-6">{`Id : ${pollObject.data().id}`}</div>
        </div>
      ) : (
        <div className="text-4xl">404 Not Found</div>
      )}
    </div>
  );
};
