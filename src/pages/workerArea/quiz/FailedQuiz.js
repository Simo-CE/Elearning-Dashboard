import React, { useEffect, useState } from "react";
import "../WorkerArea.css";
import SaveButton from "../../../components/Button/Button";
import {
  backarrow2Asset,
  downloadgreenAsset,
  failedIconAsset,
  infoAsset,
  passedIconAsset,
  printerBrownAsset,
  viewAsset,
  viewblueAsset,
} from "../../../assets";
import { NavLink, useLocation } from "react-router-dom";
import paths from "../../../routes/paths";
import {
  useDownloadTrainingCertificateMutation,
  useGetSingleTrainingListQuery,
} from "../../../services/api";
import TraningDetailModal from "../TraningDetailModal";
import useDownloader from "react-use-downloader";
import langKey from "../../../localization/locale.json";
import validationMessage from "../../../localization/validationsLocale.json";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FailedQuiz = () => {
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);

  const token = useSelector((state) => state.auth?.userDetail?.token);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const handleDetailModal = (data) => {
    setShowModal((prev) => !prev);
  };

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListQuery(
      state?.payload?.data.TrainingQuizResult.training_id
    );

  const { download } = useDownloader({
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [
    downloadTrainingCertificate,
    {
      isSuccess: downloadTrainingCertificateSuccess,
      isLoading: downloadTrainingCertificateLoading,
      isFetching: downloadTrainingCertificateFetching,
      error: downloadTrainingCertificateError,
      reset: downloadTrainingCertificateReset,
    },
  ] = useDownloadTrainingCertificateMutation();

  useEffect(() => {
    getSingleTrainingRefetch();
  }, [getSingleTrainingList]);

  const handleDownloadTrainingCertificate = () => {
    downloadTrainingCertificate(
      state?.payload?.data.TrainingQuizResult.training_id
    )
      .unwrap()
      .then((payload) => {
        download(payload?.data, "file." + payload?.data?.split(".").pop());
      })
      .catch((error) => {
        if (error?.data?.message === "mustBePass") {
          let msg =
            (error?.data?.message === "mustBePass" &&
              keywordTranslation &&
              keywordTranslation["mustBePass"]) ||
            validationMessage.mustBePass;
          toast.error(msg);
        }
      });
  };

  return (
    <>
      {showModal && (
        <TraningDetailModal
          handleDetailModal={handleDetailModal}
          getSingleTrainingList={getSingleTrainingList}
        />
      )}
      <div className="mt-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="col-12 main-div mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-7 mt-5">
              <center>
                <img
                  src={failedIconAsset}
                  width="120px"
                  height="120px"
                  alt=""
                />
                <h3 className="fs-22 fw-700 mt-3" style={{ color: "#ED4C5C" }}>
                  {state.payload.data.message}
                </h3>
                <p className="fs-13 fw-500 mt-2" style={{ color: "#2C8EFF" }}>
                  {(keywordTranslation && keywordTranslation["youScored"]) ||
                    langKey.youScored}{" "}
                  {state.payload.data.Score.score}%
                </p>
                <p className="fs-13 fw-500 mt-1" style={{ color: "#D1D1D1" }}>
                  {(keywordTranslation && keywordTranslation["passingScore"]) ||
                    langKey.passingScore}
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
                    onClick={handleDownloadTrainingCertificate}
                  />
                  <img
                    src={printerBrownAsset}
                    width="17px"
                    height="16px"
                    alt=""
                  />
                  <p className="fs-12 fw-500" style={{ color: "#FACB16" }}>
                    {state.payload.data.Score.reamining_attempt}
                    {(keywordTranslation &&
                      keywordTranslation["attemptsRemaining"]) ||
                      langKey.attemptsRemaining}
                  </p>
                  <NavLink
                    to={paths.trueFalse}
                    state={{ questions: getSingleTrainingList }}
                  >
                    <SaveButton
                      label="Start again"
                      buttonStyle="primaryborder-btn pl-3 pr-3"
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

export default FailedQuiz;
