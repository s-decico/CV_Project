import React from "react";
import { TextField } from "@mui/material";

function AchievementInput({ handleAchievementChange, index, value }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Achievement Title"
        variant="outlined"
        type="text"
        name="title"
        value={value ? value.title : ""}
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
        value={value ? value.subtitle : ""}
        onChange={(event) => {
          handleAchievementChange(event, index);
        }}
      />
    </>
  );
}

export default AchievementInput;
