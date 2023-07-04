const mongoose = require("mongoose");

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

const UserDetails = mongoose.model("UserDetails", userSchema);
module.exports = UserDetails;
