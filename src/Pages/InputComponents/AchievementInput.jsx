import React from "react";
import { IconButton, TextField } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";
import { Delete } from "@mui/icons-material";

function AchievementInput({
  handleAchievementChange,
  index,
  value,
  handleAchievementDelete,
}) {
  return (
    <>
      <div className="achivementsub">
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
        <div className="workexpprojdelete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleAchievementDelete(index);
            }}
          >
            <WhiteDeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default AchievementInput;
