import React from "react";
import { TextField, Button } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import "../login.css";
import Navbar from "../../Component/Navbar";
import { Google } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

function Registration() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const navigate = useNavigate();

  const handleRegistration = () => {
    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;
    const _name = nameRef.current.value;
    let UserData = { name: _name, email: _email, password: md5(_password) };

    axios
      .post("http://localhost:3001/register", UserData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Registration Data Sent");
          navigate("/cvinput");
        } else navigate("/register");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="reg_container">
        <WhiteTextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          inputRef={nameRef}
          sx={{ width: "100%" }}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          inputRef={emailRef}
          sx={{ width: "100%" }}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={passwordRef}
          sx={{ width: "100%" }}
        />
        <GradientButton
          variant="contained"
          type="button"
          onClick={handleRegistration}
          sx={{ width: "100%" }}
        >
          Submit
        </GradientButton>
        <span className="reg_login">
          Already have an account?
          <GradientButton
            variant="contained"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </GradientButton>
        </span>
      </div>
    </>
  );
}

export default Registration;
