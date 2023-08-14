import React, { useState, useEffect } from "react";
import { TextField, Button, Tooltip } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";

function ProjectsInput({ index, setProjectObj, projectObj, value }) {
  const [_projectname, setProjectname] = useState("");
  const [_projectyear, setProjectyear] = useState("");
  let tempobj = {};
  let _tempdetails = {};
  const [_details, setDetails] = useState([]);
  const [detailsComponent, setDetailsComponent] = useState([]);
  let detailsarr = [];

  useEffect(() => {
    if (value && value.details && Array.isArray(value.details)) {
      setDetails([...value.details]);
    } else {
      setDetails([]);
    }
  }, [value, index]);

  const handleProjectChange = (event, __details) => {
    const { name, value } = event.target;
    let fieldName = name;
    const updatedProjObj = [...projectObj];

    // Get the current object from the copied array or create a new object if not exists
    const projObjtemp = updatedProjObj[index] || {};

    // Update the specific field in the copied object
    if (name === "details") projObjtemp[name] = __details;
    else projObjtemp[name] = value;

    // Update the copied object back into the copied array
    updatedProjObj[index] = projObjtemp;

    // Update the state with the modified array
    setProjectObj(updatedProjObj);
    console.log(updatedProjObj);
  };

  const handleAdd = () => {
    let temp = [..._details, ""];
    setDetails(temp);
  };

  const handleDetailsChange = (e, index) => {
    let tempdetails = [..._details];
    tempdetails[index] = e.target.value;
    setDetails(tempdetails);
    handleProjectChange(e, tempdetails);
  };

  const handleDetailsDelete = (detailIndex) => {
    console.log("v:" + detailIndex);
    const temp = [..._details];
    temp.splice(detailIndex, 1);
    console.log("temp:", temp);
    setDetails(temp);
  };

  return (
    <>
      <div className="workExperienceProjSub">
        <div className="workExperienceProjTitle">
          <WhiteTextField
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
          <WhiteTextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            type="text"
            name="projectyear"
            value={value ? value.projectyear : ""}
            onChange={(event) => {
              handleProjectChange(event);
            }}
            sx={{ marginTop: "1rem" }}
          />
          <Tooltip title="Enter the URL of the project" placement="top">
            <WhiteTextField
              id="outlined-basic"
              label="Link to Project"
              variant="outlined"
              type="text"
              name="projectlink"
              value={value ? value.projectlink : ""}
              onChange={(event) => {
                handleProjectChange(event);
              }}
              sx={{ marginTop: "1rem" }}
            />
          </Tooltip>
        </div>
        <div className="detailsMain">
          <div className="detailsHead">
            Details
            <IconButton aria-label="add" onClick={() => handleAdd()}>
              <Add />
            </IconButton>
          </div>
          {_details.map((obj, index) => {
            return (
              <>
                <div className="detailUnit">
                  <WhiteTextField
                    id="outlined-basic"
                    label="Details"
                    variant="standard"
                    type="text"
                    name="details"
                    // value={value && value.details ? value.details[index] : ""}
                    value={_details[index] || ""}
                    onChange={(e) => {
                      handleDetailsChange(e, index);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      handleDetailsDelete(index);
                    }}
                  >
                    <WhiteDeleteIcon />
                  </IconButton>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProjectsInput;
