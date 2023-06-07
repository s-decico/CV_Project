import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function LanguageInput({ language, setLanguage }) {
  let templanguage = "";
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
        onChange={(e) => {
          templanguage = e.target.value;
        }}
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          setLanguage([...language, templanguage]);
        }}
      >
        +
      </Button>
    </>
  );
}

export default LanguageInput;
