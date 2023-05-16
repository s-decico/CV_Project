import React from "react";
import { createContext } from "react";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";
import "./home.css";

const navbar_elements = ["Home", "My CV", "Contact Us", "Tips"];
const contextNav = createContext();

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="home_body">
        <p>
          WANT TO CREATE A <div>NEW CV</div>
          <br />
          <div>THAT GETS YOU YOUR</div>
          <br />
          DREAM JOB?
        </p>
        <button>GET STARTED</button>
      </div>
    </div>
  );
}

export default Home;
export { contextNav };
