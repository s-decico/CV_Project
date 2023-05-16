import React from "react";
import "./header.css";

const navbar_elements = ["Home", "My CV", "Contact Us", "Tips"];

function Navbar() {
  return (
    <div>
      <div className="navbar">
        {navbar_elements.map((x) => {
          return <div className="nav_ele">{x}</div>;
        })}
      </div>
    </div>
  );
}

export default Navbar;
