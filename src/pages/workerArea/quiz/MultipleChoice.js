import React, { useState } from "react";
import "../WorkerArea.css";
import {
  backarrow1Asset,
  expectedTimeAsset,
  forwardIconAsset,
  img1Asset,
  img2Asset,
  infoAsset,
  mcqsImgAsset,
  whiteForwordArrowAsset,
} from "../../../assets";
import SaveButton from "../../../components/Button/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

const MultipleChoice = () => {
  const [firstActive, setFirstActive] = useState(false);
  const [secondActive, setSecondActive] = useState(false);
  const [thirdActive, setThirdActive] = useState(false);
  const [fourthActive, setFourthActive] = useState(false);

  const firstHandleClick = () => {
    setFirstActive((current) => !current);
  };
  const secondHandleClick = () => {
    setSecondActive((current) => !current);
  };
  const thirdHandleClick = () => {
    setThirdActive((current) => !current);
  };
  const fourthHandleClick = () => {
    setFourthActive((current) => !current);
  };

  const quizPer = 62;

  return (
    <>
      <div className="mt-5" style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="col-12 main-div mb-5">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="d-flex align-items-center gap-3">
                <img src={backarrow1Asset} width="14px" height="14.7px" />
                <p className="working-at-height">Quiz: Working at height</p>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    background: "#47CA5B",
                    borderRadius: "5px",
                    height: "22px",
                  }}
                >
                  <p className="fs-14 fw-500 text-white p-2">00:45</p>
                </div>
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
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-lg-9">
              <center>
                <h3 className="fs-15 fw-500" style={{ color: "#6B6B6B" }}>
                  If a contractor is hired to perform permit space entry
                  operations, they must never:
                </h3>
                <p className="fs-11 fw-500 mt-1" style={{ color: "#FACB16" }}>
                  QUESTION 3 OF 10
                </p>
              </center>
            </div>
            <div className="col-lg-8 mt-5 ">
              <div className="row">
                <div className="col-lg-6 col-md-6 mt-3">
                  <div>
                    <img
                      src={mcqsImgAsset}
                      width="100%"
                      height="100px"
                      className="rounded mb-2 cover"
                      alt=""
                    />
                  </div>
                  <div className="d-flex">
                    <div
                      className="d-flex p-2  gap-2 w-100 quesDiv"
                      style={{
                        borderColor: firstActive ? "#47CA5B" : "",
                        color: firstActive ? "#6B6B6B" : "",
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mcqs mcqsCheckbox"
                        onClick={firstHandleClick}
                      />
                      <p className="fs-12 fw-500" style={{ color: "#6B6B6B" }}>
                        Coordinate entry operations with the host employer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mt-3">
                  <div>
                    <img
                      src={mcqsImgAsset}
                      width="100%"
                      height="100px"
                      className="rounded mb-2 cover"
                      alt=""
                    />
                  </div>
                  <div className="d-flex">
                    <div
                      className="d-flex p-2  gap-2 w-100 quesDiv"
                      style={{
                        borderColor: secondActive ? "#47CA5B" : "",
                        color: secondActive ? "#6B6B6B" : "",
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mcqs mcqsCheckbox"
                        onClick={secondHandleClick}
                      />
                      <p className="fs-12 fw-500" style={{ color: "#6B6B6B" }}>
                        Obtain any information about the confined space from the
                        client.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mt-3">
                  <div>
                    <img
                      src={mcqsImgAsset}
                      width="100%"
                      height="100px"
                      className="rounded mb-2 cover"
                      alt=""
                    />
                  </div>
                  <div className="d-flex">
                    <div
                      className="d-flex p-2  gap-2 w-100 quesDiv"
                      style={{
                        borderColor: thirdActive ? "#47CA5B" : "",
                        color: thirdActive ? "#6B6B6B" : "",
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mcqs mcqsCheckbox"
                        onClick={thirdHandleClick}
                      />
                      <p className="fs-12 fw-500" style={{ color: "#6B6B6B" }}>
                        Reveal the permit space program they will follow
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mt-3">
                  <div>
                    <img
                      src={mcqsImgAsset}
                      width="100%"
                      height="100px"
                      className="rounded mb-2 cover"
                      alt=""
                    />
                  </div>
                  <div className="d-flex">
                    <div
                      className="d-flex p-2  gap-2 w-100 quesDiv"
                      style={{
                        borderColor: fourthActive ? "#47CA5B" : "",
                        color: fourthActive ? "#6B6B6B" : "",
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mcqs mcqsCheckbox"
                        onClick={fourthHandleClick}
                      />
                      <p className="fs-12 fw-500" style={{ color: "#6B6B6B" }}>
                        I don’t know!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-5">
                  <div className="border-bottom d-flex justify-content-center"></div>

                  <div className="d-flex mt-3">
                    <SaveButton
                      label="Next Question"
                      buttonStyle="addnew_btn pl-3 pr-3 ml-auto"
                      icon={whiteForwordArrowAsset}
                      imgStyle="nextQuestionArrow"
                    />
                  </div>
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
              You have only 3 attempts to pass the training, so make sure you
              understand everything before passing the test!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleChoice;
