import React from "react";
import "./ToggleSlide.css";

const ToggleSlide = ({ Class = "Small", onChangeHandler, ...others }) => {
  return (
    <label className={`switch${Class}`}>
      <input
        type="checkbox"
        onChange={(e) => onChangeHandler(Number(e.target.checked))}
        {...others}
      />
      <span className={`slider${Class} round${Class}`}></span>
    </label>
  );
};

export default ToggleSlide;
