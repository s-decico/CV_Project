const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const querystring = require("querystring");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Database connections
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbConnectionURI =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cvdetails.igloppb.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbConnectionURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error:" + err);
  });

//Schemas
const userDetailsSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phno: String,
  address: String,
  github: String,
  linkedin: String,
});

const workExperienceSchema = new mongoose.Schema({
  companyname: String,
  designation: String,
});

const educationSchema = new mongoose.Schema({
  qualification: String,
  school: String,
  doj: String,
});

const projectSchema = new mongoose.Schema({
  projectname: String,
  projectyear: String,
  details: [String],
});

const achievementSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
});

const userSchema = new mongoose.Schema({
  UserDetails: userDetailsSchema,
  WorkExperience: [workExperienceSchema],
  Education: [educationSchema],
  Project: [projectSchema],
  Achievement: [achievementSchema],
  Language: [String],
  Interest: [String],
  Skills: [String],
});

const Details = mongoose.model("UserModel", userSchema);

// const ModelM = mongoose.model("Achievement", achievementSchema);
// var abc = new ModelM();
// abc.title = "ABC";
// abc.subtitle = "ABCsub";
// abc
//   .save()
//   .then(() => {
//     console.log("Successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//API routes
app.get("/", function (req, res) {
  res.send("Hello");
});

app.post("/", function (req, res) {
  try {
    if (req) {
      const obj = req.body;
      let jsonString = "";
      for (const key in obj) {
        jsonString += obj[key];
      }
      const parsedObject = JSON.parse(jsonString);

      parsedObject.UserDetails = JSON.parse(parsedObject.UserDetails);
      parsedObject.WorkExperience = JSON.parse(parsedObject.WorkExperience);
      parsedObject.Education = JSON.parse(parsedObject.Education);
      parsedObject.Project = JSON.parse(parsedObject.Project);
      parsedObject.Achievement = JSON.parse(parsedObject.Achievement);
      console.log(parsedObject.Project[1]);
      Details.insertMany(parsedObject)
        .then(() => {
          console.log("Data inserted successfully");
        })
        .catch((err) => {
          console.log("Error while inserting:" + err);
        });
    } else res.send("Success");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, function () {
  console.log("Server started at port 3001");
});
