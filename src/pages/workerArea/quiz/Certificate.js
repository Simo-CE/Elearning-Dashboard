import React from "react";
import "../WorkerArea.css";
import {
  awardAsset,
  newelec2Asset,
  signaturecertiAsset,
  Vector1Asset,
  Vector2Asset,
  Vector3Asset,
  Vector4Asset,
  Vector5Asset,
  Vector6Asset,
  Vector7Asset,
  Vector8Asset,
} from "../../../assets";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { relativeTimeThreshold } from "moment";

const Certificate = () => {
  const value = 0.66;

  return (
    <>
      <div
        className="mt-5 mb-5"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <img
          src={Vector8Asset}
          width="19px"
          height="15px"
          style={{ position: "relative", top: "19px", left: "0px" }}
        />
        <img
          src={Vector7Asset}
          width="19px"
          height="15px"
          style={{ position: "relative", top: "19px", left: "-19px" }}
        />

        <img
          src={Vector1Asset}
          width="19px"
          height="15px"
          style={{ float: "right", marginTop: "26px", marginRight: "1px" }}
        />
        <img
          src={Vector2Asset}
          width="19px"
          height="15px"
          style={{ float: "right", marginTop: "24px", marginRight: "-21px" }}
        />
        <div className="border-styles">
          <div className="border-style">
            <div
              className="row"
              style={{
                background: "#f8f6f5",
                paddingBottom: "10px",
                marginBottom: "0px",
              }}
            >
              <div className="col-md-8">
                <div className="d-flex gap-3 align-items-center">
                  <div
                    className="cirtificateProgressBar"
                    style={{ width: 100, height: 100 }}
                  >
                    <CircularProgressbar
                      value={value}
                      maxValue={1}
                      text={`${value * 100}%`}
                    />
                  </div>
                  <div className="text" style={{ marginleft: "100px" }}>
                    <h2 style={{ marginTop: "40px", fontWeight: "700" }}>
                      WORKING AT HEIGHT
                    </h2>
                    <h4 style={{ color: "#B8B8B8", fontWeight: "500" }}>
                      Training Certificate
                    </h4>
                    <hr
                      style={{
                        width: "50px",
                        color: "blue",
                        border: "1px solid",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>

                <div
                  className=""
                  style={{ marginLeft: "100px", marginTop: "50px" }}
                >
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "30px",
                      color: "#858585",
                    }}
                  >
                    This acknowledges that
                  </p>
                  <h2>Mr. Blaise DEFLOO</h2>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#B8B8B8",
                    }}
                  >
                    Has successfully completed this training on december 1,
                    2022. Thank you
                    <br />
                    for taking this training seriously to make your work
                    environment safe for all.
                  </p>
                </div>

                <div
                  className="row"
                  style={{ marginLeft: "100px", marginTop: "160px" }}
                >
                  <div className="col-lg-10">
                    <div className="d-flex align-items-end">
                      <div>
                        <img
                          src={signaturecertiAsset}
                          width="150px"
                          height="70px"
                        />
                        <h5>
                          Fabrice LECLERCQ
                          <br />
                          <p style={{ fontSize: "12px", color: "grey" }}>
                            Owner & Executive Director
                            <br />
                            at NEWELEC
                          </p>
                        </h5>
                      </div>
                      <div className="ml-auto mb-2">
                        <h5>
                          December 1, 2022
                          <br />
                          <p style={{ fontSize: "12px", color: "grey" }}>
                            Issue Date
                          </p>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className=" "
                  style={{ position: "relative", top: "40px" }}
                >
                  <img
                    src={newelec2Asset}
                    style={{ width: "211px", height: "162px" }}
                  />
                </div>

                <div>
                  <img
                    src={awardAsset}
                    width="100%"
                    height=""
                    style={{
                      marginTop: "80px",
                      position: "absolute",
                      left: "-50px",
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12" style={{ marginTop: "80px" }}>
                <hr />
                <div className="row">
                  <div className="d-flex">
                    <p
                      className="ml-3 fs-14 fw-500"
                      style={{ color: "#B8B8B8" }}
                    >
                      Certification ID: 1122022_A1nW_newelec
                    </p>
                    <p
                      className="mr-3 fs-14 fw-500 ml-auto"
                      style={{ color: "#B8B8B8" }}
                    >
                      Expiry Date1/12/2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <img
              src={Vector5Asset}
              width="19px"
              height="15px"
              style={{ float: "left", marginTop: "-10px", marginLeft: "-22px" }}
            />
            <img
              src={Vector6Asset}
              width="19px"
              height="15px"
              style={{ float: "left", marginTop: "-8px", marginLeft: "-23px" }}
            />

            <img
              src={Vector3Asset}
              width="19px"
              height="15px"
              style={{
                float: "right",
                position: "relative",
                top: "-10px",
                left: "21px",
              }}
            />
            <img
              src={Vector4Asset}
              width="19px"
              height="15px"
              style={{
                float: "right",
                position: "relative",
                top: "-8px",
                left: "42px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
