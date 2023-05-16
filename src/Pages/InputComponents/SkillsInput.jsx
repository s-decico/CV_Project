import React, { useState } from "react";

function SkillsInput({ skills, setSkills }) {
  let tempskills = "";
  return (
    <>
      Skills
      <div className="skillsdisplayinput">
        {skills.map((x) => {
          return <div>{x}</div>;
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          tempskills = e.target.value;
        }}
      />
      <button
        type="button"
        onClick={() => {
          setSkills([...skills, tempskills]);
        }}
      >
        +
      </button>
    </>
  );
}

export default SkillsInput;
