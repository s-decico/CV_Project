import React from "react";

function EducationInput({ handleEducationChange, index }) {
  return (
    <>
      <label htmlFor="degree">Degree</label>
      <input
        type="text"
        name="degree"
        id="input_text"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />
      <label htmlFor="school">School/College</label>
      <input
        type="text"
        name="school"
        id="input_text"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />
      <label htmlFor="doj">Date of joining</label>
      <input
        type="text"
        name="doj"
        id="input_text"
        onChange={(event) => {
          handleEducationChange(event, index);
        }}
      />
      <p></p>
    </>
  );
}

export default EducationInput;
