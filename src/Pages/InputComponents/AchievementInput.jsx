import React from "react";
import { TextField } from "@mui/material";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

function AchievementInput({ handleAchievementChange, index, value }) {
  return (
    <>
      <WhiteTextField
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

      <WhiteTextField
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
