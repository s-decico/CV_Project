import React from "react";
import Navbar from "./Navbar";
import User from "./User";

function Header() {
  return (
    <div>
      <div className="header">
        <div className="logo">RESUMATE</div>

        <User />
      </div>
    </div>
  );
}

export default Header;
