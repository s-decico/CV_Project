const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
  WorkExperience: { type: Map, of: workExperienceSchema },
  Education: { type: Map, of: educationSchema },
  Project: { type: Map, of: projectSchema },
  Achievement: { type: Map, of: achievementSchema },
  Language: [String],
  Interest: [String],
  Skills: [String],
});

const UserDetails = mongoose.model("UserDetails", userSchema);
module.exports = UserDetails;

const userCredSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
userCredSchema.plugin(passportLocalMongoose);

const UserCred = mongoose.model("UserCred", userCredSchema);
module.exports = UserCred;
