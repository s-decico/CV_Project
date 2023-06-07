import React from "react";
import { TextField } from "@mui/material";

function AchievementInput({ handleAchievementChange, index }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Achievement Title"
        variant="outlined"
        type="text"
        name="title"
        onChange={(event) => {
          handleAchievementChange(event, index);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Achievement Subtitle"
        variant="outlined"
        type="text"
        name="subtitle"
        onChange={(event) => {
          handleAchievementChange(event, index);
        }}
      />
    </>
  );
}

export default AchievementInput;
