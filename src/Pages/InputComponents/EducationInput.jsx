import React from "react";
import { TextField, Button } from "@mui/material";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

function EducationInput({ handleEducationChange, index, value }) {
  return (
    <>
      <WhiteTextField
        id="outlined-basic"
        label="Qualification"
        variant="outlined"
        type="text"
        name="qualification"
        value={value ? value.qualification : ""}
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />

      <WhiteTextField
        id="outlined-basic"
        label="School/College"
        variant="outlined"
        type="text"
        name="school"
        value={value ? value.school : ""}
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />

      <WhiteTextField
        id="outlined-basic"
        label="Date of joining"
        variant="outlined"
        type="text"
        name="doj"
        value={value ? value.doj : ""}
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />
      <p></p>
    </>
  );
}

export default EducationInput;
