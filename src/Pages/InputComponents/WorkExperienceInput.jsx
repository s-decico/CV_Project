import React from "react";
import { useState } from "react";
import { workExperienceAtom } from "../../Atoms/CVAtoms";
import "../cv.css";
import { TextField, Button } from "@mui/material";

function WorkExperienceInput({ handleWorkExpChange, index, value }) {
  return (
    <>
      <TextField
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

      <TextField
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
    </>
  );
}
export default WorkExperienceInput;
