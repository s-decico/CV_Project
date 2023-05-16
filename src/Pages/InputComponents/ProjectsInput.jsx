import React from "react";

function ProjectsInput({ handleProjectChange, index }) {
  return (
    <>
      <label htmlFor="projectname">Project Name</label>
      <input
        type="text"
        name="projectname"
        id="input_text"
        onChange={(event) => {
          handleProjectChange(event, index);
        }}
      />
      <label htmlFor="projectyear">Year</label>
      <input
        type="text"
        name="projectyear"
        id="input_text"
        onChange={(event) => {
          handleProjectChange(event, index);
        }}
      />
      <label htmlFor="projectdetails">Year</label>
    </>
  );
}

export default ProjectsInput;
