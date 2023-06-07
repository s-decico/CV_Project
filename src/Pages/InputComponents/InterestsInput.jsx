import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

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
      <TextField
        id="outlined-basic"
        label="Type your interests"
        variant="outlined"
        type="text"
        onChange={(e) => {
          tempinterests = e.target.value;
        }}
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          setInterests([...interests, tempinterests]);
        }}
      >
        +
      </Button>
    </>
  );
}

export default InterestsInput;
