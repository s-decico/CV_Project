import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function ProjectsInput({ index, setProjectObj, projectObj }) {
  const [_projectname, setProjectname] = useState("");
  const [_projectyear, setProjectyear] = useState("");
  let tempobj = {};
  let _tempdetails = {};
  const [details, setDetails] = useState([]);
  const [detailsComponent, setDetailsComponent] = useState([]);
  let detailsarr = [];
  const handleProjectChange = (event, _details) => {
    switch (event.target.name) {
      case "projectname":
        setProjectname(event.target.value);
        break;
      case "projectyear":
        setProjectyear(event.target.value);
        break;
    }

    tempobj = {};
    tempobj = { ...projectObj };
    tempobj[index] = {
      projectname: _projectname,
      projectyear: _projectyear,
      details: _details,
    };
    setProjectObj(tempobj);
    console.log(projectObj);
  };
  const handleAdd = () => {
    let temp = [...detailsComponent, []];
    setDetailsComponent(temp);
  };
  const handleDetailsChange = (e, index) => {
    let tempdetails = [...details];
    tempdetails[index] = e.target.value;
    setDetails(tempdetails);
    handleProjectChange(e, details);
  };

  return (
    <>
      <label htmlFor="projectname">Project Name</label>
      <TextField
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        type="text"
        name="projectname"
        onChange={(event) => {
          handleProjectChange(event);
        }}
      />
      <label htmlFor="projectyear">Year</label>
      <TextField
        id="outlined-basic"
        label="Year"
        variant="outlined"
        type="text"
        name="projectyear"
        onChange={(event) => {
          handleProjectChange(event);
        }}
      />
      <label htmlFor="projectdetails">Details</label>
      <Button variant="contained" type="button" onClick={() => handleAdd()}>
        Add details
      </Button>

      {detailsComponent.map((obj, index) => {
        return (
          <TextField
            id="outlined-basic"
            label="Details"
            variant="standard"
            type="text"
            name="details"
            onChange={(e) => {
              handleDetailsChange(e, index);
            }}
          />
        );
      })}
    </>
  );
}

export default ProjectsInput;
