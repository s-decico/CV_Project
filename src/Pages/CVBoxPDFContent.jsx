import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  PhoneAndroid,
  Home,
  Email,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  Viewider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  basicDetailsBox: {
    display: "flex",
    flexDirection: "row",
  },
  basicDetailsElementR1: {
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
  },
  basicDetailsElementR2: {
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
  },
  /* Add more styles for other sections as needed */
});

const CVBoxPDFContent = ({ jsonData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View className="userDetailsBox">
        <View className="nameBox">
          {jsonData.BasicDetails && jsonData.BasicDetails.fullname}
        </View>
        <Divider
          sx={{ backgroundColor: "black", width: "70%", margin: "0 auto" }}
        />
        <View className="basicDetailsBox">
          <View className="basicDetailsElementR1">
            {jsonData.BasicDetails &&
              Object.keys(jsonData.BasicDetails)
                .filter((key) => key !== "fullname" && key !== "_id")
                .map((key) => {
                  switch (key) {
                    case "phno":
                      return (
                        <View key={key} className="basicDetailsElement">
                          <PhoneAndroid />
                          {jsonData.BasicDetails[key]}
                        </View>
                      );
                      break;
                    case "email":
                      let email = jsonData.BasicDetails[key];
                      email = "mailto:" + email;
                      return (
                        <View key={key} className="basicDetailsElement">
                          <Email />
                          <a href={email}>{jsonData.BasicDetails[key]}</a>
                        </View>
                      );
                      break;
                    case "address":
                      return (
                        <View key={key} className="basicDetailsElement">
                          <Home />
                          {jsonData.BasicDetails[key]}
                        </View>
                      );
                      break;
                    default:
                      if (key == "github" && jsonData.BasicDetails[key] == "") {
                        let url = jsonData.BasicDetails[key];
                        url = url.startsWith("https://")
                          ? url
                          : "https://" + url;
                        return (
                          <View key={key} className="basicDetailsElement">
                            <LinkedIn />
                            {<a href={url}>LinkedIn</a>}
                          </View>
                        );
                      }

                      break;
                  }
                })}
          </View>
          <View className="basicDetailsElementR2">
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
                        <View key={key} className="basicDetailsElement">
                          <LinkedIn />
                          {<a href={url}>LinkedIn</a>}
                        </View>
                      );
                      break;
                    case "github":
                      return (
                        <View key={key} className="basicDetailsElement">
                          <GitHub />
                          {<a href={url}>Github</a>}
                        </View>
                      );
                      break;
                    default:
                      break;
                  }
                })}
          </View>
        </View>
      </View>

      <View className="workExperienceBox">
        <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
          Work Experience
        </Divider>
        {jsonData.WorkExperience &&
          jsonData.WorkExperience.map((x, index) => {
            return (
              <>
                <View className="workExpElement">
                  <View className="workExpHeaderBox">
                    <View className="designationInfoBox">
                      <View className="designationBox">{x.designation}</View>
                      <View className="companyBox">{x.companyname}</View>
                    </View>
                    <View className="workExpYearBox">
                      {x.startdate
                        ? x.startdate +
                          "-" +
                          (x.enddate ? x.enddate : "Present")
                        : ""}
                    </View>
                  </View>
                  <View className="workExpDetailsBox">
                    {x.details.map((detail) => {
                      return (
                        <View className="workexpDetailsElement">
                          <li>{detail}</li>
                        </View>
                      );
                    })}
                  </View>
                </View>
                {index !== jsonData.WorkExperience.length - 1 && (
                  <Divider sx={{ width: "60%", margin: "0 auto" }} />
                )}
              </>
            );
          })}
      </View>
      <View className="educationBox">
        <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
          Education
        </Divider>
        {jsonData.Education &&
          jsonData.Education.map((x, index) => {
            return (
              <>
                <View className="educationElement">
                  <View className="qualificationInfoBox">
                    <View className="qualificationBox">{x.qualification}</View>
                    <View className="schoolBox">{x.school}</View>
                  </View>
                  <View className="educationYearBox">{x.doj}</View>
                </View>
                {index !== jsonData.Education.length - 1 && (
                  <Divider sx={{ width: "60%", margin: "0 auto" }} />
                )}
              </>
            );
          })}
      </View>
      <View className="skillsBox">
        <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
          Skills
        </Divider>
        <View className="skillElements">
          {jsonData.Skills &&
            jsonData.Skills.map((x, index) => {
              return (
                <>
                  <View className="skillElement">{x}</View>
                  {index !== jsonData.Skills.length - 1 && (
                    <Divider orientation="vertical" variant="middle" flexItem />
                  )}
                </>
              );
            })}
        </View>
      </View>
      <View className="projectBox">
        <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
          Projects
        </Divider>
        {jsonData.Project &&
          jsonData.Project.map((x, index) => {
            let url = x.projectlink;
            url = url.startsWith("https://") ? url : "https://" + url;
            return (
              <>
                <View className="projectElement">
                  <View className="projectinfoBox">
                    <View className="projectnameBox">
                      {x.projectname}
                      <View className="projectlinkBox">
                        <a href={url}>Link to the project</a>
                      </View>
                    </View>
                    <View className="projectyearBox">{x.projectyear}</View>
                  </View>
                  <View className="projectDetailsBox">
                    {x.details.map((x) => {
                      return (
                        <View className="projectDetailsBox">
                          <li>{x}</li>
                        </View>
                      );
                    })}
                  </View>
                </View>
                {index !== jsonData.Project.length - 1 && (
                  <Divider sx={{ width: "60%", margin: "0 auto" }} />
                )}
              </>
            );
          })}
      </View>

      <View className="achievementBox">
        <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
          Achievements
        </Divider>
        {jsonData.Achievement &&
          jsonData.Achievement.map((x, index) => {
            return (
              <>
                <View className="achievementElement">
                  <View className="achievementTitleBox">{x.title}</View>
                  <View className="achievementSubtitleBox">{x.subtitle}</View>
                </View>
                {index !== jsonData.Achievement.length - 1 && (
                  <Divider sx={{ width: "60%", margin: "0 auto" }} />
                )}
              </>
            );
          })}
      </View>

      <View className="interestAndLangBox">
        <View className="interestBox">
          <Divider textAlign="left">Interests</Divider>
          <View className="interestElementBox">
            {jsonData.Interest &&
              jsonData.Interest.map((x, index) => {
                return (
                  <>
                    <View className="interestElement">{x}</View>
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
          </View>
        </View>

        <View className="interestBox">
          <Divider textAlign="left">Languages</Divider>
          <View className="languageElementBox">
            {jsonData.Language &&
              jsonData.Language.map((x, index) => {
                return (
                  <>
                    <View className="languageElement">{x}</View>
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
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CVBoxPDFContent;
