const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const querystring = require("querystring");

const app = express();

app.use(cors());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

password = "Ruru@mongo1";
const dbConnectionURI =
  "mongodb+srv://parkerpeter123457788:" +
  password +
  "@cvdetails.igloppb.mongodb.net/?retryWrites=true&w=majority";

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
      console.log(parsedObject);
      // const receivedData = querystring.parse(req.body, null, null, {
      //   decodeURIComponent: querystring.unescape,
      // });
    } else res.send("Success");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, function () {
  console.log("Server started at port 3001");
});
