import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

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
      <WhiteTextField
        id="outlined-basic"
        label="Type your interests"
        variant="outlined"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <GradientButton
        variant="outlined"
        type="button"
        onClick={() => {
          setInterests([...interests, inputValue]);
          setInputValue("");
        }}
      >
        +
      </GradientButton>
    </>
  );
}

export default InterestsInput;
