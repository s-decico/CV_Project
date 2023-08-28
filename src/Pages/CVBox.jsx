import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import "./cv.css";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileDownload from "js-file-download";
import generatePdfContent from "./CVBoxPDFContent"; // Import your PDF content component
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Add,
  PhoneAndroid,
  Home,
  Email,
  LinkedIn,
  GitHub,
  Circle,
  CleaningServices,
} from "@mui/icons-material";
import { CircularProgress, Divider } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import { alignProperty } from "@mui/material/styles/cssUtils";

function CVBox() {
  const [jsonData, setJsonData] = useState({});
  const [loadstatus, setLoadstatus] = useState(false);
  const navigate = useNavigate();
  const token = cookie.get("token");
  const isAuthenticated = cookie.get("isAuthenticated");
  const pdfRef = useRef();
  let htmlContent;
  let styleTags;

  useEffect(() => {
    if (token == null || token == undefined) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else if (isAuthenticated) {
      const fetchData = async () => {
        let url = process.env.REACT_APP_API_URL + "/fetchform";
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          })
          .then(function (res) {
            if (res.status === 200) {
              setLoadstatus(true);
              console.log("Received Data from Database");
              if (res.data) setJsonData(res.data);
              console.log(res.data);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      };

      fetchData();
    }
  }, [token]);

  // useEffect(()=>{if(jsonData==={})navigate("/cvinput")},[jsonData])

  const ConvertToHTML = () => {
    if (!pdfRef.current) {
      return ""; // Return an empty string if pdfRef.current is null or undefined
    }
    if (pdfRef.current) {
      htmlContent = pdfRef.current.outerHTML;
      // console.log(htmlContent);
    }
    styleTags = Array.from(document.styleSheets)
      .map((styleSheet) => Array.from(styleSheet.cssRules))
      .flat()
      .map((rule) => rule.cssText)
      .join("\n");
    console.log(styleTags);

    const fullHtmlContent = `
    <html>
      <head>
        <style>.CVBox{
          background-color: white;
          width: 100%;
          margin: 0 auto;
          padding: 1rem;
          
      }
      .cvboxButtonGroup{
          margin: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 100vh;
          
      }
      
      
      .cvpdfButtons{
        width: 20rem;
        padding: 2rem 2.5rem;
        color: #fff;
        font-weight: bold;
        border-radius: 10px;
        letter-spacing: 4px;
        transition: 0.2s;
        cursor: pointer;
        border: 3px solid #fff;
        font-size: 1rem;
        box-shadow:none;
        transition: background-color 1s;
        background: linear-gradient(90deg, #ce4949, transparent) #d47878;
      }
      
      .cvpdfButtons:hover{
          color: #fff;
          background-color: #D5CEA3;
          /* box-shadow: 0 0 7px #ffffff,
                      0 0 7px #ffffff,
                      0 0 7px #ffffff,
                      0 0 7px #ffffff; */
           
      }
      
      /* .cvpdfButtons:focus{
          color: #fff;
          background:none;
          background-color: #5c2121;
          /* box-shadow: 0 0 7px #ffffff,
                      0 0 7px #ffffff,
                      0 0 7px #ffffff,
                      0 0 7px #ffffff; */
           
      
      
      /* .cvpdfButtons:not(:focus){
          color: #fff;
          background: linear-gradient(90deg, #ce4949, transparent) #d47878;
      } */
      
      .nameBox{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 0rem 0.5rem 0rem;
          font-size: 2rem;
      }
      
      .basicDetailsBox{
          display: flex;
          flex-direction: column;
          padding: 1rem 4rem 0rem 4rem;
font-size:1rem;
          /* background-color: #7c50b1; */
          /* background-color: #7c50b1; */
      }
      
      .basicDetailsElement{
          display: flex;
          justify-content: center;
          align-items: center;
          
      }
      
      .basicDetailsElementR1{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
      }
      
      .basicDetailsElementR2{
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
      }
      .workExperienceBox{
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          /* background-color: aquamarine; */
          padding: 0.5rem 4rem 0.5rem 4rem;
          page-break-inside: avoid;
      
      }
      .workExpElement{
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
      }
      .workExpHeaderBox{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
      }
      .designationBox {
          font-size: 1rem;
          font-weight: bold;
      }
      .companyBox{
          font-size: 0.9rem;
      }
      
      
      
      .workexpDetailsElement{
          list-style-type: disc;
      }
      
      .educationBox{
          page-break-inside: avoid;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          /* background-color: brown; */
          padding: 0.5rem 4rem 0.5rem 4rem;
      }
      .qualificationBox{
          font-size: 1rem;
          font-weight: bold;
      }
      .schoolBox{
          font-size: 0.9rem;
      }
      
      .educationElement{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          
      }
      
      .skillsBox{
          padding: 0.5rem 4rem 0.5rem 4rem;
          /* background-color: #4977ce; */
      }
      .skillElements{
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          height: 2rem;
          
      }
      
      .projectBox{
          display: flex;
          flex-direction: column;
          /* background-color: #4682A9; */
          padding: 0.5rem 4rem 0.5rem 4rem;
          gap: 0.5rem;
          page-break-inside: avoid;
      }
      
      .projectnameBox{
          font-size: 1rem;
          font-weight: bold;
      }
      .projectlinkBox{font-size: 1rem;font-weight:100 }
      
      .projectElement{
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
      }
      .projectinfoBox{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
      }
      .projectDetailsBox{
          list-style-type: disc;
      }
      
      .achievementBox{
          page-break-inside: avoid;
          display: flex;
          flex-direction: column;
          /* background-color: burlywood; */
          gap: 0.5rem;
          padding: 0.5rem 4rem 0.5rem 4rem;
      
      }
      .achievementTitleBox{
          font-size: 1rem;
          font-weight: bold;
      }
      .achievementSubtitleBox{
          font-size: 0.9rem;
      }
      
      .interestAndLangBox{
          page-break-inside: avoid;
          display: flex;
          flex-direction: row;
          /* justify-content: space-around;
          align-items: center;
          padding: 1rem 4rem 3rem 4rem;
          gap: 0.5rem; */
          width: 100%;
          gap: 5rem;
          padding: 1rem 4rem 3rem 4rem;
      }
      .interestBox{
          flex:1;
          
      }
      .languageBox{
          flex: 1;
      }
      .languageElementBox{
          flex: 1;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;
      height: 2rem;
      }
      .interestElementBox{
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: center;
          height: 2rem;
      }
      </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

    return fullHtmlContent ? fullHtmlContent : "";
  };

  const generatePdf = async () => {
    const pdfContent = pdfRef.current;
    console.log("generating....");
    if (pdfContent) {
      const contentAsHtml = ConvertToHTML();
      const pdfOptions = {
        margin: [10, 0, 20, 0],
        filename: "cv.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          resolution: "700",
        },
      };
      try {
        await html2pdf().from(contentAsHtml).set(pdfOptions).save();
        // pdf.save();
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      {loadstatus === true ? (
        <>
          {Object.keys(jsonData).length === 0 && loadstatus === true ? (
            <>
              <div className="home_body">
                <p>
                  Looks like you don't have a CV
                  <br />
                  <span>Create one Now!</span>
                </p>

                <button
                  type="button"
                  className="cvpdfButtons"
                  onClick={() => navigate("/cvinput")}
                  sx={{ height: "100%" }}
                >
                  CREATE A CV
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="cvboxButtonGroup">
                <button
                  type="button"
                  className="cvpdfButtons"
                  onClick={generatePdf}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="cvpdfButtons"
                  onClick={() => navigate("/cvinput")}
                >
                  Edit CV
                </button>
              </div>
              <div className="CVBox" ref={pdfRef}>
                <div className="userDetailsBox">
                  <div className="nameBox">
                    {jsonData.BasicDetails && jsonData.BasicDetails.fullname}
                  </div>
                  <Divider
                    sx={{
                      backgroundColor: "black",
                      width: "70%",
                      margin: "0 auto",
                    }}
                  />
                  <div className="basicDetailsBox">
                    <div className="basicDetailsElementR1">
                      {jsonData.BasicDetails &&
                        Object.keys(jsonData.BasicDetails)
                          .filter((key) => key !== "fullname" && key !== "_id")
                          .map((key) => {
                            switch (key) {
                              case "phno":
                                return (
                                  <div
                                    key={key}
                                    className="basicDetailsElement"
                                  >
                                    <PhoneAndroid />
                                    {jsonData.BasicDetails[key]}
                                  </div>
                                );
                                break;
                              case "email":
                                let email = jsonData.BasicDetails[key];
                                email = "mailto:" + email;
                                return (
                                  <div
                                    key={key}
                                    className="basicDetailsElement"
                                  >
                                    <Email />
                                    <a href={email}>
                                      {jsonData.BasicDetails[key]}
                                    </a>
                                  </div>
                                );
                                break;
                              case "address":
                                return (
                                  <div
                                    key={key}
                                    className="basicDetailsElement"
                                  >
                                    <Home />
                                    {jsonData.BasicDetails[key]}
                                  </div>
                                );
                                break;
                              default:
                                if (
                                  key == "github" &&
                                  jsonData.BasicDetails[key] == ""
                                ) {
                                  let url = jsonData.BasicDetails[key];
                                  url = url.startsWith("https://")
                                    ? url
                                    : "https://" + url;
                                  return (
                                    <div
                                      key={key}
                                      className="basicDetailsElement"
                                    >
                                      <LinkedIn />
                                      {<a href={url}>LinkedIn</a>}
                                    </div>
                                  );
                                }

                                break;
                            }
                          })}
                    </div>
                    <div className="basicDetailsElementR2">
                      {jsonData.BasicDetails &&
                        jsonData.BasicDetails["github"] != "" &&
                        Object.keys(jsonData.BasicDetails)
                          .filter((key) => key !== "fullname" && key !== "_id")
                          .map((key) => {
                            let url = jsonData.BasicDetails[key];
                            url = url.startsWith("https://")
                              ? url
                              : "https://" + url;
                            switch (key) {
                              case "linkedin":
                                return (
                                  <div
                                    key={key}
                                    className="basicDetailsElement"
                                  >
                                    <LinkedIn />
                                    {<a href={url}>LinkedIn</a>}
                                  </div>
                                );
                                break;
                              case "github":
                                return (
                                  <div
                                    key={key}
                                    className="basicDetailsElement"
                                  >
                                    <GitHub />
                                    {<a href={url}>Github</a>}
                                  </div>
                                );
                                break;
                              default:
                                break;
                            }
                          })}
                    </div>
                  </div>
                </div>

                <div className="workExperienceBox">
                  <Divider textAlign="center" sx={{ fontSize: "0.9rem" }}>
                    Work Experience
                  </Divider>
                  {jsonData.WorkExperience &&
                    jsonData.WorkExperience.map((x, index) => {
                      return (
                        <>
                          <div className="workExpElement">
                            <div className="workExpHeaderBox">
                              <div className="designationInfoBox">
                                <div className="designationBox">
                                  {x.designation}
                                </div>
                                <div className="companyBox">
                                  {x.companyname}
                                </div>
                              </div>
                              <div className="workExpYearBox">
                                {x.startdate
                                  ? x.startdate +
                                    "-" +
                                    (x.enddate ? x.enddate : "Present")
                                  : ""}
                              </div>
                            </div>
                            <div className="workExpDetailsBox">
                              {x.details.map((detail) => {
                                return (
                                  <div className="workexpDetailsElement">
                                    <li>{detail}</li>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {index !== jsonData.WorkExperience.length - 1 && (
                            <Divider sx={{ width: "60%", margin: "0 auto" }} />
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="educationBox">
                  <Divider textAlign="center" sx={{ fontSize: "0.9rem" }}>
                    Education
                  </Divider>
                  {jsonData.Education &&
                    jsonData.Education.map((x, index) => {
                      return (
                        <>
                          <div className="educationElement">
                            <div className="qualificationInfoBox">
                              <div className="qualificationBox">
                                {x.qualification}
                              </div>
                              <div className="schoolBox">{x.school}</div>
                            </div>
                            <div className="educationYearBox">{x.doj}</div>
                          </div>
                          {index !== jsonData.Education.length - 1 && (
                            <Divider sx={{ width: "60%", margin: "0 auto" }} />
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="skillsBox">
                  <Divider textAlign="center" sx={{ fontSize: "0.9rem" }}>
                    Skills
                  </Divider>
                  <div className="skillElements">
                    {jsonData.Skills &&
                      jsonData.Skills.map((x, index) => {
                        return (
                          <>
                            <div className="skillElement">{x}</div>
                            {index !== jsonData.Skills.length - 1 && (
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                              />
                            )}
                          </>
                        );
                      })}
                  </div>
                </div>
                <div className="projectBox">
                  <Divider textAlign="center" sx={{ fontSize: "0.9rem" }}>
                    Projects
                  </Divider>
                  {jsonData.Project &&
                    jsonData.Project.map((x, index) => {
                      let url = x.projectlink;
                      if (url)
                        url = url.startsWith("https://")
                          ? url
                          : "https://" + url;
                      return (
                        <>
                          <div className="projectElement">
                            <div className="projectinfoBox">
                              <div className="projectnameBox">
                                {x.projectname}
                                <div className="projectlinkBox">
                                  <a href={url}>Link to the project</a>
                                </div>
                              </div>
                              <div className="projectyearBox">
                                {x.projectyear}
                              </div>
                            </div>
                            <div className="projectDetailsBox">
                              {x.details.map((x) => {
                                return (
                                  <div className="projectDetailsBox">
                                    <li>{x}</li>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {index !== jsonData.Project.length - 1 && (
                            <Divider sx={{ width: "60%", margin: "0 auto" }} />
                          )}
                        </>
                      );
                    })}
                </div>

                <div className="achievementBox">
                  <Divider textAlign="center" sx={{ fontSize: "0.9rem " }}>
                    Achievements
                  </Divider>
                  {jsonData.Achievement &&
                    jsonData.Achievement.map((x, index) => {
                      return (
                        <>
                          <div className="achievementElement">
                            <div className="achievementTitleBox">{x.title}</div>
                            <div className="achievementSubtitleBox">
                              {x.subtitle}
                            </div>
                          </div>
                          {index !== jsonData.Achievement.length - 1 && (
                            <Divider sx={{ width: "60%", margin: "0 auto" }} />
                          )}
                        </>
                      );
                    })}
                </div>

                <div className="interestAndLangBox">
                  <div className="interestBox">
                    <Divider textAlign="center">Interests</Divider>
                    <div className="interestElementBox">
                      {jsonData.Interest &&
                        jsonData.Interest.map((x, index) => {
                          return (
                            <>
                              <div className="interestElement">{x}</div>
                              {index !== jsonData.Skills.length - 1 && (
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                              )}
                            </>
                          );
                        })}
                    </div>
                  </div>

                  <div className="interestBox">
                    <Divider textAlign="center">Languages</Divider>
                    <div className="languageElementBox">
                      {jsonData.Language &&
                        jsonData.Language.map((x, index) => {
                          return (
                            <>
                              <div className="languageElement">{x}</div>
                              {index !== jsonData.Language.length - 1 && (
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                              )}
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div
          className="progress"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={300}
            sx={{ color: "#ce4949", margin: "0 auto" }}
          />
        </div>
      )}
    </>
  );
}

export default CVBox;
