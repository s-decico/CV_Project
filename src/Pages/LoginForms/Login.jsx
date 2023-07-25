import React from "react";
import { TextField, Button } from "@mui/material";
import { useRef, useEffect, useContext } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { styled } from "@mui/material/styles";
import { AuthProvider, AuthContext } from "../../AuthContext";
import Navbar from "../../Component/Navbar";
import { WhiteTextField, GradientButton } from "../../MUIStyledComponents";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cvinput");
    }
  }, []);

  const handleLogin = () => {
    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;
    let UserData = { email: _email, password: md5(_password) };

    axios
      .post("http://localhost:3001/login", UserData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then(function (res) {
        console.log("Login Data Sent");
        if (res.status === 200) {
          console.log("You are logged in now");
          navigate("/cvinput");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="login_container">
        <WhiteTextField
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          inputRef={emailRef}
          sx={{ width: "100%" }}
        />
        <WhiteTextField
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
          onClick={handleLogin}
          sx={{ width: "100%" }}
        >
          Submit
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
