import React from "react";
import firebase from "firebase";
import "firebase/firestore";

export default ({ id, pollObject, changeSection }) => {
  const savePoll = async () => {
    await firebase.firestore().collection("polls").doc(id).set(pollObject);
    changeSection('Share');
  }

  return (
    <div className="w-11/12 m-auto mb-2">
      <button
        className="w-full p-2 text-2xl text-white bg-green-500 rounded-lg"
        onClick={savePoll}
      >
        Create a poll
      </button>
    </div>
  );
};
