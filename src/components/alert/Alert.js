import React, { useEffect } from "react";
import "./Alert.css";
import "../ResponsiveText.css";
import { Alert } from "react-bootstrap";
import { alertSuccessAsset, alertErrorAsset } from "../../assets";

function AlertComponent({ message, error, closeHandler, className }) {
  useEffect(() => {
    if (closeHandler) {
      setTimeout(() => {
        closeHandler();
      }, 2000);
    }
  }, []);

  return (
    <>
      <div className={`row mt-3 ${className}`}>
        <div className="col-12">
          <Alert className={error ? "alertError" : "alert"}>
            <div className="d-flex align-items-center">
              <img
                src={error ? alertErrorAsset : alertSuccessAsset}
                alt=""
                width="21px"
                height="21px"
                className="ml-2"
              />
              <p className="ml-2 mb-0 fonsize-12">{message}</p>
            </div>
            <h6 className="mr-2 ml-auto mb-0 cursor" onClick={closeHandler}>
              ✕
            </h6>
          </Alert>
        </div>
      </div>
    </>
  );
}

export default AlertComponent;
