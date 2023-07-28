import React from "react";
import { useState } from "react";
import { workExperienceAtom } from "../../Atoms/CVAtoms";
import "../cv.css";
import { TextField, Button } from "@mui/material";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";
import "../cv.css";

function WorkExperienceInput({ handleWorkExpChange, index, value }) {
  return (
    <>
      <div className="workexperience">
        <WhiteTextField
          id="outlined-basic"
          label="Designation"
          variant="outlined"
          type="text"
          name="designation"
          value={value ? value.designation : ""}
          onChange={(event) => {
            handleWorkExpChange(event, index);
          }}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          type="text"
          name="companyname"
          value={value ? value.companyname : ""}
          onChange={(event) => {
            handleWorkExpChange(event, index);
          }}
        />
      </div>
    </>
  );
}
export default WorkExperienceInput;
