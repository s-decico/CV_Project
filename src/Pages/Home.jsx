import React from "react";
import { createContext, useState, useEffect } from "react";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";
import cookie from "js-cookie";

const navbar_elements = ["Home", "My CV", "Contact Us", "Tips"];
const contextNav = createContext();

function Home() {
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();
  const token = cookie.get("token");
  useEffect(() => {
    if (token == null || token == undefined) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }
  }, [token]);
  //  console.log(token);
  return (
    <div className="home">
      <Header />
      <div className="home_body">
        WANT TO CREATE A <div>NEW CV</div>
        <br />
        <div>THAT GETS YOU YOUR</div>
        <br />
        DREAM JOB?
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          GET STARTED
        </button>
        <p style={{ visibility: isToken ? "visible" : "hidden" }}>
          This person is logged in!!!!!!!
        </p>
      </div>
    </div>
  );
}

export default Home;
export { contextNav };
