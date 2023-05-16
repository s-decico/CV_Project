import React from "react";
import BaseComponent from "bootstrap/js/dist/base-component";
import usericon from "../Images/user.png";
import home_back from "../Images/home_back.jpg";
import "./header.css";

function User() {
  return (
    <div>
      <img src={usericon} alt="User" className="userimg" />
    </div>
  );
}

export default User;
