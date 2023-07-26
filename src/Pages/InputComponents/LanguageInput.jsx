import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

function LanguageInput({ language, setLanguage }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      Languages
      <div className="languagedisplayinput">
        {language.map((x) => {
          return <div>{x}</div>;
        })}
      </div>
      <TextField
        id="outlined-basic"
        label="Language"
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
          setLanguage([...language, inputValue]);
          setInputValue("");
        }}
      >
        +
      </GradientButton>
    </>
  );
}

export default LanguageInput;
