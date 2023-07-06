import React from "react";
import { TextField, Button } from "@mui/material";

function EducationInput({ handleEducationChange, index }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Qualification"
        variant="outlined"
        type="text"
        name="qualification"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />

      <TextField
        id="outlined-basic"
        label="School/College"
        variant="outlined"
        type="text"
        name="school"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Date of joining"
        variant="outlined"
        type="text"
        name="doj"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />
      <p></p>
    </>
  );
}

export default EducationInput;
