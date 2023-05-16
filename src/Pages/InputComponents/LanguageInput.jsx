import React, { useState } from "react";

function LanguageInput({ language, setLanguage }) {
  let templanguage = "";
  return (
    <>
      Languages
      <div className="languagedisplayinput">
        {language.map((x) => {
          return <div>{x}</div>;
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          templanguage = e.target.value;
        }}
      />
      <button
        type="button"
        onClick={() => {
          setLanguage([...language, templanguage]);
        }}
      >
        +
      </button>
    </>
  );
}

export default LanguageInput;
