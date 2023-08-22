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

function LanguageInput({ language, setLanguage }) {
  const [inputValue, setInputValue] = useState("");

  const handlelangDelete = (index) => {
    console.log(index);
    let temp = [...language];
    temp.splice(index, 1);
    setLanguage(temp);
    console.log(temp);
  };

  return (
    <>
      <div className="skillLangIntMain">
        <div className="skillLangIntInput">
          <WhiteTextField
            id="outlined-basic"
            label="Language"
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
              setLanguage([...language, inputValue]);
              setInputValue("");
            }}
          >
            <Add />
          </IconButton>
        </div>
        <div className="skillLangIntdisplay">
          {language.map((x, index) => {
            return (
              <>
                <div className="skillLangIntdisplayunit">
                  {x}
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handlelangDelete(index);
                    }}
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

export default LanguageInput;
