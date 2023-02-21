import React from "react";
import ModalComponent from "../../../components/Model/Model";
import Button from "../../../components/Button/Button";
import { Modal, Accordion } from "react-bootstrap";
import {
  crossAsset,
  greenCircleTickAsset,
  iconAsset,
  notFoundAsset,
  orangeTimeAsset,
  passedIconAsset,
  passsingScoreAsset,
  profilePageAsset,
} from "../../../assets";
import { useState } from "react";
import ScoreConfirmantionModal from "./ScoreConfirmantionModal";
import { useTeacherTrainingQuestionQuery } from "../../../services/api";
import SearchableDropdown from "../../../components/searchDropdown/SearchableDropdown";
import { useSelector } from "react-redux";
import langkey from "../../../localization/locale.json";

const CorrectionAssignmentDetialModal = (props) => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreValue, setScoreValue] = useState(0);
  const [freeQuestion, setFreeQuestion] = useState("");

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const ScoreModalHandler = (data) => {
    setShowScoreModal((Prev) => !Prev);
    setFreeQuestion(data);
  };

  const responseHandler = (data) => {
    console.log(data)
    setScoreValue(data?.mark)
  }

  const {
    data: teacherTrainingQuestion,
    isSuccess: teacherTrainingQuestionSuccess,
    isLoading: teacherTrainingQuestionLoading,
    isFetching: teacherTrainingQuestionFetching,
    error: teacherTrainingQuestionError,
    reset: teacherTrainingQuestionReset,
    refetch: teacherTrainingQuestionRefetch,
  } = useTeacherTrainingQuestionQuery({ id: props?.training.training?.id });

  const score = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ];

  return (
    <>
      <ModalComponent
        size="md"
        show={true}
        handleClose={props.correctAssignmentModalClose}
        title="Correction Assignments Details"
        className="assigmentDetail"
      >
        <Modal.Body className="overflow" style={{ height: "70vh" }}>
          <div className="row">
            <div className="col-lg-12">
              <p className="fs-11 fw-400" style={{ color: "#AEAEAE" }}>
                {(keywordTranslation && keywordTranslation["userAnswer"]) ||
                  langkey.userAnswer}
              </p>
            </div>
            <div className="col-lg-12">
              {teacherTrainingQuestion?.data?.map((data) => {
                return (
                  <>
                    {data?.question?.map((question, index) => {
                      return (
                        <Accordion defaultActiveKey={index}>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header className="assignmentHeader">
                              <h4
                                className="fs-13 fw-600"
                                style={{ color: "#6B6B6B" }}
                              >
                                {(keywordTranslation &&
                                  keywordTranslation["question"]) ||
                                  langkey.question}{" "}
                                {index + 1}
                              </h4>
                              <div className="d-flex gap-2 align-items-center uncorrect">
                                {data.status !== 0 && (
                                  <p
                                    style={{
                                      color: "#6B6B6B",
                                      marginTop: "15px",
                                    }}
                                  >
                                    {scoreValue} pts
                                  </p>
                                )}

                                <img
                                  src={
                                    data.status === 0
                                      ? orangeTimeAsset
                                      : greenCircleTickAsset
                                  }
                                  width="14px"
                                  height="14px"
                                  alt=""
                                />
                                <p
                                  className="mb-0 fs-12 fw-500"
                                  style={
                                    data.status === 0
                                      ? { color: "#FF7A00" }
                                      : { color: "#47CA5B" }
                                  }
                                >
                                  {data.status === 0
                                    ? (keywordTranslation &&
                                        keywordTranslation["unCorrect"]) ||
                                      langkey.unCorrect
                                    : (keywordTranslation &&
                                        keywordTranslation["correct"]) ||
                                      langkey.correct}
                                </p>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body className="pl-3 pr-3 pt-2 pb-2">
                              <div className="d-flex align-items-center">
                                <h4
                                  className="fs-13 fw-550"
                                  style={{ width: "60%" }}
                                >
                                  {question?.name}
                                </h4>
                                <div className="d-flex align-items-center gap-2 ml-auto">
                                  <p className="fs-12 fw-500">
                                    {(keywordTranslation &&
                                      keywordTranslation["scoreValue"]) ||
                                      langkey.scoreValue}
                                  </p>

                                  <div className="scoreValue">
                                    <SearchableDropdown
                                      placeholder="0"
                                      selectedValue={
                                        question?.teacher_check &&
                                        question?.teacher_check.mark
                                      }
                                      options={score}
                                      changeHandler={(value) => {
                                        setScoreValue(value);
                                      }}
                                    />
                                  </div>
                                  <Button
                                    label={
                                      question?.teacher_check
                                        ? "Edit"
                                        : "Confirm"
                                    }
                                    buttonStyle="confirm-btn"
                                    onClick={() => ScoreModalHandler(question)}
                                  />
                                  {showScoreModal && (
                                    <ScoreConfirmantionModal
                                      scoreValue={scoreValue}
                                      ScoreModalHandler={() =>
                                        ScoreModalHandler()
                                      }
                                      tt_id={props?.training?.id}
                                      teacherTrainingQuestion={freeQuestion}
                                      action={responseHandler}
                                    />
                                  )}
                                </div>
                              </div>

                              <div>
                                <p
                                  className="fs-12 fw-500 mt-3"
                                  style={{ color: "#AEAEAE" }}
                                >
                                  {(keywordTranslation &&
                                    keywordTranslation["answer"]) ||
                                    langkey.answer}
                                </p>

                                <p className="fs-12 fw-400 mt-2">
                                  {question?.training_user_submited_answer &&
                                    question?.training_user_submited_answer[0]
                                      ?.user_right_answer}
                                </p>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          {/* <Button label="Cancel" buttonStyle="cancel mr-2" onClick={props.correctAssignmentModalHandler} />
                    <Button label="Upload" buttonStyle="addnew_btn pe-3 ps-3" /> */}

          <div className="d-flex gap-2">
            <div className="d-flex gap-2 align-items-center">
              <img
                src={props?.training?.training?.image || notFoundAsset}
                width="26px"
                height="26px"
                className="rounded-circle"
                alt=""
              />
              <div>
                <p className="fs-12 fw-600">
                  {props?.training?.participants.first_name}
                </p>
                <p className="fs-11 fw-500" style={{ color: "#ADADAD" }}>
                  {props?.training?.participants.last_name}
                </p>
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <img
                src={props?.training?.training?.image || notFoundAsset}
                alt=""
                width="26px"
                height="26px"
              />
              <p
                className="fs-12 fw-500"
                style={{ color: "#2C8EFF", textDecorationLine: "underline" }}
              >
                {props?.training.training?.name}
              </p>
            </div>
          </div>

          <div className="d-flex gap-2">
            <p className="fs-12 fw-500" style={{ color: "#B3B3B3" }}>
              {(keywordTranslation && keywordTranslation["status"]) ||
                langkey.status}
              :
            </p>
            <div className="d-flex gap-2 align-items-center">
              <img
                src={
                  props?.training.status === 0
                    ? orangeTimeAsset
                    : greenCircleTickAsset
                }
                width="14px"
                height="14px"
                alt=""
              />
              <p
                className="mb-0 fs-12 fw-500"
                style={
                  props?.training.status === 0
                    ? { color: "#FF7A00" }
                    : { color: "#47CA5B" }
                }
              >
                {props?.training.status === 0
                  ? (keywordTranslation && keywordTranslation["unCorrect"]) ||
                    langkey.unCorrect
                  : (keywordTranslation && keywordTranslation["correct"]) ||
                    langkey.correct}
              </p>
            </div>
          </div>
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default CorrectionAssignmentDetialModal;
