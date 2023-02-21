import React, { useState } from "react";
import "../WorkerArea.css";
import SaveButton from "../../../components/Button/Button";
import { backarrow2Asset, infoAsset, underReviewAsset } from "../../../assets";
import { NavLink, useLocation } from "react-router-dom";
import paths from "../../../routes/paths";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";

const UnderReview = () => {
  const { state } = useLocation();

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  return (
    <>
      <div className="mt-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="col-12 main-div mb-5">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-7">
              <center>
                <img
                  src={underReviewAsset}
                  width="120px"
                  height="120px"
                  alt=""
                />
                <h3 className="fs-22 fw-700 mt-3" style={{ color: "#FF6924" }}>
                  {(keywordTranslation &&
                    keywordTranslation["underReviewAnswer"]) ||
                    langKey.underReviewAnswer}
                </h3>
                <p className="fs-13 fw-500 mt-2" style={{ color: "#D1D1D1" }}>
                  {(keywordTranslation &&
                    keywordTranslation["underReviewMessage"]) ||
                    langKey.underReviewMessage}
                </p>
              </center>
            </div>

            <div className="col-lg-7 mt-4">
              <div className="border-bottom d-flex justify-content-center"></div>

              <div className="d-flex mt-5">
                <div>
                  <NavLink to={paths.tranings}>
                    <SaveButton
                      label="BACK TO TRAINING"
                      buttonStyle="back-btn"
                      iconPrev={backarrow2Asset}
                      imgStyle="mr-2"
                    />
                  </NavLink>
                </div>
                <div className="ml-auto">
                  <SaveButton
                    label="Under review"
                    buttonStyle="underReview-btn pl-3 pr-3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="d-flex align-items-center gap-2"
            style={{ marginTop: "100px" }}
          >
            <img src={infoAsset} alt="" />
            <p className="fs-11 fw-400" style={{ color: "#9C9C9C" }}>
              {(keywordTranslation && keywordTranslation["youHave"]) ||
                langKey.youHave}{" "}
              {state.payload.data.Score.reamining_attempt}{" "}
              {(keywordTranslation &&
                keywordTranslation["RemainingAttempts"]) ||
                langKey.RemainingAttempts}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnderReview;
