import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CV from "./Pages/CV";
import Home from "./Pages/Home";
import { ThemeProvider } from "@mui/system";
import { MuiThemeContext } from "./MuiThemeContext";
import Login from "./Pages/LoginForms/Login";
import Registration from "./Pages/LoginForms/Registration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiThemeContext}>
      <CV />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
