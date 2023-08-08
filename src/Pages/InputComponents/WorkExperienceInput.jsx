import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";

function WorkExperienceInput({
  index,
  setworkExperienceObj,
  workExperienceObj,
  value,
  handleWorkExpDelete,
}) {
  // const [_companyname, setCompanyname] = useState("");
  // const [_designation, setDesignation] = useState("");
  let tempobj = {};
  let _tempdetails = {};
  const [_details, setDetails] = useState([]);
  const [detailsComponent, setDetailsComponent] = useState([]);

  useEffect(() => {
    if (value && value.details && Array.isArray(value.details)) {
      setDetails([...value.details]);
    } else {
      setDetails([]);
    }
  }, [value, index]);

  const handleWorkExpChange = (event, __details) => {
    // const { name, value } = event.target;
    // let fieldName = name;
    // tempobj = {};
    // tempobj = { ...workExperienceObj };

    // switch (name) {
    //   case "companyname":
    //     setCompanyname(value);
    //     tempobj[index] = { ...tempobj[index], [fieldName]: value };
    //     break;
    //   case "designation":
    //     setDesignation(value);
    //     tempobj[index] = { ...tempobj[index], [fieldName]: value };
    //     break;
    //   case "details":
    //     tempobj[index] = { ...tempobj[index], [fieldName]: __details };
    //     break;
    // }

    // setworkExperienceObj(tempobj);

    const { name, value } = event.target;
    let fieldName = name;
    const updatedWorkExpObj = [...workExperienceObj];

    // Get the current object from the copied array or create a new object if not exists
    const workexpObjtemp = updatedWorkExpObj[index] || {};

    // Update the specific field in the copied object
    if (name === "details") workexpObjtemp[name] = __details;
    else workexpObjtemp[name] = value;

    // Update the copied object back into the copied array
    updatedWorkExpObj[index] = workexpObjtemp;

    // Update the state with the modified array
    setworkExperienceObj(updatedWorkExpObj);
    console.log(updatedWorkExpObj);
  };

  const handleAdd = () => {
    let temp = [..._details, ""];
    setDetails(temp);
  };

  const handleDetailsChange = (e, index) => {
    let tempdetails = [..._details];
    tempdetails[index] = e.target.value;
    setDetails(tempdetails);
    handleWorkExpChange(e, tempdetails);
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
            label="Designation"
            variant="outlined"
            type="text"
            name="designation"
            value={value ? value.designation : ""}
            onChange={(event) => {
              handleWorkExpChange(event, index);
            }}
          />
          <WhiteTextField
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            type="text"
            name="companyname"
            value={value ? value.companyname : ""}
            onChange={(event) => {
              handleWorkExpChange(event, index);
            }}
            sx={{ marginTop: "1rem" }}
          />
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
              <div key={index} className="detailUnit">
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
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WorkExperienceInput;
