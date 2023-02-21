import React from "react";
import "./Table.css";
const TableComponent = ({ children, tableTitle }) => {
  return (
    <div
      className="row d-flex justify-content-center mt-3 customScrollbar tableOverflow"
    // style={{ overflow: "auto" }}
    >
      <div className="col-12  customScrollbar x-scroll">
        <table className="table">{children}</table>
      </div>
    </div>
  );
};

export default TableComponent;
