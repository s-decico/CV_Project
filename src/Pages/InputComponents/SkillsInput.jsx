import React, { useState } from "react";
import { TextField, Button, Divider } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
  WhiteAddIcon,
} from "../../MUIStyledComponents";
import IconButton from "@mui/material/IconButton";

function SkillsInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div className="skillLangIntMain">
        <div className="skillLangIntInput">
          <WhiteTextField
            id="outlined-basic"
            label="Type your skill"
            variant="outlined"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <IconButton
            aria-label="add"
            onClick={() => {
              setSkills([...skills, inputValue]);
              setInputValue("");
            }}
          >
            <WhiteAddIcon />
          </IconButton>
        </div>
        <div className="skillLangIntdisplay">
          {skills.map((x) => {
            return (
              <>
                <div className="skillLangIntdisplayunit">
                  {x}
                  <IconButton aria-label="delete">
                    <WhiteDeleteIcon />
                  </IconButton>
                </div>
                <Divider />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SkillsInput;
