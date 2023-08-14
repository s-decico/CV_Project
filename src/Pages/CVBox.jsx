import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import "./cv.css";
import html2pdf from "html2pdf.js";
import JsPDF from "jspdf";
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
} from "@mui/icons-material";
import { Divider } from "@mui/material";

function CVBox() {
  const [jsonData, setJsonData] = useState({});
  const navigate = useNavigate();
  const token = cookie.get("token");
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (token == null || token == undefined) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else if (isAuthenticated) {
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
              setJsonData(res.data);
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

  // const downloadPDF = async () => {
  //   console.log("Inside doqwnload");
  //   const pdfElement = document.getElementById("cv-box"); // ID of the element you want to convert
  //   const pdfOptions = {
  //     margin: 10,
  //     filename: "cvbox.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };

  //   try {
  //     const pdf = await html2pdf().from(pdfElement).set(pdfOptions).outputPdf();
  //     const blob = new Blob([pdf], { type: "application/pdf" });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "cvbox.pdf";
  //     link.click();
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  const downloadPDF = async () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#CVBox")).then(() => {
      report.save("report.pdf");
    });
  };

  return (
    <>
      <Navbar />

      <div className="CVBox">
        <div className="userDetailsBox">
          <div className="nameBox">
            {jsonData.BasicDetails && jsonData.BasicDetails.fullname}
          </div>
          <Divider
            sx={{ backgroundColor: "black", width: "70%", margin: "0 auto" }}
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
                          <div key={key} className="basicDetailsElement">
                            <PhoneAndroid />
                            {jsonData.BasicDetails[key]}
                          </div>
                        );
                        break;
                      case "email":
                        let email = jsonData.BasicDetails[key];
                        email = "mailto:" + email;
                        return (
                          <div key={key} className="basicDetailsElement">
                            <Email />
                            <a href={email}>{jsonData.BasicDetails[key]}</a>
                          </div>
                        );
                        break;
                      case "address":
                        return (
                          <div key={key} className="basicDetailsElement">
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
                            <div key={key} className="basicDetailsElement">
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
                    url = url.startsWith("https://") ? url : "https://" + url;
                    switch (key) {
                      case "linkedin":
                        return (
                          <div key={key} className="basicDetailsElement">
                            <LinkedIn />
                            {<a href={url}>LinkedIn</a>}
                          </div>
                        );
                        break;
                      case "github":
                        return (
                          <div key={key} className="basicDetailsElement">
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
          <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
            Work Experience
          </Divider>
          {jsonData.WorkExperience &&
            jsonData.WorkExperience.map((x, index) => {
              return (
                <>
                  <div className="workExpElement">
                    <div className="workExpHeaderBox">
                      <div className="designationInfoBox">
                        <div className="designationBox">{x.designation}</div>
                        <div className="companyBox">{x.companyname}</div>
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
          <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
            Education
          </Divider>
          {jsonData.Education &&
            jsonData.Education.map((x, index) => {
              return (
                <>
                  <div className="educationElement">
                    <div className="qualificationInfoBox">
                      <div className="qualificationBox">{x.qualification}</div>
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
          <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
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
          <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
            Projects
          </Divider>
          {jsonData.Project &&
            jsonData.Project.map((x, index) => {
              let url = x.projectlink;
              url = url.startsWith("https://") ? url : "https://" + url;
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
                      <div className="projectyearBox">{x.projectyear}</div>
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
          <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
            Achievements
          </Divider>
          {jsonData.Achievement &&
            jsonData.Achievement.map((x, index) => {
              return (
                <>
                  <div className="achievementElement">
                    <div className="achievementTitleBox">{x.title}</div>
                    <div className="achievementSubtitleBox">{x.subtitle}</div>
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
            <Divider textAlign="left">Interests</Divider>
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
            <Divider textAlign="left">Languages</Divider>
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
      <PDFDownloadLink
        document={generatePdfContent(jsonData)} // Pass the data to the PDF content
        fileName="cvbox.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    </>
  );
}

export default CVBox;
