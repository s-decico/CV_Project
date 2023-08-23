import React from "react";
import { createRoot } from "react-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import CV from "./Pages/CV";
import { ThemeProvider } from "@mui/system";
import { MuiThemeContext } from "./MuiThemeContext";
import Home from "./Pages/Home";
import Login from "./Pages/LoginForms/Login";
import Registration from "./Pages/LoginForms/Registration";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import CVInputBox from "./Pages/CVInputBox";
import { dividerClasses } from "@mui/material";
import CVBox from "./Pages/CVBox";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={MuiThemeContext}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cvinput" element={<CVInputBox />} />
          <Route path="/cv" element={<CVBox />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
