import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

export default ({ match }) => {
  const getPoll = async () =>
    await firebase
      .firestore()
      .collection("polls")
      .doc(match.params.pollId)
      .get();
  const addVote = async () => {
    const form = document.getElementsByName("answers");
    const storedVotes = pollObject.data().votes;
    for await (const ans of form) {
      if (ans.checked) {
        await firebase
          .firestore()
          .collection("polls")
          .doc(match.params.pollId)
          .update({
            votes: storedVotes.map((vote, index) =>
              index == ans.id ? vote + 1 : vote
            ),
          });
      }
    }
  };
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
          <div className="m-6">{`Question : ${
            pollObject.data().question
          }`}</div>
          <div className="mt-4">
            <span>Answers :</span>
            <div className="flex flex-col mt-2">
              {pollObject.data().answers.map((ans, index) => (
                <div>
                  <input
                    id={index}
                    type="radio"
                    name="answers"
                    value={ans}
                  ></input>
                  <label for={ans}>{ans}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="m-6">{`Theme : ${pollObject.data().theme}`}</div>
          <button
            className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded outline-none hover:bg-blue-500 hover:text-white hover:border-transparent"
            onClick={addVote}
          >
            Vote!!
          </button>
        </div>
      ) : (
        <div className="text-4xl">404 Not Found</div>
      )}
    </div>
  );
};
