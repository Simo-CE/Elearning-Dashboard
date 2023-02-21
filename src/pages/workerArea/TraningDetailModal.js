import React, { useRef } from "react";
import Button from "../../components/Button/Button";
import ModalComponent from "../../components/Model/Model";
import { Modal, Accordion } from "react-bootstrap";
import {
  atTheAsset,
  blaiseProfileAsset,
  correctAsset,
  crossAsset,
  cuationAsset,
  downloadgreenAsset,
  figureAsset,
  fileUploadIconAsset,
  greenLikeAsset,
  iconAsset,
  notFoundAsset,
  phoneAsset,
  phoneIconAsset,
  printerBrownAsset,
  printIconAsset,
  profileAsset,
  profilePageAsset,
  satordiAsset,
  statusfailedAsset,
  statusGreenAsset,
  wrongAsset,
} from "../../assets";
import Table from "../../components/table/Table";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  useDownloadTrainingCertificateMutation,
  useGetTrainingDetailsQuery,
} from "../../services/api";
import { useLocation } from "react-router-dom";
import "./WorkerArea.css";
import langKey from "../../localization/locale.json";
import validationMessage from "../../localization/validationsLocale.json";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import useDownloader from "react-use-downloader";

const TraningDetailModal = (props) => {
  const { state } = useLocation();
  const pass = 99;
  const fail = 1;


  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const { data: getTrainingDetails } = useGetTrainingDetailsQuery({
    training_id: props?.getSingleTrainingList.training.id,
    user_id:
      props?.getSingleTrainingList?.training?.participants &&
      props?.getSingleTrainingList?.training?.participants[0].id,
  });

  console.log(getTrainingDetails);


  const token = useSelector((state) => state.auth?.userDetail?.token);

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

  const { download } = useDownloader({
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fileUrl =
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/%D0%93%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0_%D1%96_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D1%81_%D0%B2_%D0%BF%D1%80%D0%BE%D0%BC%D1%96%D0%BD%D1%8F%D1%85_%D0%B2%D1%80%D0%B0%D0%BD%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE_%D1%81%D0%BE%D0%BD%D1%86%D1%8F.jpg";
  const filename = "beautiful-carpathia.jpg";

  // const extention = getSingleTrainingList?.training?.training_resource[0].documents
  // ?.split(".")
  // .pop()

  const certificateRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const handleDownloadTrainingCertificate = () => {
    downloadTrainingCertificate(props?.getSingleTrainingList.training.id)
      .unwrap()
      .then((payload) => {
        download(payload?.data, "file." + payload?.data?.split(".").pop());
        window.open(payload?.data);
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
      <ModalComponent
        size="xl"
        show={true}
        handleClose={props.handleDetailModal}
        title={
          (keywordTranslation && keywordTranslation["trainingDetails"]) ||
          langKey.trainingDetails
        }
        className="traningDetailModal"
        state={state}
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-lg-12 col-xl-6">
              <div className="row">
                <div className="col-lg-12">
                  <p className="traningDetailHeadings">
                    {" "}
                    {(keywordTranslation && keywordTranslation["userInfo"]) ||
                      langKey.userInfo}
                  </p>
                  <div className="userInfoDiv">
                    <div className="d-flex align-items-center mt-1">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            getTrainingDetails?.training_detail.user
                              .profile_photo || notFoundAsset
                          }
                          className="rounded-circle"
                          width="105px"
                          height="105px"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p
                          className="fs-14 fw-500"
                          style={{ color: "#313131" }}
                        >
                          {getTrainingDetails?.training_detail.user.first_name}{" "}
                          &nbsp;
                          {getTrainingDetails?.training_detail.user.last_name}
                          <span style={{ color: "#A1A1A1" }}>
                            {getTrainingDetails?.training_detail.user?.age &&
                              getTrainingDetails?.training_detail.user?.age}
                          </span>
                        </p>
                        <p className="departDetail mt-1">
                          {getTrainingDetails?.training_detail.user.function
                            ?.name || "—"}{" "}
                          •{" "}
                          {getTrainingDetails?.training_detail.user?.department
                            ?.name || "—"}{" "}
                          •{" "}
                          {getTrainingDetails?.training_detail.user
                            .requester_company?.name || "—"}
                        </p>

                        <div className="d-flex gap-2 mt-2">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={phoneAsset}
                              width="10px"
                              height="10px"
                              alt=""
                            />
                            <p
                              className="fs-12 fw-400"
                              style={{ color: "#47CA5B" }}
                            >
                              {getTrainingDetails?.training_detail.user
                                ?.phone_number || "—"}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={atTheAsset}
                              width="12px"
                              height="12px"
                              alt=""
                            />
                            <p
                              className="fs-12 fw-500"
                              style={{ color: "#FF772A" }}
                            >
                              {getTrainingDetails?.training_detail.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mt-2">
                          <div className="flex-shrink-0">
                            <img
                              src={
                                getTrainingDetails?.training_detail.user
                                  .report_to?.profile_photo || notFoundAsset
                              }
                              className="rounded-circle"
                              width="30px"
                              height="30px"
                              alt="..."
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <p className="fs-12 fw-400" mb-0>
                              {getTrainingDetails?.training_detail.user
                                .report_to?.first_name || "—"}{" "}
                              {getTrainingDetails?.training_detail.user
                                .report_to?.last_name || "—"}
                            </p>
                            <p className="departDetail">Manager</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mt-3">
                  <p className="traningDetailHeadings">
                    {" "}
                    {(keywordTranslation && keywordTranslation["quizResult"]) ||
                      langKey.quizResult}
                  </p>
                  <div className="userInfoDiv">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="text-center d-flex justify-content-center align-items-center flex-column gap-2">
                          <div style={{ width: 100, height: 100 }}>
                            <CircularProgressbar
                              value={
                                getTrainingDetails?.training_detail.score || 0
                              }
                              text={`${
                                getTrainingDetails?.training_detail.score || 0
                              }%`}
                              className="finalScoreProgressBar"
                            />
                          </div>
                          <p className="para13" style={{ color: "#313131" }}>
                            {(keywordTranslation &&
                              keywordTranslation["finalScore"]) ||
                              langKey.finalScore}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 60, height: 60 }}>
                            <CircularProgressbar
                              value={
                                getTrainingDetails?.correct.percentage || 0
                              }
                              text={`${
                                getTrainingDetails?.correct.percentage || 0
                              }%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div className="corectText">
                            <p
                              className="fs-12 fw-400"
                              style={{ color: "#47CA5B" }}
                            >
                              {(keywordTranslation &&
                                keywordTranslation["correct"]) ||
                                langKey.correct}
                            </p>
                          </div>
                          <div>
                            <p className="para13" style={{ color: "#313131" }}>
                              {getTrainingDetails?.correct.percentage || 0}%
                            </p>
                            <p className="para13">
                              {getTrainingDetails?.correct.right_question}{" "}
                              {(keywordTranslation &&
                                keywordTranslation["answer"]) ||
                                langKey.answer}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-3">
                          <div>
                            <img
                              src={figureAsset}
                              width="60px"
                              height="60px"
                              alt=""
                            />
                          </div>

                          <div>
                            <p className="para13" style={{ color: "#313131" }}>
                              {getTrainingDetails?.training_repeat}
                            </p>
                            <p className="para13">
                              {" "}
                              {(keywordTranslation &&
                                keywordTranslation["attempts"]) ||
                                langKey.attempts}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: 60, height: 60 }}>
                            <CircularProgressbar
                              value={getTrainingDetails?.wrong.percentage || 0}
                              text={`${
                                getTrainingDetails?.wrong.percentage || 0
                              }%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div className="corectText">
                            <p
                              className="fs-12 fw-400"
                              style={{ color: "#EF3C3C" }}
                            >
                              {(keywordTranslation &&
                                keywordTranslation["wrong"]) ||
                                langKey.wrong}
                            </p>
                          </div>
                          <div>
                            <p className="para13" style={{ color: "#313131" }}>
                              {Number(getTrainingDetails?.wrong.percentage) ||
                                0}
                              %
                            </p>
                            <p className="para13">
                              {getTrainingDetails?.wrong.right_question}{" "}
                              {(keywordTranslation &&
                                keywordTranslation["answer"]) ||
                                langKey.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-xl-6">
              <p className="traningDetailHeadings">
                {" "}
                {(keywordTranslation && keywordTranslation["userAnswer"]) ||
                  langKey.userAnswer}
              </p>

              {getTrainingDetails?.TrainingQuestion?.map((data, index) => {
                return (
                  <Accordion
                    defaultActiveKey={[index]}
                    alwaysOpen
                    className="traningDetailAccordian"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className={
                          data?.question_result?.status === "right"
                            ? "backgroundblue"
                            : "backgroundred"
                        }
                      >
                        Q{index + 1}. {data.name}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="traningDetailAccordianTable">
                          <Table>
                            <thead className="traningDetailAccordianTableHead">
                              <tr>
                                <th>
                                  {" "}
                                  {(keywordTranslation &&
                                    keywordTranslation["result"]) ||
                                    langKey.result}
                                </th>
                                <th>
                                  {" "}
                                  {(keywordTranslation &&
                                    keywordTranslation["avgAcore"]) ||
                                    langKey.avgAcore}
                                </th>
                              </tr>
                            </thead>

                            <tbody className="traningDetailAccordianTableBody">
                              <tr>
                                <td>
                                  {data?.questions_type === "5" ? (
                                    <>
                                      {data?.question_option?.map((user) => {
                                        return (
                                          <div className=" d-flex justify-content-center align-items-center flex-column mb-3">
                                            <>
                                              <div>
                                              {data?.image!=""?<img
                                                  // src={handleSubmit(() =>
                                                  //   onSubmit("Buy")
                                                  // )}
                                                  src={data?.image}
                                                  width="139px"
                                                  height="92px"
                                                  alt=""
                                                />:null}
                                                
                                              </div>
                                              <div>
                                                <div
                                                  className="trueFalseBorder mt-2 "
                                                  style={{
                                                    height: "auto",
                                                    width: "139px",
                                                  }}
                                                >
                                                  <ul className="trueFalse">
                                                    <li
                                                      className="mt-1 mb-1"
                                                      style={{
                                                        color: "#2C8EFF",
                                                      }}
                                                    >
                                                      <div className="d-flex">
                                                        <p className="mb-0">
                                                          {
                                                            user
                                                              ?.training_user_submited_answer[0]
                                                              .user_right_answer
                                                          }
                                                        </p>

                                                        <img
                                                          src={
                                                            user
                                                              ?.training_question_answer[0]
                                                              ?.sequence ===
                                                            user
                                                              ?.training_user_submited_answer[0]
                                                              ?.sequence
                                                              ? correctAsset
                                                              : wrongAsset
                                                          }
                                                          width="14px"
                                                          height="14px"
                                                          alt=""
                                                          className="me-2 ms-auto"
                                                        />
                                                      </div>
                                                      {user
                                                        ?.training_question_answer[0]
                                                        ?.sequence !==
                                                        user
                                                          ?.training_user_submited_answer[0]
                                                          ?.sequence && (
                                                        <div className="d-flex">
                                                          <p className="mb-0">
                                                            {
                                                              user
                                                                ?.training_user_submited_answer[0]
                                                                .user_right_answer
                                                            }
                                                          </p>
                                                          <img
                                                            src={correctAsset}
                                                            width="14px"
                                                            height="14px"
                                                            alt=""
                                                            className="me-2 ms-auto"
                                                          />
                                                        </div>
                                                      )}
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </>
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : data?.questions_type === "1" ? (
                                    <>
                                      {data?.question_option?.map((user) => {
                                        return (
                                          <div>
                                            <ul className="trueFalse">
                                              <li
                                                className={`${
                                                  user
                                                    .training_user_submited_answer
                                                    ?.length > 0
                                                    ? "text-primary"
                                                    : "text-secondary"
                                                }`}
                                              >
                                                {user.name}
                                                <img
                                                  src={
                                                    Number(
                                                      user
                                                        ?.training_question_answer[0]
                                                        ?.option_id
                                                    ) ===
                                                    Number(
                                                      user
                                                        ?.training_user_submited_answer[0]
                                                        ?.option_id
                                                    )
                                                      ? correctAsset
                                                      : wrongAsset
                                                  }
                                                  width="14px"
                                                  height="14px"
                                                  alt=""
                                                  className="ms-2"
                                                />
                                              </li>
                                              {/* <li>
                                            False
                                            <img
                                              src={
                                                user
                                                  ?.training_question_answer[0]
                                                  ?.option_id ===
                                                user
                                                  ?.training_user_submited_answer[0]
                                                  ?.option_id
                                                  ? correctAsset
                                                  : wrongAsset
                                              }
                                              width="14px"
                                              height="14px"
                                              alt=""
                                              className="ms-2"
                                            />
                                          </li> */}
                                            </ul>
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : data?.questions_type === "2" ? (
                                    <>
                                      {data?.question_option?.map((user) => {
                                        return (
                                          <div>
                                            <ul className="trueFalse">
                                              <li
                                                className={`${
                                                  user
                                                    .training_user_submited_answer
                                                    ?.length > 0
                                                    ? "text-primary"
                                                    : "text-secondary"
                                                }`}
                                              >
                                                {user.name}
                                                <img
                                                  src={
                                                    Number(
                                                      user
                                                        ?.training_question_answer[0]
                                                        ?.option_id
                                                    ) ===
                                                    Number(
                                                      user
                                                        ?.training_user_submited_answer[0]
                                                        ?.option_id
                                                    )
                                                      ? correctAsset
                                                      : wrongAsset
                                                  }
                                                  width="14px"
                                                  height="14px"
                                                  alt=""
                                                  className="ms-2"
                                                />
                                              </li>
                                              {/* <li>
                                            False
                                            <img
                                              src={
                                                user
                                                  ?.training_question_answer[0]
                                                  ?.option_id ===
                                                user
                                                  ?.training_user_submited_answer[0]
                                                  ?.option_id
                                                  ? correctAsset
                                                  : wrongAsset
                                              }
                                              width="14px"
                                              height="14px"
                                              alt=""
                                              className="ms-2"
                                            />
                                          </li> */}
                                            </ul>
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : data?.questions_type === "3" ? (
                                    <div>
                                      <ul
                                        className={
                                          data?.questions_type === "3"
                                            ? "sorting"
                                            : "trueFalse"
                                        }
                                      >
                                        {data?.question_option?.map(
                                          (option, optionIndex) => {
                                            return (
                                              <>
                                                {option.training_question_answer?.map(
                                                  (correct, correctIndex) =>
                                                    option?.training_user_submited_answer?.map(
                                                      (user, userIndex) => (
                                                        <>
                                                          {option?.training_user_submited_answer?.map(
                                                            (
                                                              user,
                                                              userIndex
                                                            ) => {
                                                              return (
                                                                <li
                                                                  style={{
                                                                    color:
                                                                      "#2C8EFF",
                                                                  }}
                                                                >
                                                                  {data?.questions_type ===
                                                                    "3" &&
                                                                    optionIndex +
                                                                      1 +
                                                                      " - " +
                                                                      user.user_right_answer}

                                                                  <img
                                                                    src={
                                                                      correctIndex ===
                                                                        userIndex &&
                                                                      correct.sequence ===
                                                                        user.sequence
                                                                        ? correctAsset
                                                                        : wrongAsset
                                                                    }
                                                                    width="14px"
                                                                    height="14px"
                                                                    alt=""
                                                                    className="ms-2"
                                                                  />
                                                                  {correct.sequence !==
                                                                    user.sequence &&
                                                                  data?.questions_type ===
                                                                    "3" ? (
                                                                    <span className="correctAnswer">
                                                                      {
                                                                        correct.name
                                                                      }
                                                                    </span>
                                                                  ) : null}
                                                                </li>
                                                              );
                                                            }
                                                          )}
                                                        </>
                                                      )
                                                    )
                                                )}
                                              </>
                                            );
                                          }
                                        )}

                                        {/* <li>
                                      False{" "}
                                      <img
                                        src={wrongAsset}
                                        width="14px"
                                        height="14px"
                                        alt=""
                                        className="ms-2"
                                      />
                                    </li> */}
                                      </ul>
                                    </div>
                                  ) : data?.questions_type === "4" ? (
                                    <>
                                      <div>
                                        <ul className="trueFalse">
                                          <li
                                            className={`${
                                              data?.question_result?.status ==
                                              "right"
                                                ? "text-primary"
                                                : "text-secondary"
                                            }`}
                                          >
                                            {data?.name}
                                            <img
                                              src={
                                                data?.question_result?.status ==
                                                "right"
                                                  ? correctAsset
                                                  : wrongAsset
                                              }
                                              width="14px"
                                              height="14px"
                                              alt=""
                                              className="ms-2"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      {data?.question_option?.map((user) => {
                                        return (
                                          <div>
                                            <ul className="trueFalse">
                                              <li
                                                className={`${
                                                  user
                                                    .training_user_submited_answer
                                                    ?.length > 0
                                                    ? "text-primary"
                                                    : "text-secondary"
                                                }`}
                                              >
                                                {user.name}
                                                {/* <img
                                                  src={
                                                    Number(
                                                      user
                                                        ?.training_question_answer[0]
                                                        ?.option_id
                                                    ) ===
                                                    Number(
                                                      user
                                                        ?.training_user_submited_answer[0]
                                                        ?.option_id
                                                    )
                                                      ? correctAsset
                                                      : wrongAsset
                                                  }
                                                  width="14px"
                                                  height="14px"
                                                  alt=""
                                                  className="ms-2"
                                                /> */}
                                              </li>
                                              {/* <li>
                                            False
                                            <img
                                              src={
                                                user
                                                  ?.training_question_answer[0]
                                                  ?.option_id ===
                                                user
                                                  ?.training_user_submited_answer[0]
                                                  ?.option_id
                                                  ? correctAsset
                                                  : wrongAsset
                                              }
                                              width="14px"
                                              height="14px"
                                              alt=""
                                              className="ms-2"
                                            />
                                          </li> */}
                                            </ul>
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : null}
                                </td>
                                <td>
                                  <div className="d-flex justify-content-around">
                                    <div className="d-flex justify-content-center align-items-center text-center flex-column">
                                      <div className="d-flex align-items-center gap-1">
                                        <div
                                          style={{
                                            width: 30,
                                            height: 30,
                                          }}
                                        >
                                          <CircularProgressbar
                                            value={pass}
                                            text={`${pass}%`}
                                            className="passProgressBar"
                                          />
                                        </div>
                                        <div>
                                          <p className="para11">99%</p>
                                          <p
                                            className="para11"
                                            style={{
                                              color: "#838383",
                                            }}
                                          >
                                            {data.right_count_count}
                                          </p>
                                        </div>
                                      </div>

                                      <p
                                        className="para11 "
                                        style={{
                                          color: "#838383",
                                        }}
                                      >
                                        Total users <br />
                                        passed the question
                                      </p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center text-center flex-column">
                                      <div className="d-flex align-items-center gap-1">
                                        <div
                                          style={{
                                            width: 30,
                                            height: 30,
                                          }}
                                        >
                                          <CircularProgressbar
                                            value={fail}
                                            text={`${fail}%`}
                                            className="failProgressBar"
                                          />
                                        </div>
                                        <div>
                                          <p className="para11">1%</p>
                                          <p
                                            className="para11"
                                            style={{
                                              color: "#838383",
                                            }}
                                          >
                                            {data.wrong_count_count}
                                          </p>
                                        </div>
                                      </div>
                                      <p
                                        className="para11 "
                                        style={{
                                          color: "#838383",
                                        }}
                                      >
                                        Total users failed <br />
                                        to pass the question
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })}

              {/* <Accordion.Item eventKey="1">
          <Accordion.Header className="backgroundred">
            Q2. Lorem ipsum dolor sit amet, consectetur adipiscing elit
            ?
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div>
                      <ul className="trueFalse">
                        <li style={{ color: "#2C8EFF" }}>
                          True
                          <img
                            src={wrongAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          False
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header className="backgroundblue">
            Q1. Lorem ipsum dolor sit amet, consectetur adipiscing elit
            ?
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div>
                      <ul className="trueFalse">
                        <li style={{ color: "#2C8EFF" }}>
                          Simple answer
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>BlaBlaBla BlaBlaBla</li>
                        <li style={{ color: "#2C8EFF" }}>
                          BlaBlaBla
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>TextTextText Text</li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header className="backgroundred">
            Q2. Lorem ipsum dolor sit amet, consectetur adipiscing elit
            ?
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div>
                      <ul className="trueFalse">
                        <li style={{ color: "#2C8EFF" }}>
                          Simple answer
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li style={{ color: "#2C8EFF" }}>
                          BlaBlaBla BlaBlaBla
                          <img
                            src={wrongAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          BlaBlaBla
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>TextTextText Text</li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header className="backgroundblue">
            Q1. Rank the following items, first being the most
            important:
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div>
                      <ul className="trueFalse numbers">
                        <li>
                          Simple answer
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          {" "}
                          BlaBlaBla1
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          BlaBlaBla2
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          TextTextText Text
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header className="backgroundred">
            Q2. Rank the following items, first being the most
            important:
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div>
                      <ul className="trueFalse numbers">
                        <li>
                          Simple answer
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                        <li>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">BlaBlaBla1</p>
                            <img
                              src={wrongAsset}
                              width="14px"
                              height="14px"
                              alt=""
                              className="ms-2"
                            />
                            <p className="mb-0 correctAns">
                              BlaBlaBla2
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">BlaBlaBla2</p>
                            <img
                              src={wrongAsset}
                              width="14px"
                              height="14px"
                              alt=""
                              className="ms-2"
                            />
                            <p className="mb-0 correctAns">
                              BlaBlaBla1
                            </p>
                          </div>
                        </li>
                        <li>
                          TextTextText Text
                          <img
                            src={correctAsset}
                            width="14px"
                            height="14px"
                            alt=""
                            className="ms-2"
                          />
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header className="backgroundblue">
            Q1. Drag and drop the correct answer to the blank field of
            each item:
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div className=" d-flex justify-content-center align-items-center flex-column">
                      <div>
                        <img
                          src={handleSubmit(() => onSubmit("Buy"))}
                          width="139px"
                          height="92px"
                          alt=""
                        />
                      </div>
                      <div>
                        <div
                          className="trueFalseBorder mt-2 "
                          style={{ height: "auto", width: "139px" }}
                        >
                          <ul className="trueFalse">
                            <li
                              className="mt-1 mb-1"
                              style={{ color: "#2C8EFF" }}
                            >
                              <div className="d-flex">
                                <p className="mb-0">Text</p>
                                <img
                                  src={correctAsset}
                                  width="14px"
                                  height="14px"
                                  alt=""
                                  className="me-2 ms-auto"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
                      <div>
                        <img
                          src={cuationAsset}
                          width="139px"
                          height="92px"
                          alt=""
                        />
                      </div>
                      <div>
                        <div
                          className="trueFalseBorder mt-2 "
                          style={{ height: "auto", width: "139px" }}
                        >
                          <ul className="trueFalse">
                            <li
                              className="mt-1 mb-1"
                              style={{ color: "#2C8EFF" }}
                            >
                              <div className="d-flex">
                                <p className="mb-0">Text</p>
                                <img
                                  src={correctAsset}
                                  width="14px"
                                  height="14px"
                                  alt=""
                                  className="me-2 ms-auto"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header className="backgroundred">
            Q2. Rank the following items, first being the most
            important:
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div className=" d-flex justify-content-center align-items-center flex-column">
                      <div>
                        <img
                          src={cuationAsset}
                          width="139px"
                          height="92px"
                          alt=""
                        />
                      </div>
                      <div>
                        <div
                          className="trueFalseBorder mt-2 "
                          style={{ height: "auto", width: "139px" }}
                        >
                          <ul className="trueFalse">
                            <li
                              className="mt-1 mb-1"
                              style={{ color: "#2C8EFF" }}
                            >
                              <div className="d-flex">
                                <p className="mb-0">Text</p>
                                <img
                                  src={correctAsset}
                                  width="14px"
                                  height="14px"
                                  alt=""
                                  className="me-2 ms-auto"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
                      <div>
                        <img
                          src={cuationAsset}
                          width="139px"
                          height="92px"
                          alt=""
                        />
                      </div>
                      <div>
                        <div
                          className="trueFalseBorder mt-2 "
                          style={{ height: "auto", width: "139px" }}
                        >
                          <ul className="trueFalse">
                            <li
                              className="mt-1 mb-1"
                              style={{ color: "#2C8EFF" }}
                            >
                              <div className="d-flex">
                                <p className="mb-0">Text</p>
                                <img
                                  src={wrongAsset}
                                  width="14px"
                                  height="14px"
                                  alt=""
                                  className="me-2 ms-auto"
                                />
                              </div>
                            </li>
                            <li className="mt-1 mb-1">
                              <div className="d-flex">
                                <p className="mb-0">Text</p>
                                <img
                                  src={correctAsset}
                                  width="14px"
                                  height="14px"
                                  alt=""
                                  className="me-2 ms-auto"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header className="backgroundblue">
            Q2. Rank the following items, first being the most
            important:
          </Accordion.Header>
          <Accordion.Body>
            <Table>
              <thead className="traningDetailAccordianTableHead">
                <tr>
                  <th>Result</th>
                  <th>Avg score</th>
                </tr>
              </thead>
              <tbody className="traningDetailAccordianTableBody">
                <tr>
                  <td>
                    <div className="d-flex">
                      <label className="modal_label">Answer:</label>
                      <p
                        className="para12 ms-auto"
                        style={{ color: "#7C7C7C" }}
                      >
                        Score :{" "}
                        <span style={{ color: "#2C8EFF" }}> 6pts </span>
                      </p>
                    </div>

                    <div className="userAnsTextarea">
                      <textarea className="w-100">
                        A HSE Management System is an integrated
                        approach where all the 3 HSE factors are
                        effectively managed to reduce risks in the
                        workplace. The objective of a Safety Management
                        System is to provide a structured management
                        approach to control safety risks.
                      </textarea>
                    </div>

                    <div className="mt-3">
                      <label className="modal_label">
                        Trainer comment:
                      </label>
                    </div>

                    <div className="userAnsTextarea">
                      <textarea className="w-100">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                      </textarea>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={pass}
                              text={`${pass}%`}
                              className="passProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">99%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              150
                            </p>
                          </div>
                        </div>

                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users <br />
                          passed the question
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <div style={{ width: 30, height: 30 }}>
                            <CircularProgressbar
                              value={fail}
                              text={`${fail}%`}
                              className="failProgressBar"
                            />
                          </div>
                          <div>
                            <p className="para11">1%</p>
                            <p
                              className="para11"
                              style={{ color: "#838383" }}
                            >
                              2
                            </p>
                          </div>
                        </div>
                        <p
                          className="para11 "
                          style={{ color: "#838383" }}
                        >
                          Total users failed <br />
                          to pass the question
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          {/* <Button label="Cancel" buttonStyle="cancel mr-2" onClick={props.traningDetailModalHandler} />
                    <Button label="Add" buttonStyle="createbtn pe-3 ps-3" /> */}

          <div className="col-6">
            <div className="d-flex">
              <div className="d-flex gap-2 align-items-center">
                <img
                  src={
                    getTrainingDetails?.training_detail?.training?.image ||
                    notFoundAsset
                  }
                  alt=""
                  width="25px"
                  height="25px"
                />
                <p
                  className="mb-0 fs-12 fw-500"
                  style={{ color: "#2C8EFF", textDecorationLine: "underline" }}
                >
                  {getTrainingDetails?.training_detail?.training?.name}
                </p>
              </div>

              <div className="ml-auto">
                <img
                  src={downloadgreenAsset}
                  alt=""
                  className="pointer"
                  onClick={handleDownloadTrainingCertificate}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex">
              <div className="d-flex gap-2 align-items-center">
                <img
                  src={printerBrownAsset}
                  alt=""
                  width="17px"
                  height="16px"
                  className="pointer"
                  onClick={handlePrint}
                />
              </div>

              <div className="ml-auto">
                <div className="d-flex gap-4 ">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={greenLikeAsset}
                      alt=""
                      width="14px"
                      height="14.42px"
                    />
                    <p className="fs-14" style={{ color: "green" }}>
                      {getTrainingDetails?.training_detail?.quiz_took_time ||
                        "—"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <p className="fs-12 fw-500 " style={{ color: "#B3B3B3" }}>
                      {(keywordTranslation && keywordTranslation["status"]) ||
                        langKey.status}
                      :
                    </p>
                    <img
                      src={
                        getTrainingDetails?.training_detail.status === "failed"
                          ? statusfailedAsset
                          : statusGreenAsset
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default TraningDetailModal;
