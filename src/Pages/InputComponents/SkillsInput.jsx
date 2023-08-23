import React, { useState } from "react";
import { TextField, Button, Divider } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
  WhiteAddIcon,
} from "../../MUIStyledComponents";
import IconButton from "@mui/material/IconButton";
import { Add, Delete } from "@mui/icons-material";

function SkillsInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");

  const handleSkillDelete = (index) => {
    console.log(index);
    let temp = [...skills];
    temp.splice(index, 1);
    setSkills(temp);
    console.log(temp);
  };
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
            <Add />
          </IconButton>
        </div>
        <div className="skillLangIntdisplay">
          {skills.map((x, index) => {
            return (
              <>
                <div className="skillLangIntdisplayunit">
                  {x}
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleSkillDelete(index)}
                  >
                    <Delete />
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
