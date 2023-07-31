import React from "react";
import { TextField, Button, CircularProgress } from "@mui/material";

// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Link from "@mui/joy/Link";
// import IconButton from "@mui/joy/IconButton";
// import CircularProgress from "@mui/joy/CircularProgress";

import { useRef, useEffect, useContext, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { styled } from "@mui/material/styles";

import Navbar from "../../Component/Navbar";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cvinput");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setPasswordIncorrect(false);
    setUserNotFound(false);
    setEmptyEmail(false);
    setEmptyPassword(false);

    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;

    if (_email && _password) {
      setLoading(true);
      let UserData = { email: _email, password: md5(_password) };

      axios
        .post("http://localhost:3001/login", UserData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        })
        .then(function (res) {
          console.log(res.status);
          console.log("Login Data Sent");
          switch (res.status) {
            case 200:
              console.log("You are logged in now");
              navigate("/cvinput");
              break;
            default:
              console.log("Unexpected response");
              break;
          }
        })
        .catch(function (err) {
          console.log(err.response.status);
          switch (err.response.status) {
            case 401:
              console.log("Incorrect Password");
              setPasswordIncorrect(true);
              break;
            case 404:
              console.log("User not found");
              setUserNotFound(true);
              break;
            default:
              console.log("Unexpected response");
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (!_email) setEmptyEmail(true);
      if (!_password) setEmptyPassword(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="login_container">
        <WhiteTextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          inputRef={emailRef}
          error={userNotFound || emptyEmail}
          helperText={
            userNotFound
              ? "User not found, incorrect email"
              : emptyEmail
              ? "Email cannot be empty"
              : ""
          }
          sx={{ width: "100%" }}
        />
        <WhiteTextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={passwordRef}
          error={userNotFound || passwordIncorrect || emptyPassword}
          helperText={
            passwordIncorrect
              ? "Incorrect password"
              : emptyPassword
              ? "Password cannot be empty"
              : ""
          }
          sx={{ width: "100%" }}
        />
        <GradientButton
          variant="contained"
          type="button"
          onClick={handleLogin}
          sx={{ width: "100%" }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Submit"
          )}
        </GradientButton>
        New to us? Create an account
        <GradientButton
          onClick={() => {
            navigate("/register");
          }}
        >
          Create Account
        </GradientButton>
      </div>
    </>
  );
}

export default Login;
