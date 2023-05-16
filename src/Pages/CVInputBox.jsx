import { render } from "@testing-library/react";
import React, { useState } from "react";
import { createElement } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  userDetailsAtom,
  workCountAtom,
  workExperienceAtom,
} from "../Atoms/CVAtoms";
import "./cv.css";
import EducationInput from "./InputComponents/EducationInput";
import InterestsInput from "./InputComponents/InterestsInput";
import LanguageInput from "./InputComponents/LanguageInput";
import ProjectsInput from "./InputComponents/ProjectsInput";
import SkillsInput from "./InputComponents/SkillsInput";
import WorkExperienceInput from "./InputComponents/WorkExperienceInput";

function CVInputBox() {
  //Main State
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
  //Variables
  //--------------------------------
  const [_companyname, setCompanyname] = useState("");
  const [_designation, setDesignation] = useState("");
  const [_qualification, setQualification] = useState("");
  const [_school, setSchool] = useState("");
  const [_doj, setDoj] = useState("");
  const [_projectname, setProjectname] = useState("");
  const [_projectyear, setProjectyear] = useState("");
  let tempobj = {};

  //Component States
  //-------------------------------
  //Work Exp
  const [workExpComponent, setWorkExpComponent] = useState([{}]);
  const [workExperienceObj, setworkExperienceObj] = useState({});
  //Education
  const [educationComponent, setEducationComponent] = useState([{}]);
  const [educationObj, setEducationObj] = useState({});
  //Projects
  const [projectsComponent, setProjectsComponent] = useState([{}]);
  const [projectObj, setProjectObj] = useState({});
  //Skills
  const [skills, setSkills] = useState([]);
  //Language
  const [language, setLanguage] = useState([]);
  //Interests
  const [interests, setInterests] = useState([]);

  //Component render function
  //--------------------------------
  const renderWorkExperience = (e) => {
    setWorkExpComponent([...workExpComponent, {}]);
  };

  const renderEducation = (e) => {
    setEducationComponent([...educationComponent, {}]);
  };

  const renderProjects = (e) => {
    setProjectsComponent([...projectsComponent, {}]);
  };

  //Handler functions
  //--------------------------------
  const handleUserDetails = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setUserDetails({ ...userDetails, [fieldName]: fieldValue });
    console.log(userDetails);
  };

  const handleWorkExpChange = (event, index) => {
    if (event.target.name == "companyname") setCompanyname(event.target.value);
    else if (event.target.name == "designation")
      setDesignation(event.target.value);
    tempobj = { ...workExperienceObj };
    tempobj[index] = {
      companyname: _companyname,
      designation: _designation,
    };
    setworkExperienceObj(tempobj);
  };

  const handleEducationChange = (event, index) => {
    switch (event.target.name) {
      case "qualification":
        setQualification(event.target.value);
        break;
      case "school":
        setSchool(event.target.value);
        break;
      case "doj":
        setDoj(event.target.value);
        break;
    }
    tempobj = {};
    tempobj = { ...educationObj };
    tempobj[index] = {
      qualification: _qualification,
      school: _school,
      doj: _doj,
    };
    setEducationObj(tempobj);
    console.log(educationObj);
  };

  const handleProjectChange = (event, index) => {
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
      doj: _doj,
    };
    setProjectObj(tempobj);
    console.log(projectObj);
  };

  //Render function
  return (
    <div className="input_box">
      <div className="input_heading">Fill in the details</div>
      <form action="" className="cvinputform">
        <span className="formrow2c">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="input_text"
            onChange={handleUserDetails}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="input_text"
            onChange={handleUserDetails}
          />
        </span>
        <span className="formrow2c">
          <label htmlFor="phno">Phone No.</label>
          <input
            type="text"
            name="phno"
            id="input_text"
            onChange={handleUserDetails}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="input_text"
            onChange={handleUserDetails}
          />
        </span>
        <span className="formrow2c">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            id="input_text"
            onChange={handleUserDetails}
          />
          <label htmlFor="github">Github</label>
          <input
            type="text"
            name="github"
            id="input_text"
            onChange={handleUserDetails}
          />
        </span>
        <div className="formrow1c">
          Work Experience
          {workExpComponent.map((obj, index) => {
            return (
              <WorkExperienceInput
                handleWorkExpChange={handleWorkExpChange}
                index={index}
              />
            );
          })}
          <button type="button" onClick={renderWorkExperience}>
            +
          </button>
        </div>
        <div className="formrow1c">
          Education
          {educationComponent.map((obj, index) => {
            return (
              <EducationInput
                handleEducationChange={handleEducationChange}
                index={index}
              />
            );
          })}
          <button type="button" onClick={renderEducation}>
            +
          </button>
        </div>
        <div className="formrow1c">
          <SkillsInput skills={skills} setSkills={setSkills} />
        </div>
        <div className="formrow1c">
          <LanguageInput language={language} setLanguage={setLanguage} />
        </div>
        <div className="formrow1c">
          <InterestsInput interests={interests} setInterests={setInterests} />
        </div>
        <div className="formrow1c">
          Projects
          {projectsComponent.map((obj, index) => {
            return (
              <ProjectsInput
                handleProjectChange={handleProjectChange}
                index={index}
              />
            );
          })}
          <button type="button" onClick={renderProjects}>
            +
          </button>
        </div>
      </form>
    </div>
  );
}

export default CVInputBox;
