import React from "react";
import { WarningAsset } from "../../assets";
import './ErrorViewer.css'

const ErrorViewer = ({ message, className }) => {
  return (
    <div className={`d-flex warning-msg error ${className}`} id="invalid_email">
      <img src={WarningAsset} className="img-fluid error" alt="" />
      <p className="error mb-0">{message}</p>
    </div>
  );
};

export default ErrorViewer;