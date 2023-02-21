import React, { useEffect, useRef, useState } from "react";
import "../WorkerArea.css";
import {
  backarrow1Asset,
  crossRedCircleAsset,
  dragImgAsset,
  infoAsset,
  notFoundAsset,
  whiteForwordArrowAsset,
} from "../../../assets";
import SaveButton from "../../../components/Button/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import AccountVerification from "./AccountVerification";
import {
  useGetSingleTrainingListQuery,
  useWorkerSubmitQuizMutation,
} from "../../../services/api";
import { toast } from "react-toastify";
import paths from "../../../routes/paths";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import langKey from "../../../localization/locale.json";
import { useSelector } from "react-redux";
import { Camera } from "react-camera-pro";
import LockedModal from "../../adminArea/tranings/LockedModal";
import TimeCounter from "./TimeCounter";

const TrueFalse = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  let [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [freeText, setFreeText] = useState([]);
  const [dragAndDropQuestion, setDragAndDropQuestion] = useState([]);
  const [sortQuestion, setSortQuestion] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [falseActive, setFalseActive] = useState("");
  const [checkedOptionIndexes, setCheckedOptionIndexes] = useState([]);
  const [text, setText] = useState("");
  const [nextOption, setNextOption] = useState(false);
  const [disableOption, setDisableOption] = useState(false);

  let [cameraMessege, setCameraMessege] = useState("");

  const [dragAndDropInteractiveSubmit, setDragAndDropInteractiveSubmit] =
    useState([]);

  const [sortAbleOptions, setSortAbleOptions] = useState(
    state?.questions?.training?.question[questionIndex].question_option
  );

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [quiz, setQuiz] = useState([]);

  const [dragAndDropInteractive, setDragAndDropInteractive] = useState([]);

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListQuery(state?.questions?.training.id);

  let hms = getSingleTrainingList?.training.time_per_q;
  let a = hms?.split(":");
  let second = getSingleTrainingList ? +a[0] * 60 * 60 + +a[1] * 60 + +a[2] : 1;

  // useEffect(() => {
  //   let hi = getSingleTrainingList?.training.time_per_q?.split(":")
  //   let we = getSingleTrainingList && +hi[0] * 60 * 60 + +hi[1] * 60 + +hi[2]
  //   setTimer(we);
  // });

  const radioHandler = (data, falseActive) => {
    setFalseActive(falseActive);
    setDisableOption(true);
    if (nextQuestion) {
      setQuestion([
        ...question,
        {
          questionId:
            getSingleTrainingList?.training.question[questionIndex].id,
          optionId: data.id,
        },
      ]);
    } else {
      setQuestion([
        {
          questionId:
            getSingleTrainingList?.training.question[questionIndex].id,
          optionId: data.id,
        },
      ]);
    }
  };

  const radioMultipleChoiceHandler = (data, falseActive, checked) => {
    setFalseActive(falseActive);
    setNextOption(false);
    setDisableOption(true);
    checked
      ? checkedOptionIndexes.push(falseActive)
      : checkedOptionIndexes.splice(falseActive, 1);

    if (checked) {
      setQuestion([
        ...question,
        {
          questionId:
            getSingleTrainingList?.training.question[questionIndex].id,
          optionId: data.id,
        },
      ]);
    } else {
      setQuestion(
        question.filter((arrayItem) => arrayItem.optionId !== data.id)
      );
      var index = checkedOptionIndexes.indexOf(falseActive);
      if (index !== -1) {
        checkedOptionIndexes.splice(index, 1);
      }
    }
  };

  const textAreaHandler = (value) => {
    setText(value);
    setDisableOption(true);
    if (nextQuestion) {
      setFreeText([
        {
          questionId:
            getSingleTrainingList?.training.question[questionIndex].id,
          optionId: value,
        },
      ]);
    } else {
      setFreeText([
        {
          questionId:
            getSingleTrainingList?.training.question[questionIndex].id,
          optionId: value,
        },
      ]);
    }
  };

  const [
    workerSubmitQuiz,
    {
      isSuccess: addTopicsSuccess,
      isLoading: addTopicsLoading,
      isFetching: addTopicsFetching,
      error: addTopicsError,
      reset: addTopicsReset,
    },
  ] = useWorkerSubmitQuizMutation();

  const handleNextQuestion = () => {
    if (cameraMessege) {
    } else {
      if (getSingleTrainingList?.training.webcam === 1) {
        setImage(camera.current.takePhoto());
      }
    }

    freeText.map((text) => {
      quiz.push({
        questionId: text.questionId,
        optionId: text.optionId,
      });
    });

    if (questionIndex + 1 === getSingleTrainingList?.training.question.length) {
      setShow(true);
      quiz.filter(
        (a, i) => quiz.findIndex((s) => a.optionId === s.optionId) === i
      );
    } else {
      setDisableOption(!disableOption);
      setCheckedOptionIndexes([]);
      setQuestionIndex(questionIndex + 1);
      setNextQuestion(true);
      setFalseActive("");
      setNextOption(true);
      setText("");
      setSortAbleOptions(
        getSingleTrainingList?.training.question[questionIndex + 1]
          .question_option
      );
      if (
        getSingleTrainingList?.training.question[questionIndex]
          .questions_type === "3"
      ) {
        setSortQuestion([]);
      } else if (
        getSingleTrainingList?.training.question[questionIndex]
          .questions_type === "5"
      ) {
        let row = [...dragAndDropInteractiveSubmit];
        row.forEach((data) => {
          return (data.mydata.destination_data.answer = "");
        });
      }
    }
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(sortAbleOptions);

    let [source_data] = tempData.splice(e?.source?.index, 1);
    tempData.splice(e?.destination?.index, 0, source_data);

    // setQuestion([...question, { source_data }]);
    setSortQuestion([...sortQuestion, { source_data }]);
    setDragAndDropQuestion([...dragAndDropQuestion, { source_data }]);
    setDisableOption(true);

    let list = [...sortAbleOptions];
    list.splice(e?.source?.index, 1);
    setSortAbleOptions(list);
  };

  const handleDragEndInteractive = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(sortAbleOptions);
    setDisableOption(true);

    let [source_data] = tempData.splice(e?.source?.index, 1);
    tempData.splice(e?.destination?.index, 0, source_data);

    let row = [...dragAndDropInteractive];
    row[e?.destination?.index].answer = source_data.name;
    setDragAndDropInteractive(row);

    let mydata = {
      source_data,
      destination_data: dragAndDropInteractive[e?.destination?.index],
    };

    setDragAndDropInteractiveSubmit([
      ...dragAndDropInteractiveSubmit,
      {
        mydata,
      },
    ]);

    let list = [...sortAbleOptions];
    list.splice(e?.source?.index, 1);
    setSortAbleOptions(list);
  };

  const handleSubmitQuiz = (data) => {
    const formData = new FormData();

    let unique = quiz.filter(
      (a, i) => quiz.findIndex((s) => a.optionId === s.optionId) === i
    );

    if (data) {
      formData.append(`training_id`, getSingleTrainingList?.training.id);

      unique?.map((items, index) => {
        formData.append(
          `question[${index}][time_calculated]`,
          getSingleTrainingList?.training.time_per_q
        );
        formData.append(`question[${index}][id]`, items.questionId);
        formData.append(
          `question[${index}][option_id][${index}][option]`,
          items.optionId
        );
        if (items.image) {
          formData.append(
            `question[${index}][option_id][${index}][image]`,
            items.image
          );
        }
      });

      // if (
      //   getSingleTrainingList?.training.question[questionIndex]
      //     .questions_type === "3"
      // ) {
      //   dragAndDropQuestion.map((item, index) => {
      //     formData.append(
      //       `question[${index}][time_calculated]`,
      //       getSingleTrainingList?.training.time_per_q
      //     );
      //     formData.append(
      //       `question[${index}][id]`,
      //       item.source_data.training_question_id
      //     );

      //     formData.append(
      //       `question[${index}][option_id][${index}][option]`,
      //       item.source_data.id
      //     );
      //   });
      // } else if (
      //   getSingleTrainingList?.training.question[questionIndex]
      //     .questions_type === "5"
      // ) {
      //   dragAndDropInteractiveSubmit.map((item, index) => {
      //     formData.append(
      //       `question[${index}][time_calculated]`,
      //       getSingleTrainingList?.training.time_per_q
      //     );
      //     formData.append(
      //       `question[${index}][id]`,
      //       item?.mydata.source_data.training_question_id
      //     );

      //     formData.append(
      //       `question[${index}][option_id][${index}][option]`,
      //       item?.mydata.source_data.id
      //     );

      //     formData.append(
      //       `question[${index}][option_id][${index}][image]`,
      //       item?.mydata.destination_data.id
      //     );
      //   });
      // } else {
      //   question.map((item, index) => {
      //     formData.append(
      //       `question[${index}][time_calculated]`,
      //       getSingleTrainingList?.training.time_per_q
      //     );
      //     formData.append(`question[${index}][id]`, item.questionId);
      //     formData.append(
      //       `question[${index}][option_id][${index}][option]`,
      //       item.optionId
      //     );
      //   });
      // }

      workerSubmitQuiz(formData)
        .unwrap()
        .then((payload) => {
          setShow(false);
          navigate(
            payload.data.message.includes("FAILS")
              ? paths.failedQuiz
              : payload.data.message.includes("under")
              ? paths.underReview
              : paths.passedQuiz,
            { state: { payload } }
          );
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["invalidPin"]) ||
          langKey.invalidPin
      );
    }
  };

  const VerificatonModalHandler = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    getSingleTrainingRefetch();
    setDragAndDropInteractive(
      state?.questions?.training?.question[questionIndex].question_option
    );
  }, [getSingleTrainingList, question, sortAbleOptions, questionIndex]);

  useEffect(() => {
    dragAndDropQuestion?.map((sort) => {
      quiz.push({
        questionId: sort.source_data.training_question_id,
        optionId: sort.source_data.id,
      });
    });
  }, [dragAndDropQuestion]);

  useEffect(() => {
    dragAndDropInteractiveSubmit?.map((interactive) => {
      quiz.push({
        questionId: interactive?.mydata.source_data.training_question_id,
        optionId: interactive?.mydata.source_data.id,
        image: interactive?.mydata.destination_data.id,
      });
    });
  }, [dragAndDropInteractiveSubmit]);

  useEffect(() => {
    question?.map((ques) => {
      quiz.push({
        questionId: ques?.questionId,
        optionId: ques?.optionId,
      });
    });
  }, [question]);

  const quizPer = (
    (questionIndex / getSingleTrainingList?.training.question.length) *
    100
  ).toFixed(0);

  let errorMessages = {
    noCameraAccessible: cameraMessege,
    // permissionDenied: 'Permission denied. Please refresh and give camera permission.',
    // switchCamera:
    //   'It is not possible to switch camera to different one because there is only one video device accessible.',
    // canvas: 'Canvas is not supported.',
  };

  const handleCancel = () => {
    setShowConfirmationModal((prev) => !prev);
  };

  const detectWebcam = (callback) => {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then((devices) => {
      callback(devices.some((device) => "videoinput" === device.kind));
    });
  };

  detectWebcam(function (hasWebcam) {
    hasWebcam
      ? setCameraMessege("")
      : setCameraMessege("No camera device accessible.");
  });

  return (
    <>
      {show && (
        <AccountVerification
          show={show}
          handleCloseVerificationModal={VerificatonModalHandler}
          action={handleSubmitQuiz}
        />
      )}

      {showConfirmationModal && (
        <LockedModal
          confirmatonText={
            (keywordTranslation && keywordTranslation["confirmationText"]) ||
            langKey.confirmationText
          }
          handleCancel={handleCancel}
        />
      )}

      <div className="mt-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="col-12 main-div mb-5">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={backarrow1Asset}
                  width="14px"
                  height="14.7px"
                  className="pointer"
                  onClick={handleCancel}
                />
                <p className="working-at-height">
                  {(keywordTranslation && keywordTranslation["quiz"]) ||
                    langKey.quiz}{" "}
                  {getSingleTrainingList?.training.name}
                </p>
                {/* <div
                  className="d-flex align-items-center justify-content-center"
                  // style={
                  //  {second < 10 ?  background: "#47CA5B" : background: "#47CA5B"},
                  //   {borderRadius: "5px"},
                  //   height: "22px",
                  // }

                  style={
                    timer > 10
                      ? {
                          background: "#EF3C3C",
                          borderRadius: "5px",
                          height: "22px",
                        }
                      : {
                          background: "#47CA5B",
                          borderRadius: "5px",
                          height: "22px",
                        }
                  }
                >
                  <p className="fs-14 fw-500 text-white p-2">
                    <Countdown daysInHours date={Date.now() + second * 1000} />
                  </p>
                  <p></p>
                </div> */}
                <TimeCounter getSingleTrainingList={getSingleTrainingList} />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="d-flex align-items-center gap-2 quizprogressbar">
                <ProgressBar now={quizPer} className="w-100" />
                <div
                  className="quizpercentage fs-13 fw-500"
                  style={{ color: "#B1B1B1" }}
                >
                  {`${quizPer}%`}
                </div>
              </div>
            </div>

            {cameraMessege ? (
              <div className="d-flex justify-content-end">
                <img src={crossRedCircleAsset} />
                <p className="ml-2 mt-3">{cameraMessege}</p>
              </div>
            ) : (
              <>
                {getSingleTrainingList?.training.webcam === 1 && (
                  <Camera ref={camera} errorMessages={errorMessages} />
                )}
              </>
            )}
          </div>
          {getSingleTrainingList?.training.question[questionIndex]
            .questions_type === "1" ? (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-9">
                <center>
                  <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                    {
                      getSingleTrainingList?.training.question[questionIndex]
                        .name
                    }
                  </h3>
                  <img
                    src={
                      getSingleTrainingList?.training.question[questionIndex]
                        .image || notFoundAsset
                    }
                    className="mt-3 mb-2"
                    width="356px"
                    height="188px"
                    alt=""
                  />
                  <p className="fs-11 fw-500 mt-1" style={{ color: "#FACB16" }}>
                    {(keywordTranslation && keywordTranslation["question"]) ||
                      langKey.question}{" "}
                    {questionIndex + 1}{" "}
                    {(keywordTranslation && keywordTranslation["of"]) ||
                      langKey.of}{" "}
                    {getSingleTrainingList?.training.question.length}
                  </p>
                </center>
              </div>
              <div className="col-lg-8 mt-5 ">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="d-flex">
                      {getSingleTrainingList?.training.question[
                        questionIndex
                      ].question_option?.map((option, index) => {
                        return (
                          <div className="col-lg-12 col-md-12">
                            <div className="d-flex">
                              <div
                                className="d-flex p-2  gap-2 w-100 quesDiv"
                                style={{
                                  borderColor:
                                    falseActive === index ? "#47CA5B" : "",
                                  color: falseActive ? "#6B6B6B" : "",
                                }}
                              >
                                <input
                                  type="radio"
                                  name="true"
                                  id=""
                                  className="mcqs mcqsCheckbox"
                                  // onClick={falseHandleClick}
                                  checked={falseActive === index}
                                  onClick={(e) => {
                                    radioHandler(option, index);
                                    // setOptionId(option.id);
                                  }}
                                />
                                <p
                                  className="fs-15 fw-500"
                                  style={{ color: "#6B6B6B" }}
                                >
                                  {option.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : getSingleTrainingList?.training.question[questionIndex]
              .questions_type === "2" ? (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-9">
                <center>
                  <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                    {
                      getSingleTrainingList?.training.question[questionIndex]
                        .name
                    }
                  </h3>

                  <p className="fs-11 fw-500 mt-1" style={{ color: "#FACB16" }}>
                    {(keywordTranslation && keywordTranslation["question"]) ||
                      langKey.question}{" "}
                    {questionIndex + 1}{" "}
                    {(keywordTranslation && keywordTranslation["of"]) ||
                      langKey.of}{" "}
                    {getSingleTrainingList?.training.question.length}
                  </p>
                </center>
              </div>

              <div className="col-lg-8 mt-5 ">
                <div className="row">
                  {getSingleTrainingList?.training.question[
                    questionIndex
                  ].question_option?.map((option, index) => {
                    return (
                      <div className="col-lg-6 col-md-6 mt-3">
                        <>
                          <div>
                            <img
                              src={option.image || notFoundAsset}
                              width="100%"
                              height="100px"
                              className="rounded mb-2"
                              alt=""
                            />
                          </div>

                          <div className="d-flex">
                            <div
                              className="d-flex p-2  gap-2 w-100 quesDiv"
                              style={{
                                borderColor: checkedOptionIndexes?.includes(
                                  index
                                )
                                  ? "#47CA5B"
                                  : "",
                                // color: falseActive ? "#6B6B6B" : "",
                              }}
                            >
                              <input
                                type="checkbox"
                                name=""
                                // id={index === falseActive}
                                // className={
                                //   nextOption
                                //     ? "mcqs mcqsCheckboxNext"
                                //     : "mcqs mcqsCheckbox"
                                // }
                                className="mcqsCheckbox"
                                checked={checkedOptionIndexes?.includes(index)}
                                onClick={(e) => {
                                  radioMultipleChoiceHandler(
                                    option,
                                    index,
                                    e.target.checked
                                  );
                                  // setOptionId(option.id);
                                }}
                              />
                              <p
                                className="fs-12 fw-500"
                                style={{ color: "#6B6B6B" }}
                              >
                                {option.name}
                              </p>
                            </div>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : getSingleTrainingList?.training.question[questionIndex]
              .questions_type === "3" ? (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-9">
                <center>
                  <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                    {
                      getSingleTrainingList?.training.question[questionIndex]
                        .name
                    }
                  </h3>
                  <p className="fs-11 fw-500 mt-1" style={{ color: "#FACB16" }}>
                    {(keywordTranslation && keywordTranslation["question"]) ||
                      langKey.question}{" "}
                    {questionIndex + 1}{" "}
                    {(keywordTranslation && keywordTranslation["of"]) ||
                      langKey.of}{" "}
                    {getSingleTrainingList?.training.question.length}
                  </p>
                </center>
              </div>
              <div className="col-lg-8 mt-5 ">
                <div className="row justify-content-center gap-5">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div
                          className="col-lg-3 border  pb-2 rounded"
                          ref={provided.innerRef}
                        >
                          {sortAbleOptions?.map((option, index) => (
                            <Draggable
                              key={option.id}
                              draggableId={option.name}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="d-flex align-items-center p-2 border rounded mt-2"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p
                                    className="fs-12 fw-500"
                                    style={{ color: "#6B6B6B" }}
                                  >
                                    {option.name}
                                  </p>
                                  <img
                                    src={dragImgAsset}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    width="8px"
                                    height="13px"
                                    alt=""
                                    className="ml-auto"
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                      {(provided) => (
                        <div
                          className="col-lg-3 border p-2 d-flex flex-column"
                          ref={provided.innerRef}
                          style={{ gap: "10px" }}
                        >
                          {sortQuestion.map((option, index) => (
                            <Draggable
                              key={option.source_data.id}
                              draggableId={option.source_data.name}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="d-flex align-items-center p-2 border rounded "
                                  ref={provided.innerRef}
                                >
                                  <p
                                    className="fs-12 fw-500"
                                    style={{ color: "#6B6B6B" }}
                                  >
                                    {option.source_data.name}
                                  </p>
                                  <img
                                    src={dragImgAsset}
                                    width="8px"
                                    height="13px"
                                    alt=""
                                    className="ml-auto"
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </div>
          ) : getSingleTrainingList?.training.question[questionIndex]
              .questions_type === "4" ? (
            <div className="row justify-content-center mt-5">
              {/* <div className="col-lg-9">
                <center>
                  <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                    {
                      getSingleTrainingList?.training.question[questionIndex]
                        .name
                    }
                  </h3>
                  <p className="fs-11 fw-400" style={{ color: "#9C9C9C" }}>
                    {(keywordTranslation && keywordTranslation["youHave"]) ||
                      langKey.youHave}{" "}
                    {getSingleTrainingList?.remaining_attempted} {""}
                    {(keywordTranslation &&
                      keywordTranslation["RemainingAttempts"]) ||
                      langKey.RemainingAttempts}
                  </p>
                </center>
              </div> */}
              <div className="col-lg-7">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="8"
                  className="w-100 quizTextArea"
                  placeholder="Type here.."
                  value={text}
                  onChange={(e) => textAreaHandler(e.target.value)}
                ></textarea>
              </div>
            </div>
          ) : getSingleTrainingList?.training.question[questionIndex]
              .questions_type === "5" ? (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-9">
                <center>
                  <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                    {
                      getSingleTrainingList?.training.question[questionIndex]
                        .name
                    }
                  </h3>
                  <p className="fs-11 fw-500 mt-1" style={{ color: "#FACB16" }}>
                    {(keywordTranslation && keywordTranslation["question"]) ||
                      langKey.question}{" "}
                    {questionIndex + 1}{" "}
                    {(keywordTranslation && keywordTranslation["of"]) ||
                      langKey.of}{" "}
                    {getSingleTrainingList?.training.question.length}
                  </p>
                </center>
              </div>
              <DragDropContext onDragEnd={handleDragEndInteractive}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div className="col-lg-10 mt-5 ">
                      <div className="d-flex gap-3" ref={provided.innerRef}>
                        {sortAbleOptions?.map((option, index) => (
                          <Draggable
                            key={option.id}
                            draggableId={option.name}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className=""
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div
                                  className="d-flex align-items-center justify-content-center p-2 border rounded mt-2 "
                                  style={{ width: "max-content" }}
                                >
                                  <p
                                    className="fs-12 fw-500 pl-3 pr-3 pt-1 pb-1"
                                    style={{
                                      color: "#6B6B6B",
                                      width: "max-content",
                                    }}
                                  >
                                    {option.name}
                                  </p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>

                <div className="col-lg-10 mt-5 ">
                  <div className="row">
                    {state.questions.training.question[
                      questionIndex
                    ].question_option?.map((option, index) => (
                      <div className="col-lg-3 col-md-6 mt-3">
                        <img
                          src={option.image || notFoundAsset}
                          width="100%"
                          height="140px"
                          alt=""
                          className="border"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="col-lg-10">
              <div className="row">
                {draggedData?.map((option, index) => (
                  <div className="col-lg-3 col-md-6 mt-3">
                    <div className="dropItemDiv"></div>
                  </div>
                ))}
              </div>
            </div> */}

                <div className="col-lg-10 ">
                  <div className="row">
                    {dragAndDropInteractive.map((option, index) => {
                      return (
                        <Droppable droppableId={option.name}>
                          {(provided) => (
                            <div
                              className="col-lg-3 col-md-6 mt-3"
                              ref={provided.innerRef}
                            >
                              <Draggable
                                key={option.id}
                                draggableId={index + ""}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="dropItemDiv"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                  >
                                    {option.answer}
                                  </div>
                                )}
                              </Draggable>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      );
                    })}
                  </div>
                </div>
              </DragDropContext>
            </div>
          ) : null}

          <div className="col-lg-12 mt-5">
            <div className="border-bottom d-flex justify-content-center"></div>

            <div className="d-flex mt-3">
              <SaveButton
                label={
                  questionIndex + 1 ===
                  getSingleTrainingList?.training.question.length
                    ? (keywordTranslation && keywordTranslation["submit"]) ||
                      langKey.submit
                    : (keywordTranslation &&
                        keywordTranslation["nextQuestion"]) ||
                      langKey.nextQuestion
                }
                buttonStyle={` ${
                  !disableOption ? "addnew_btn_disable" : "addnew_btn"
                } pl-3 pr-3 ml-auto `}
                icon={whiteForwordArrowAsset}
                imgStyle="nextQuestionArrow"
                onClick={handleNextQuestion}
                disabled={!disableOption}
                // #75a5dd
              />
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
              {getSingleTrainingList?.remaining_attempted} {""}
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

export default TrueFalse;
