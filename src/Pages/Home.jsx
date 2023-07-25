import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";

import cookie from "js-cookie";
import { Box, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../AuthContext";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="home">
      <Navbar />
      <div className="home_body">
        <p>
          WANT TO CREATE A <span>NEW CV</span>
          <br />
          <div>THAT GETS YOU YOUR</div>
          <br />
          <span>DREAM JOB?</span>
        </p>

        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default Home;
