import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createElement } from "react";
import {
  userDetailsAtom,
  workCountAtom,
  workExperienceAtom,
} from "../Atoms/CVAtoms";
import "./cv.css";
import AchievementInput from "./InputComponents/AchievementInput";
import EducationInput from "./InputComponents/EducationInput";
import InterestsInput from "./InputComponents/InterestsInput";
import LanguageInput from "./InputComponents/LanguageInput";
import ProjectsInput from "./InputComponents/ProjectsInput";
import SkillsInput from "./InputComponents/SkillsInput";
import WorkExperienceInput from "./InputComponents/WorkExperienceInput";
import { TextField, Button } from "@mui/material";

import axios from "axios";
import queryString from "query-string";
import cookie from "js-cookie";
import Navbar from "../Component/Navbar";
import { WhiteTextField, GradientButton } from "../MUIStyledComponents";
import UserDetailsInput from "./InputComponents/UserDetailsinput";

import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import LinearWithValueLabel from "../MUIComponents/LinearProgressBar";

function CVInputBox() {
  let jsonData = {};
  const navigate = useNavigate();
  const token = cookie.get("token");
  useEffect(() => {
    if (token == null || token == undefined) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else {
      setTimeout(() => {
        navigate("/cvinput");
        const fetchData = async () => {
          axios
            .get("http://localhost:3001/fetchform", {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            })
            .then(function (res) {
              if (res.status === 200) {
                console.log("Received Data from Database");
                jsonData = res.data;

                if (jsonData != {}) {
                  if (jsonData.BasicDetails != {}) {
                    setUserDetails(jsonData.BasicDetails);
                  }
                  setworkExperienceObj(jsonData.WorkExperience);
                  setEducationObj(jsonData.Education);
                  setProjectObj(jsonData.Project);
                  setAchievementObj(jsonData.Achievement);
                  setSkills(jsonData.Skills);
                  setLanguage(jsonData.Language);
                  setInterests(jsonData.Interest);
                }
                try {
                  let workExpLength;
                  let educationLength;
                  let projectLength;
                  let achievementLength;
                  if (jsonData.WorkExperience)
                    workExpLength = Object.keys(jsonData.WorkExperience).length;
                  if (jsonData.Education)
                    educationLength = Object.keys(jsonData.Education).length;
                  if (jsonData.Project)
                    projectLength = Object.keys(jsonData.Project).length;
                  if (jsonData.Achievement)
                    achievementLength = Object.keys(
                      jsonData.Achievement
                    ).length;
                  for (let i = 0; i < workExpLength; i++) {
                    renderWorkExperience();
                  }
                  for (let i = 0; i < educationLength; i++) {
                    renderEducation();
                  }
                  for (let i = 0; i < projectLength; i++) {
                    renderProjects();
                  }
                  for (let i = 0; i < achievementLength; i++) {
                    renderAchievement();
                  }
                } catch (err) {
                  console.log("Error in autorendering: " + err);
                }
              }
              //console.log(jsonData);
            })
            .catch(function (err) {
              console.log(err);
            });

          //Set the fetched JSON values to the corresponding state variables
        };

        fetchData();
      }, 0);
    }
  }, [token]);

  //Main State
  const [userDetails, setUserDetails] = useState();
  const [fullDetails, setfullDetails] = useState();
  //Variables
  //--------------------------------
  const [_companyname, setCompanyname] = useState("");
  const [_designation, setDesignation] = useState("");
  const [_qualification, setQualification] = useState("");
  const [_school, setSchool] = useState("");
  const [_doj, setDoj] = useState("");
  const [_title, setTitle] = useState("");
  const [_subtitle, setSubtitle] = useState("");
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
  //Achievement
  const [achievementComponent, setAchievementComponent] = useState([{}]);
  const [achievementObj, setAchievementObj] = useState({});
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
  const renderAchievement = (e) => {
    setAchievementComponent([...achievementComponent, {}]);
  };

  //Handler functions
  //--------------------------------
  const handleUserDetails = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setUserDetails({ ...userDetails, [fieldName]: fieldValue });
  };

  const handleWorkExpChange = (event, index) => {
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
    }

    setworkExperienceObj(tempobj);
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...educationObj };
    switch (name) {
      case "qualification":
        setQualification(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "school":
        setSchool(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "doj":
        setDoj(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
    }
    setEducationObj(tempobj);
  };

  const handleAchievementChange = (event, index) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...achievementObj };
    switch (name) {
      case "title":
        setTitle(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "subtitle":
        setSubtitle(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      default:
        break;
    }
    setAchievementObj(tempobj);
  };

  const sendDataToServer = (tempobj) => {
    console.log("data send call");
    axios
      .post("http://localhost:3001/cvinput", tempobj, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(function (res) {
        if (res.status === 200) {
          console.log("Data Saved");
          navigate("/cv");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const handleFormSubmit = (e) => {
    tempobj = {};
    tempobj = {
      BasicDetails: userDetails,
      WorkExperience: workExperienceObj,
      Education: educationObj,
      Project: projectObj,
      Achievement: achievementObj,
      Language: language,
      Interest: interests,
      Skills: skills,
    };
    setfullDetails(tempobj);
    console.log("Submit called");
    sendDataToServer(tempobj);
  };
  const [currentPage, setCurrentPage] = useState(1);
  // Handler to navigate to the next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handler to navigate to the previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  let currentPageComponent;

  switch (currentPage) {
    case 1:
      currentPageComponent = (
        <UserDetailsInput
          handleUserDetails={handleUserDetails}
          userDetails={userDetails}
        />
      );
      break;
    case 2:
      currentPageComponent = (
        <>
          {workExpComponent.map((obj, index) => {
            return (
              <WorkExperienceInput
                key={index}
                handleWorkExpChange={handleWorkExpChange}
                index={index}
                value={workExperienceObj[index]}
              />
            );
          })}
          <GradientButton
            variant="outlined"
            type="button"
            onClick={renderWorkExperience}
          >
            +
          </GradientButton>
        </>
      );

      break;
    case 3:
      currentPageComponent = (
        <>
          {educationComponent.map((obj, index) => {
            return (
              <EducationInput
                key={index}
                handleEducationChange={handleEducationChange}
                index={index}
                value={educationObj[index]}
              />
            );
          })}
          <GradientButton
            variant="outlined"
            type="button"
            onClick={renderEducation}
          >
            +
          </GradientButton>
        </>
      );
      break;
    case 4:
      currentPageComponent = (
        <SkillsInput skills={skills} setSkills={setSkills} />
      );
      break;
    case 5:
      currentPageComponent = projectsComponent.map((obj, index) => {
        return (
          <>
            <ProjectsInput
              index={index}
              setProjectObj={setProjectObj}
              projectObj={projectObj}
              value={projectObj[index]}
            />
            <GradientButton
              variant="outlined"
              type="button"
              onClick={renderProjects}
            >
              +
            </GradientButton>
          </>
        );
      });
      break;
    case 6:
      currentPageComponent = (
        <>
          {achievementComponent.map((obj, index) => {
            return (
              <AchievementInput
                handleAchievementChange={handleAchievementChange}
                index={index}
                value={achievementObj[index]}
              />
            );
          })}
          <GradientButton
            variant="outlined"
            type="button"
            onClick={renderAchievement}
          >
            +
          </GradientButton>
        </>
      );
      break;
    case 7:
      currentPageComponent = (
        <LanguageInput language={language} setLanguage={setLanguage} />
      );
      break;
    case 8:
      currentPageComponent = (
        <InterestsInput interests={interests} setInterests={setInterests} />
      );
    default:
      currentPageComponent = null;
  }
  //Render function
  return (
    <>
      <Navbar />
      <div className="cvinput_box">
        <form action="/" className="cvinputform" method="post">
          {currentPageComponent}

          {/* Pagination buttons */}
          <div className="pagination">
            {currentPage !== 1 && (
              <GradientButton variant="outlined" onClick={prevPage}>
                Previous
              </GradientButton>
            )}
            {currentPage !== 9 ? (
              <GradientButton variant="outlined" onClick={nextPage}>
                Next
              </GradientButton>
            ) : (
              <GradientButton
                variant="contained"
                type="button"
                onClick={handleFormSubmit}
              >
                Submit
              </GradientButton>
            )}
          </div>
          <div className="linearprogress">
            <LinearWithValueLabel currentPage={currentPage} />
          </div>
        </form>
      </div>
    </>
  );
}
export default CVInputBox;
