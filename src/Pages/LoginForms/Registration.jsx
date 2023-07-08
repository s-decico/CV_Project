import React from "react";
import { TextField, Button } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import md5 from "md5";

function Registration() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const handleRegistration = () => {
    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;
    const _name = nameRef.current.value;
    let UserData = { name: _name, email: _email, password: md5(_password) };

    console.log(UserData);

    axios
      .post("http://localhost:3001/register", UserData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(function (res) {
        console.log("Registration Data Sent");
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          inputRef={nameRef}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          inputRef={emailRef}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={passwordRef}
        />
        <Button variant="contained" type="button" onClick={handleRegistration}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default Registration;
