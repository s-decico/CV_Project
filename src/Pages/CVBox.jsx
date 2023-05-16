import React from "react";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../Atoms/CVAtoms";

function CVBox() {
  const value = useRecoilValue(userDetailsAtom);

  return <div className="cv_box">CVBox</div>;
}

export default CVBox;
