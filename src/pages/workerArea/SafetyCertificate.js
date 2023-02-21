import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  arrowblueAsset,
  backarrow1Asset,
  binSimpleAsset,
  cartIconWhiteAsset,
  certipinkstatusAsset,
  discountFrameAsset,
  dragDropDotsAsset,
  editsimpleAsset1,
  equipmentAsset,
  filePurpleAsset,
  iconAsset,
  img1Asset,
  safetylogoAsset,
  securityAsset,
  statusfailedAsset,
  statuspassedAsset,
  statusunderreviewAsset,
  traningsIconAsset,
  validityAsset,
  whiteTickAsset,
} from "../../assets";
import Button from "../../components/Button/Button";
import { removeFromCart, setCart } from "../../redux/AddToCart";
import paths from "../../routes/paths";
import {
  useDeleteTrainingMutation,
  useGetSeriesTrainingQuery,
  useSingleSeriesTrainingQuery,
} from "../../services/api";
import DeleteTrainingModal from "../adminArea/tranings/DeleteTrainingModal";
import "./WorkerArea.css";

const SafetyCertificate = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [deletedData, setDeletedData] = useState();
  const [delClient, setDelClient] = useState(false);

  const cart = useSelector((state) => state.cart.cart);

  const [
    deleteTraining,
    {
      isSuccess: deleteTrainingSuccess,
      isLoading: deleteTrainingLoading,
      isFetching: deleteTrainingFetching,
      error: deleteTrainingError,
      reset: deleteTrainingReset,
      refetch: deleteTrainingRefetch,
    },
  ] = useDeleteTrainingMutation();

  const { data: getSeriesTraining, refetch: getSeriesTrainingRefetch } =
    useGetSeriesTrainingQuery();

  const trainingId = state?.trainings.id;

  const { data: singleSeriesTraining } =
    useSingleSeriesTrainingQuery(trainingId);

  let alreadyExist = cart?.filter((item) => {
    return item.id === trainingId;
  });

  const handleAddToCart = () => {
    dispatch(setCart(singleSeriesTraining));
  };

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  const delTrainingModalHandler = (data) => {
    setDelClient((prev) => !prev);
  };

  const handleDeleteTraining = (data) => {
    const formData = new FormData();
    if (data) {
      formData.append("_method", "delete");
      formData.append("training_data", 1);
      formData.append(`ids[]`, data.id);
    }

    deleteTraining(formData)
      .unwrap()
      .then((payload) => {
        payload && toast.success("Training deleted successfully");
        cart?.filter((item) => {
          if (item.id === data?.id) {
            dispatch(removeFromCart(data?.id));
          }
        });
      });
  };

  useEffect(() => {
    if (deleteTrainingSuccess) {
      getSeriesTrainingRefetch();
    }
  }, [getSeriesTraining, deleteTrainingSuccess]);

  return (
    <>
      {delClient && (
        <DeleteTrainingModal
          loading={deleteTrainingLoading}
          handleCloseDeleteModal={delTrainingModalHandler}
          action={() => handleDeleteTraining(deletedData)}
          deleteButtonText="Delete Training"
          confirmationTextOne={`Please confirm that you want to delete this training`}
          trainingName={` "${deletedData?.name}"`}
          confirmationTextTwo={` and all associated content. This action cannot be undone!`}
          firstCheckBoxText="Questions and informations associated with this training"
        />
      )}
      <div className="container-fluid header">
        <div className="row">
          <div className="col-md-7">
            <div className="mt-4" style={{ marginLeft: "50px" }}>
              <div className="d-flex justify-content-between">
                <h3 className="heading">{state?.trainings.name}</h3>
                {alreadyExist?.length ? (
                  <Button
                    label="Already Exist"
                    buttonStyle="addnew_btn"
                    iconPrev={cartIconWhiteAsset}
                  />
                ) : (
                  <Button
                    label=" ADD TO CART"
                    buttonStyle="addnew_btn"
                    iconPrev={cartIconWhiteAsset}
                    onClick={() => handleAddToCart()}
                  />
                )}
              </div>
              <div className="d-flex">
                <img src={traningsIconAsset} width="12px" height="16px" />
                <p className="para-text ml-1" style={{ height: "85px" }}>
                  This certificate has{" "}
                  {state?.trainings.training_series_section?.length} trainings
                </p>
              </div>
              <p className="para-text">{state?.trainings.desc}</p>
            </div>

            <div className="d-flex justify-content-end">
              <div className="media">
                <div className="media-body mr-2">
                  <p className="current-price mb-0">
                    € {state?.trainings.price - state?.trainings.discount}
                  </p>
                  <p className="discount-text mb-0">
                    € {state?.trainings.price}
                  </p>
                </div>
                <button className="discount-btn">
                  -{Number(state?.trainings.discount).toFixed(0)}%
                </button>
              </div>
            </div>
            {singleSeriesTraining?.training_series_section?.map(
              (data, index) => {
                return (
                  <div style={{ marginLeft: "50px" }}>
                    <div className="d-flex align-items-center">
                      <div className="rounded-border">
                        <img
                          src={data.image || equipmentAsset}
                          width="80px"
                          height="80px"
                          className="rounded-pic select-traning"
                        />
                      </div>
                      <img
                        src={arrowblueAsset}
                        width="14px"
                        height="24.5px"
                        className="ml-3"
                      />
                    </div>
                    <p className="rounded-pic-text">
                      {index + 1}- {data.name}
                    </p>

                    {/* <img
                      src={whiteTickAsset}
                      width="40px"
                      height="30px"
                      className="tick"
                      style={{
                        position: "absolute",
                        left: "85px",
                        top: "165px",
                      }}
                    /> */}
                  </div>
                );
              }
            )}
          </div>

          <div className="col-md-5">
            <img
              src={state?.trainings.image || safetylogoAsset}
              alt=""
              width="500px"
              height="276px"
              className="mt-4 header-pic"
            />
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {singleSeriesTraining?.training_series_section?.map(
          (UpperData, index) => {
            return (
              <div className="row">
                <h1 className="body-heading">
                  {index + 1} {UpperData.name}{" "}
                </h1>
                {UpperData?.training?.map((data, index) => {
                  return (
                    <div className="row mt-2">
                      <div className="col-11 ">
                        <div className="main-div pl-3">
                          <div className="row">
                            <div className="col-md-9">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                  <NavLink to={paths.myTranings}>
                                    <img
                                      src={backarrow1Asset}
                                      width="14px"
                                      height="14.7px"
                                    />
                                  </NavLink>
                                  <p className="ml-3 working-at-height">
                                    Training: {data.name}
                                  </p>
                                </div>
                                <img
                                  src={iconAsset}
                                  width="25px"
                                  height="25px"
                                />
                              </div>

                              <div className="d-flex align-items-center mt-2 mb-3">
                                <img
                                  src={securityAsset}
                                  width="16px"
                                  height="16px"
                                  className="imgs"
                                />
                                <p className="status">Safety</p>
                                <img
                                  src={filePurpleAsset}
                                  width="14px"
                                  height="16.8px"
                                  className="imgs"
                                />
                                <p className="status">PDF file (98 pages)</p>
                                {getDays(data?.deadline) < 0 ? (
                                  <>
                                    <img
                                      src={statusfailedAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="imgs"
                                    />
                                    <p className="status">Rejected</p>
                                  </>
                                ) : getDays(data?.deadline) >= 0 &&
                                  getDays(data?.deadline) <= 30 ? (
                                  <>
                                    <img
                                      src={statusunderreviewAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="imgs"
                                    />
                                    <p className="status">Rejected</p>
                                  </>
                                ) : getDays(data?.deadline) > 30 ? (
                                  <>
                                    <img
                                      src={statuspassedAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="imgs"
                                    />
                                    <p className="status">Completed</p>
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={statusunderreviewAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="imgs"
                                    />
                                    <p className="status">Neerly Expired</p>
                                  </>
                                )}
                                <img
                                  src={validityAsset}
                                  width="16px"
                                  height="16px"
                                  className="imgs"
                                />
                                <p className="status">
                                  Valid for {data.valid_for}
                                </p>
                              </div>

                              <p className="working-text">{data.desc}</p>
                              <NavLink
                                to={paths.startQuiz}
                                state={{ training: data }}
                              >
                                <button className="certificate-button mt-3">
                                  Get Certificate
                                </button>
                              </NavLink>
                              <div className="d-flex mt-3">
                                <div className="ms-auto">
                                  <p
                                    className="fs-10 fw-600 text-end"
                                    style={{
                                      color: "#A0A0A0",
                                      textDecorationLine: "line-through",
                                    }}
                                  >
                                    € {Number(data.discount).toFixed(0)}
                                  </p>
                                  <p
                                    className="fs-16 fw-700"
                                    style={{ color: "#ED4C5C" }}
                                  >
                                    € {data.price - data.discount}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 pr-4">
                              <div className="discountframe ml-1">
                                <img
                                  src={discountFrameAsset}
                                  width="38px"
                                  height="28px"
                                  alt=""
                                />
                                <p className="fs-12 fw-400 text-white discount-text">
                                  - {Number(data.discount).toFixed(0)}%
                                </p>
                              </div>
                              <img
                                src={img1Asset}
                                width="250px"
                                height="183px"
                                className="certificate-img cover rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-1">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4 mt-5">
                          <img
                            src={binSimpleAsset}
                            width="20px"
                            height="21px"
                            alt=""
                            className="cursor"
                            onClick={() => {
                              delTrainingModalHandler(data);
                              setDeletedData(data);
                            }}
                          />
                          <NavLink
                            to={paths.singleAddNewTraning}
                            state={{ training: data }}
                          >
                            <img
                              src={editsimpleAsset1}
                              width="18px"
                              height="18px"
                              alt=""
                            />
                          </NavLink>

                          <img
                            src={dragDropDotsAsset}
                            width="16px"
                            height="26.18px"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="col-12 main-div mt-3">
            <div className="row">
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img src={backarrow1Asset} width="14px" height="14.7px" />
                    <p className="ml-3 working-at-height">
                      Training 02: Scaffolding
                    </p>
                  </div>
                  <img src={iconAsset} width="25px" height="25px" />
                </div>

                <div className="d-flex align-items-center mt-2 mb-3">
                  <img
                    src={securityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">Safety</p>
                  <img
                    src={filePurpleAsset}
                    width="14px"
                    height="16.8px"
                    className="imgs"
                  />
                  <p className="status">PDF file (98 pages)</p>
                  <img
                    src={statusGreenAsset}
                    width="20px"
                    height="20px"
                    className="imgs"
                  />
                  <p className="status">Completed</p>
                  <img
                    src={validityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">Valid for 2 years</p>
                </div>

                <p className="working-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <button className="certificate-button mt-3">
                  Get Certificate
                </button>
              </div>
              <div className="col-md-3">
                <img
                  src={img2Asset}
                  width="250px"
                  height="185px"
                  className="certificate-img"
                />
              </div>
            </div>
          </div>

          <h1 className="body-heading">02 TOPIC TITLE</h1>
          <div className="col-12 main-div">
            <div className="row">
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img src={backarrow1Asset} width="14px" height="14.7px" />
                    <p className="ml-3 working-at-height">
                      Training 01: Cherry picker
                    </p>
                  </div>
                  <img src={iconAsset} width="25px" height="25px" />
                </div>

                <div className="d-flex align-items-center mt-2 mb-3">
                  <img
                    src={securityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">Safety</p>
                  <img
                    src={filePurpleAsset}
                    width="14px"
                    height="16.8px"
                    className="imgs"
                  />
                  <p className="status">PDF file (98 pages)</p>
                  <img
                    src={statusGreenAsset}
                    width="20px"
                    height="20px"
                    className="imgs"
                  />
                  <p className="status">New</p>
                  <img
                    src={validityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">Valid for 2 years</p>
                </div>

                <p className="working-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <div className="d-flex justify-content-between mt-3">
                  <button className="addtocart-btn ">ADD TO CART</button>
                  <p className="discount-text">
                    <span className="price-text">€ 29.99</span>€ 19.99
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <img
                  src={img1Asset}
                  width="250px"
                  height="185px"
                  className="certificate-img"
                />
     
              </div>
            </div>
          </div> */}
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default SafetyCertificate;
