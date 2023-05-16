import React from "react";
import { useState } from "react";
import { workExperienceAtom } from "../../Atoms/CVAtoms";
import "../cv.css";

function WorkExperienceInput({ handleWorkExpChange, index }) {
  const [workExperience, setWorkExperience] = useState([]);

  return (
    <>
      <label htmlFor="designation">Designation</label>
      <input
        type="text"
        name="designation"
        id="input_text"
        onChange={(event) => {
          handleWorkExpChange(event, index);
        }}
      />
      <label htmlFor="companyname">Company Name</label>
      <input
        type="text"
        name="companyname"
        id="input_text"
        onChange={(event) => {
          handleWorkExpChange(event, index);
        }}
      />
      <p></p>
    </>
  );
}
export default WorkExperienceInput;
