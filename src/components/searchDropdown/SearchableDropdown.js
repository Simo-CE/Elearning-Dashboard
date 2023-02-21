import React, { useEffect } from "react";
import Searchable from "react-searchable-dropdown";
import "./Search.css";

const SearchableDropdown = ({
  e = false,
  placeholder = "Select please",
  name = "",
  selectedValue,
  changeHandler,
  options = [],
  disabled = false,
}) => {
  return (
    <>
      <Searchable
        value={selectedValue || ""}
        placeholder={placeholder}
        notFoundText="No result found"
        hideSelected
        options={[{ value: "", label: placeholder }, ...options]}
        onSelect={(value) => {
          e ? changeHandler({ value, name }) : changeHandler(value);
        }}
        listMaxHeight={200}
        disabled={disabled}
      />
    </>
  );
};

export default SearchableDropdown;
