import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "../../../components/Button/Button";
import Toggle from "../../../components/ToggleSlide/ToggleSlide";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import langKey from "../../../localization/locale.json";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  diceAsset,
  expectedTime1Asset,
  expectedTimeAsset,
  infoAsset,
  minesAsset,
  minusTraningIconAsset,
  passedIconAsset,
  passsingScoreAsset,
  plusTraningIconAsset,
  repeatAsset,
  timeAsset,
  timerAsset,
  webcamAsset,
} from "../../../assets";
import "../adminArea.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";

const AddTraningCarousal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const renderTooltip = (props) => (
    <Popover id="popover-basic" {...props}>
      <Popover.Body>
        {(keywordTranslation && keywordTranslation["carosalTextOne"]) ||
          langKey.carosalTextOne}{" "}
        <br />
        {(keywordTranslation && keywordTranslation["carosalTextTwo"]) ||
          langKey.carosalTextTwo}{" "}
        <br />
        {(keywordTranslation && keywordTranslation["carosalTextThree"]) ||
          langKey.carosalTextThree}
        <br />{" "}
        {(keywordTranslation && keywordTranslation["carosalTextFour"]) ||
          langKey.carosalTextFour}
      </Popover.Body>
    </Popover>
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [quesCounter, setQuesCounter] = useState(0); // Random Question
  let [timeCounter, setTimeCounter] = useState();
  let [passingScoreCounter, setpassingScoreCounter] = useState();
  // let [timeExpectedCounter, setTimeExpectedCounter] = useState();
  let [attemptsCounter, setAttemptsCounter] = useState();
  let [webcamValidation, setWebcamValidation] = useState(0); // Webcam validation

  props.data(
    quesCounter,
    timeCounter,
    passingScoreCounter,
    // timeExpectedCounter,
    attemptsCounter,
    webcamValidation
  );

  // const validationSchema = Yup.object().shape({
  //   timerPerQuestion: Yup.number().required("Required"),
  //   passingScore: Yup.number().required("Required"),
  //   timeExpected: Yup.number().required("Required"),
  //   attempts: Yup.number().required("Required"),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  //   mode: "onTouched",
  // });

  useEffect(() => {
    if (props.training) {
      setQuesCounter(props.training.random_q);
      setTimeCounter(moment.duration(props.training.time_per_q).asMinutes());
      setpassingScoreCounter(props.training.passing_score);
      // setTimeExpectedCounter(
      //   moment.duration(props.training.time_expected).asMinutes()
      // );
      setAttemptsCounter(props.training.attempted);
      setWebcamValidation(props.training.webcam);
    }
  }, []);

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      // showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      // autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}

      itemClass="carousel-item-padding-40-px"
    >
      <div>
        <div className="carouselItems p-2">
          <center>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 200 }}
              overlay={renderTooltip}
            >
              <img src={infoAsset} alt="" className="infoIconTool" />
            </OverlayTrigger>
            <div>
              <img
                src={diceAsset}
                width="30px"
                height="35.16px"
                alt=""
                className="mt-4"
              />
              <p className="fs-12 fw-600 mt-2">
                {(keywordTranslation &&
                  keywordTranslation["randomQuestions"]) ||
                  langKey.randomQuestions}
              </p>
            </div>
            <div className="d-flex gap-1 justify-content-center mt-3 mb-1">
              {/* <Button
                label="-"
                buttonStyle="plus-btn"
                onClick={() => setQuesCounter(Number(quesCounter) - 1)}
              /> */}
              {/* <h1 className="counterOutput">{quesCounter}</h1> */}
              {/* <input
                className="counterOutput"
                placeholder="1"
                value={quesCounter}
                onChange={(e) => setQuesCounter(e.target.value)}
              />
              <Button
               icon={plusTraningIconAsset}
                imgStyle="plusImg"
                buttonStyle="plus-btn"
                onClick={() => setQuesCounter(Number(quesCounter) + 1)}
              /> */}

              <Toggle
                Class="Big"
                checked={quesCounter}
                onChangeHandler={() => setQuesCounter((prev) => !prev)}
              />
            </div>
          </center>
        </div>
      </div>
      <div>
        <div className="carouselItems p-2">
          <center>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 200 }}
              overlay={renderTooltip}
            >
              <img src={infoAsset} alt="" className="infoIconTool" />
            </OverlayTrigger>
            <div>
              <img
                src={timerAsset}
                width="30px"
                height="35px"
                alt=""
                className="mt-4"
              />
              <p className="fs-12 fw-600 mt-2">
                {(keywordTranslation &&
                  keywordTranslation["timePerQuestion"]) ||
                  langKey.timePerQuestion}
              </p>
            </div>
            <div className="d-flex gap-1 justify-content-center mt-3">
              <Button
                icon={minusTraningIconAsset}
                imgStyle="minusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((timeCounter ? timeCounter : 0) >= 1) {
                    setTimeCounter(Number(timeCounter ? timeCounter : 0) - 1);
                  }
                }}
              />
              <input
                className="counterOutput"
                // {...register("timerPerQuestion")}
                placeholder="0min"
                value={timeCounter}
                type="number"
                onChange={(e) => {
                  if (e.target.value <= 60 && e.target.value >= 0) {
                    setTimeCounter(e.target.value);
                  }
                }}
              />
              {/* <h1 className="counterOutput">{timeCounter}s</h1> */}
              <Button
                icon={plusTraningIconAsset}
                imgStyle="plusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((timeCounter ? timeCounter : 0) <= 59) {
                    setTimeCounter(Number(timeCounter ? timeCounter : 0) + 1);
                  }
                }}
              />
            </div>
          </center>

          {/* {errors.timerPerQuestion && (
            <ErrorViewer
              className="mt-2"
              message={errors.timerPerQuestion.message}
            />
          )} */}
        </div>
      </div>
      <div>
        <div className="carouselItems p-2">
          <center>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 200 }}
              overlay={renderTooltip}
            >
              <img src={infoAsset} alt="" className="infoIconTool" />
            </OverlayTrigger>
            <div>
              <img
                src={passsingScoreAsset}
                width="34px"
                height="34px"
                alt=""
                className="mt-4"
              />
              <p className="fs-12 fw-600 mt-2">
                {(keywordTranslation && keywordTranslation["passScore"]) ||
                  langKey.passScore}
              </p>
            </div>
            <div className="d-flex gap-1 justify-content-center mt-3">
              <Button
                icon={minusTraningIconAsset}
                imgStyle="minusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((passingScoreCounter ? passingScoreCounter : 0) >= 1) {
                    setpassingScoreCounter(
                      Number(passingScoreCounter ? passingScoreCounter : 0) - 1
                    );
                  }
                }}
              />
              <input
                className="counterOutput"
                placeholder="0%"
                value={passingScoreCounter}
                type="number"
                onChange={(e) => {
                  if (e.target.value <= 100 && e.target.value >= 0) {
                    setpassingScoreCounter(e.target.value);
                  }
                }}
              />
              <Button
                icon={plusTraningIconAsset}
                imgStyle="plusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((passingScoreCounter ? passingScoreCounter : 0) <= 99) {
                    setpassingScoreCounter(
                      Number(passingScoreCounter ? passingScoreCounter : 0) + 1
                    );
                  }
                }}
              />
            </div>
          </center>
        </div>
      </div>
      <div>
        <div className="carouselItems p-2">
          <center>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 200 }}
              overlay={renderTooltip}
            >
              <img src={infoAsset} alt="" className="infoIconTool" />
            </OverlayTrigger>
            <div>
              <img
                src={webcamAsset}
                width="28px"
                height="35px"
                alt=""
                className="mt-4"
              />
              <p className="fs-12 fw-600 mt-2">
                {(keywordTranslation &&
                  keywordTranslation["webcamValidation"]) ||
                  langKey.webcamValidation}
              </p>
            </div>
            <div className="d-flex justify-content-center mt-3 mb-1">
              <Toggle
                Class="Big"
                checked={webcamValidation}
                onChangeHandler={() => setWebcamValidation((prev) => !prev)}
              />
            </div>
          </center>
        </div>
      </div>
      <div>
        <div className="carouselItems p-2">
          <center>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 200 }}
              overlay={renderTooltip}
            >
              <img src={infoAsset} alt="" className="infoIconTool" />
            </OverlayTrigger>
            <div>
              <img
                src={repeatAsset}
                width="35px"
                height="35px"
                alt=""
                className="mt-4"
              />
              <p className="fs-12 fw-600 mt-2">
                {(keywordTranslation && keywordTranslation["Attemps"]) ||
                  langKey.Attemps}
              </p>
            </div>
            <div className="d-flex gap-1 justify-content-center mt-3">
              <Button
                icon={minusTraningIconAsset}
                imgStyle="minusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((attemptsCounter ? attemptsCounter : 0) >= 1) {
                    setAttemptsCounter(
                      Number(attemptsCounter ? attemptsCounter : 0) - 1
                    );
                  }
                }}
              />
              {/* <h1 className="counterOutput">{attemptsCounter}</h1> */}
              <input
                className="counterOutput"
                placeholder="0"
                value={attemptsCounter}
                type="number"
                onChange={(e) => {
                  if (e.target.value >= 0 && e.target.value <= 10) {
                    setAttemptsCounter(e.target.value);
                  }
                }}
              />
              <Button
                icon={plusTraningIconAsset}
                imgStyle="plusImg"
                buttonStyle="plus-btn"
                onClick={(e) => {
                  if ((attemptsCounter ? attemptsCounter : 0) <= 9) {
                    setAttemptsCounter(
                      Number(attemptsCounter ? attemptsCounter : 0) + 1
                    );
                  }
                }}
              />
            </div>
          </center>
        </div>
      </div>
    </Carousel>
  );
};

export default AddTraningCarousal;
