import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function ProjectsInput({ index, setProjectObj, projectObj, value }) {
  const [_projectname, setProjectname] = useState("");
  const [_projectyear, setProjectyear] = useState("");
  let tempobj = {};
  let _tempdetails = {};
  const [_details, setDetails] = useState([]);
  const [detailsComponent, setDetailsComponent] = useState([]);
  let detailsarr = [];

  const handleProjectChange = (event, __details) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...projectObj };

    switch (name) {
      case "projectname":
        setProjectname(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "projectyear":
        setProjectyear(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "details":
        tempobj[index] = { ...tempobj[index], [fieldName]: __details };
        break;
    }

    setProjectObj(tempobj);
    console.log(tempobj);
  };

  const handleAdd = () => {
    let temp = [...detailsComponent, []];
    setDetailsComponent(temp);
  };

  const handleDetailsChange = (e, index) => {
    let tempdetails = [..._details];
    tempdetails[index] = e.target.value;
    // console.log(tempdetails);
    setDetails(tempdetails);
    handleProjectChange(e, tempdetails);
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
        value={value ? value.projectname : ""}
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
        value={value ? value.projectyear : ""}
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
            value={value ? value.details[index] : ""}
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
