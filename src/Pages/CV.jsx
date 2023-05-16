import React, { useState } from "react";
import { useRecoilState, atom, RecoilState, RecoilRoot } from "recoil";
import Header from "../Component/Header";
import Navbar from "../Component/Navbar";
import "./cv.css";
import CVBox from "./CVBox";
import CVInputBox from "./CVInputBox";

function CV() {
  return (
    <div>
      <Header />
      <div className="cv_area">
        <RecoilRoot>
          <CVInputBox />
          <CVBox />
        </RecoilRoot>
      </div>
    </div>
  );
}

export default CV;
