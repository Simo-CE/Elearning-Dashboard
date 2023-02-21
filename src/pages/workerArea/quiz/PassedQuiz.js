import React, { useState } from "react";
import "../WorkerArea.css";
import SaveButton from "../../../components/Button/Button";
import {
  backarrow2Asset,
  downloadgreenAsset,
  infoAsset,
  passedIconAsset,
  printerBrownAsset,
  viewAsset,
  viewblueAsset,
} from "../../../assets";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import paths from "../../../routes/paths";
import TraningDetailModal from "../TraningDetailModal";
import { useGetSingleTrainingListQuery } from "../../../services/api";
import langKey from "../../../localization/locale.json";
import validationMessage from "../../../localization/validationsLocale.json";
import { useSelector } from "react-redux";

const PassedQuiz = () => {
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleDetailModal = (data) => {
    setShowModal((prev) => !prev);
  };

  
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListQuery(
      state?.payload?.data.TrainingQuizResult.training_id
    );
  return (
    <>
      {" "}
      {showModal && (
        <TraningDetailModal
          TraningDetailModal={TraningDetailModal}
          getSingleTrainingList={getSingleTrainingList}
          handleDetailModal={handleDetailModal}
        />
      )}
      <div className="mt-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="col-12 main-div mb-5">
          <div className="row justify-content-center partyImg">
            <div className="col-lg-7 mt-5">
              <center>
                <img
                  src={passedIconAsset}
                  width="120px"
                  height="120px"
                  alt=""
                />
                <h3 className="fs-22 fw-700 mt-3" style={{ color: "#47CA5B" }}>
                  {state.payload.data.message}
                </h3>
                <p className="fs-13 fw-500 mt-2" style={{ color: "#2C8EFF" }}>
                  {(keywordTranslation && keywordTranslation["youScored"]) ||
                    langKey.youScored}{" "}
                  {state.payload.data.Score.score}%
                </p>
                <p className="fs-13 fw-500 mt-1" style={{ color: "#D1D1D1" }}>
                  {(keywordTranslation && keywordTranslation["passingScore"]) ||
                    langKey.passingScore}{" "}
                  {state.payload.data.Score.training_score}%
                </p>
              </center>
            </div>

            <div className="col-lg-7 mt-4">
              <div className="border-bottom d-flex justify-content-center"></div>

              <div className="d-flex mt-4">
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
                <div className="d-flex align-items-center ml-auto gap-2">
                  <img
                    src={viewblueAsset}
                    width="18.75px"
                    height="13.75px"
                    alt=""
                    onClick={() => handleDetailModal()}
                  />
                  <img
                    src={downloadgreenAsset}
                    width="14px"
                    height="16px"
                    alt=""
                  />
                  <img
                    src={printerBrownAsset}
                    width="17px"
                    height="16px"
                    alt=""
                  />
                  <NavLink to={paths.certificate}>
                    <SaveButton
                      label="Get Certificate"
                      buttonStyle="success-btn pl-3 pr-3"
                    />
                  </NavLink>
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

export default PassedQuiz;
