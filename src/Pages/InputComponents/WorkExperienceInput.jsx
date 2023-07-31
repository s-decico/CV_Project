import React, { useState } from "react";
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
}) {
  const [_companyname, setCompanyname] = useState("");
  const [_designation, setDesignation] = useState("");
  let tempobj = {};
  let _tempdetails = {};
  const [_details, setDetails] = useState([]);
  const [detailsComponent, setDetailsComponent] = useState([]);

  let detailsarr = [];

  const handleWorkExpChange = (event, __details) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...workExperienceObj };

    switch (name) {
      case "companyname":
        setCompanyname(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "designation":
        setDesignation(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "details":
        tempobj[index] = { ...tempobj[index], [fieldName]: __details };
        break;
    }

    setworkExperienceObj(tempobj);
  };

  const handleAdd = () => {
    let temp = [...detailsComponent, ""];
    setDetailsComponent(temp);
  };

  const handleDetailsChange = (e, index) => {
    let tempdetails = [..._details];
    tempdetails[index] = e.target.value;
    setDetails(tempdetails);
    handleWorkExpChange(e, tempdetails);
  };

  const handleDetailsDelete = (e, index) => {
    console.log("called");
    let tempdetails = [..._details];
    tempdetails = tempdetails.filter((e, _index) => {
      return _index !== index;
    });
    setDetails(tempdetails);
    handleWorkExpChange(e, tempdetails);
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
          {detailsComponent.map((obj, index) => {
            return (
              <>
                <div className="detailUnit">
                  <WhiteTextField
                    id="outlined-basic"
                    label="Details"
                    variant="standard"
                    type="text"
                    name="details"
                    value={value && value.details ? value.details[index] : ""}
                    onChange={(e) => {
                      handleDetailsChange(e, index);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      handleDetailsDelete(e, index);
                    }}
                  >
                    <WhiteDeleteIcon />
                  </IconButton>
                </div>
              </>
            );
          })}
        </div>

        <div className="workexpprojdelete">
          <IconButton aria-label="delete">
            <WhiteDeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default WorkExperienceInput;
