import React from "react";
import "./SearchBar.css";
import { searchAsset } from "../../assets";

const SearchBar = (
  { value, placeholder, onChange, searchClass, searchId },
  props
) => {
  return (
    <>
      <img
        src={searchAsset}
        alt=""
        width="13px"
        height="13px"
        className="ml-2 searchIcon"
      />
      <input
        type="text"
        name=""
        value={value}
        placeholder={placeholder}
        id={searchId}
        className={searchClass}
        onChange={onChange}
        onBlur={onChange}
        onKeyPress={onChange}
      />
    </>
  );
};

export default SearchBar;
