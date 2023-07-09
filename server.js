const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const UserDetails = require("./src/Schemas");
const UserCred = require("./src/Schemas");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const request = require("request");
const https = require("https");
const querystring = require("querystring");

app.use(cors());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with the appropriate origin (client URL)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Database connections
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbConnectionURI =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cvdetails.igloppb.mongodb.net/Details?retryWrites=true&w=majority";

mongoose
  .connect(dbConnectionURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error:" + err);
  });
const secretKey = process.env.JWT_SECRET_KEY;
function generateToken(username, password) {
  const userData = {
    username: username,
    password: password,
  };
  const token = jwt.sign(userData, secretKey);
  return token;
}

//API endpoints
app
  .route("/cvinput")
  .get((req, res) => {
    console.log(req.user);
    res.send("Hello");
  })
  .post((req, res) => {
    try {
      console.log(req.user);
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
        UserDetails.insertMany(parsedObject)
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

app.route("/register").post((req, res) => {
  const credObj = req.body;
  UserCred.insertMany(credObj)
    .then(() => {
      console.log("Credentials stored successfully");
    })
    .catch((err) => {
      console.log("Error while inserting:" + err);
    });
});

app.route("/login").post((req, res) => {
  const { email, password } = req.body;
  UserCred.findOne({ email: email })
    .then((result) => {
      if (result) {
        if (result.password === password) {
          const token = generateToken(email, password);
          res.cookie("token", token, { httpOnly: true }).json({ token: token });
          //console.log(token);
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log("Server started at port 3001");
});
