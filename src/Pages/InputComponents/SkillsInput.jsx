import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function SkillsInput({ skills, setSkills }) {
  let tempskills = "";
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
        onChange={(e) => {
          tempskills = e.target.value;
        }}
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          setSkills([...skills, tempskills]);
        }}
      >
        +
      </Button>
    </>
  );
}

export default SkillsInput;
