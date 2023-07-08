const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const querystring = require("querystring");
require("dotenv").config();
const UserDetails = require("./src/Schemas");
const UserCred = require("./src/Schemas");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(cors());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

passport.use(new LocalStrategy(UserCred.authenticate()));
passport.serializeUser(UserCred.serializeUser());
passport.deserializeUser(UserCred.deserializeUser());

//API routes
app

  .route("/")
  .get((req, res) => {
    res.send("Hello");
  })
  .post((req, res) => {
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
  const credObj = req.body;

  UserCred.findOne({ email: req.body.email })
    .then((result) => {
      if (result.password === credObj.password) {
        res.sendFile(__dirname + "/src/Pages/LoginForms/landing.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, function () {
  console.log("Server started at port 3001");
});
