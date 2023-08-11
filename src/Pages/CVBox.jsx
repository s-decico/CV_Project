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
} from "@mui/icons-material";

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
                        return (
                          <div key={key} className="basicDetailsElement">
                            <Email />
                            {jsonData.BasicDetails[key]}
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
                        break;
                    }
                  })}
            </div>
            <div className="basicDetailsElementR2">
              {jsonData.BasicDetails &&
                Object.keys(jsonData.BasicDetails)
                  .filter((key) => key !== "fullname" && key !== "_id")
                  .map((key) => {
                    switch (key) {
                      case "linkedin":
                        return (
                          <div key={key} className="basicDetailsElement">
                            <LinkedIn />
                            {jsonData.BasicDetails[key]}
                          </div>
                        );
                        break;
                      case "github":
                        return (
                          <div key={key} className="basicDetailsElement">
                            <GitHub />
                            {jsonData.BasicDetails[key]}
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
        Work Experience
        <div className="workExperienceBox">
          {jsonData.WorkExperience &&
            jsonData.WorkExperience.map((x) => {
              return (
                <>
                  <div className="workExpElement">
                    <div className="workExpHeaderBox">
                      <div className="designationInfoBox">
                        <div className="companyBox">{x.companyname}</div>
                        <div className="designationBox">{x.designation}</div>
                      </div>
                      <div className="workExpYearBox">2050</div>
                    </div>
                    <div className="workExpDetailsBox">
                      {x.details.map((detail) => {
                        return (
                          <div className="workexpDetailsElement">{detail}</div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        Education
        <div className="educationBox">
          {jsonData.Education &&
            jsonData.Education.map((x) => {
              return (
                <>
                  <div className="educationElement">
                    <div className="qualificationInfoBox">
                      <div className="qualificationBox">{x.qualification}</div>
                      <div className="schoolBox">{x.school}</div>
                    </div>
                    <div className="educationYearBox">{x.doj}</div>
                  </div>
                </>
              );
            })}
        </div>
        Skills
        <div className="skillsBox">
          {jsonData.Skills.map((x) => {
            return <div className="skillElement">{x}</div>;
          })}
        </div>
        Projects
        <div className="projectBox">
          {jsonData.Project &&
            jsonData.Project.map((x) => {
              return (
                <>
                  <div className="projectElement">
                    <div className="projectinfoBox">
                      <div className="projectnameBox">{x.projectname}</div>
                      <div className="projectyearBox">{x.projectyear}</div>
                    </div>
                    <div className="projectDetailsBox">
                      {x.details.map((x) => {
                        return <div className="projectDetailsBox">{x}</div>;
                      })}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        Achievements
        <div className="achievementBox">
          {jsonData.Achievement &&
            jsonData.Achievement.map((x) => {
              return (
                <>
                  <div className="achievementElement">
                    <div className="achievementTitleBox">{x.title}</div>
                    <div className="achievementSubtitleBox">{x.subtitle}</div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="interestAndLangBox">
          <div className="interestBox">
            Interest
            {jsonData.Interest &&
              jsonData.Interest.map((x) => {
                return <div className="interestElement">{x}</div>;
              })}
          </div>
          <div className="languageBox">
            Language
            {jsonData.Language.map((x) => {
              return <div className="languageElement">{x}</div>;
            })}
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
