import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function SkillsInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      Skills
      <div className="skillsdisplayinput">
        {skills.map((x) => {
          return <div>{x}</div>;
        })}
      </div>
      <TextField
        id="outlined-basic"
        label="Type your skill"
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
          setSkills([...skills, inputValue]);
          setInputValue("");
        }}
      >
        +
      </Button>
    </>
  );
}

export default SkillsInput;
