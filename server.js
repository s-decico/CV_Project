const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { UserDetails, UserCred } = require("./src/Schemas");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var cors = require("cors");
require("dotenv").config();
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
app.use((err, req, res, next) => {
  console.log("Error:" + err);
});
app.use((req, res, next) => {
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
mongoose.set("debug", true);
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

//Token handler functions
const secretKey = process.env.JWT_SECRET_KEY;

function generateToken(username, id) {
  const userData = {
    id: id,
    username: username,
  };
  console.log(userData);
  const token = jwt.sign(userData, secretKey);
  return token;
}

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
};

//API endpoints
app.route("/cvinput").post((req, res) => {
  try {
    if (req) {
      const obj = req.body;
      let jsonString = "";
      for (const key in obj) {
        jsonString += obj[key];
      }

      const receivedToken = req.cookies.token;
      const decodedToken = verifyToken(
        receivedToken,
        process.env.JWT_SECRET_KEY
      );
      console.log(decodedToken.id);

      const parsedObject = JSON.parse(jsonString);
      parsedObject.BasicDetails = JSON.parse(parsedObject.BasicDetails);
      parsedObject.WorkExperience = JSON.parse(parsedObject.WorkExperience);
      parsedObject.Education = JSON.parse(parsedObject.Education);
      parsedObject.Project = JSON.parse(parsedObject.Project);
      parsedObject.Achievement = JSON.parse(parsedObject.Achievement);
      parsedObject["UserID"] = decodedToken.id;
      console.log(parsedObject);
      UserDetails.insertMany(parsedObject)
        .then(() => {
          console.log("Data inserted successfully+");
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error while inserting:" + err);
          res.sendStatus(500);
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
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error while inserting:" + err);
      res.sendStatus(500);
    });
});

app.route("/login").post((req, res) => {
  const { email, password } = req.body;
  console.log(req.cookies.token);
  UserCred.findOne({ email: email })
    .then((result) => {
      if (result) {
        if (result.password === password) {
          const token = generateToken(result.email, result._id);
          res.cookie("token", token, { httpOnly: true }).json({ token: token });
        } else {
          res.sendStatus(401).json({ error: "Incorrect password" });
        }
      } else {
        res.sendStatus(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//Testing route
// app.route("/hello").get((req, res) => {
//   //console.log(req.cookies.token);
//   const receivedToken = req.cookies.token;
//   const decodedToken = verifyToken(receivedToken, process.env.JWT_SECRET_KEY);
//   if (decodedToken) {
//     res.status(201).send("Access granted");
//     //The decodedToken contains username and id
//   } else {
//     // Token is invalid or expired
//     res.status(401).send("Access denied");
//   }
// });

app.listen(3001, () => {
  console.log("Server started at port 3001");
});
