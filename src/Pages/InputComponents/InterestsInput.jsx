import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function InterestsInput({ interests, setInterests }) {
  const [inputValue, setInputValue] = useState("");
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
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          setInterests([...interests, inputValue]);
          setInputValue("");
        }}
      >
        +
      </Button>
    </>
  );
}

export default InterestsInput;
