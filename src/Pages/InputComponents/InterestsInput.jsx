import React, { useState } from "react";

function InterestsInput({ interests, setInterests }) {
  let tempinterests = "";
  return (
    <>
      Interests
      <div className="interestsdisplayinput">
        {interests.map((x) => {
          return <div>{x}</div>;
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          tempinterests = e.target.value;
        }}
      />
      <button
        type="button"
        onClick={() => {
          setInterests([...interests, tempinterests]);
        }}
      >
        +
      </button>
    </>
  );
}

export default InterestsInput;
