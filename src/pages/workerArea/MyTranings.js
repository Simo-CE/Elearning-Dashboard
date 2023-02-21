import moment from "moment";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  aidAsset,
  allAsset,
  bluestatusAsset,
  cartIconAsset,
  certipinkstatusAsset,
  certiyellowstatusAsset,
  discountFrameAsset,
  envoirmentAsset,
  healthAsset,
  img1Asset,
  img2Asset,
  loaderAsset,
  maintenanceAsset,
  quality1Asset,
  qualityAsset,
  security1Asset,
  securityAsset,
  statusGreenAsset,
} from "../../assets";
import Button from "../../components/Button/Button";
import paths from "../../routes/paths";
import {
  useGetAllTrainingQuery,
  useGetCategoryQuery,
} from "../../services/api";

import "./WorkerArea.css";
const MyTranings = () => {
  const [sorting, setSorting] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");
  const [more, setMore] = useState(20);


  const {
    data: getAllTraining,
    isSuccess: getAllTrainingSuccess,
    isLoading: getAllTrainingLoading,
    isFetching: getAllTrainingFetching,
    error: getAllTrainingError,
    reset: getAllTrainingReset,
    refetch: getAllTrainingRefetch,
  } = useGetAllTrainingQuery(sorting);

  const {
    data: getCategory,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch,
  } = useGetCategoryQuery();

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  const handleLoadMore = () => {
    setLoading(true);
    setMore(more + 10);
    setSorting(`per_page=${more}`);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-4">
          <div className="col-lg-12 p-0">
            <div className="d-flex gap-2 align-items-end">
              <p className="pageHeading">Categories</p>

              <div className="d-flex gap-2 overflow">
                <div
                  className="allCategory"
                  onClick={() => {
                    setCategory("All Categories");
                    setSorting("");
                  }}
                >
                  <img src={allAsset} width="18px" height="18px" alt="" />
                  <p>All</p>
                </div>
                {getCategory?.data?.data?.map((data) => {
                  return (
                    <div
                      className="allCategory"
                      onClick={() => {
                        setSorting(`category_id=${data.id}`);
                        setCategory(data?.name);
                      }}
                    >
                      <img
                        src={security1Asset}
                        width="17px"
                        height="21px"
                        alt=""
                      />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12 p-0">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="pageHeading">
                My Trainings{" "}
                <span style={{ color: "#2C8EFF" }}>
                  “{category ? category : "All Categories"}”
                </span>
              </h3>

              <div>
                <ul className="nav  traningstabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      All
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      New
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Certified
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="#">
                      Expired
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="#">
                      Nearly expired
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-3">
            {getAllTraining?.training?.data?.length === 0 ? (
              <div className="d-flex justify-content-center mt-3 mb-5">
                <div className="d-flex align-items-center">
                  <p>No record found</p>
                </div>
              </div>
            ) : (
              <div className="row">
                {getAllTraining?.training?.data?.map((trainings, index) => {
                  return (
                    <div className="col-lg-3 col-md-4 mt-3">
                      <NavLink
                        to={
                          trainings?.purchased
                            ? paths.viewParticipant
                            : paths.training_detail
                        }
                        state={{ training: trainings }}
                      >
                        <Card className="p-0">
                          <Card.Body className="p-2">
                            <div className="discountframe">
                              <img
                                src={discountFrameAsset}
                                width="38px"
                                height="28px"
                                alt=""
                              />
                              <p className="fs-12 fw-400 text-white discount-text">
                                - {Number(trainings?.discount)?.toFixed(0)}%
                              </p>
                            </div>
                            <img
                              src={img2Asset}
                              width="100%"
                              height="150px"
                              alt=""
                              className="cover rounded"
                            />
                            <div className="d-flex mt-3 align-items-center">
                              <Card.Subtitle
                                className=" fs-10 fw-600"
                                style={{ color: "#D9D9D9" }}
                              >
                                {trainings?.category?.name || "—"}
                              </Card.Subtitle>
                              <img
                                src={bluestatusAsset}
                                width="20px"
                                height="20px"
                                alt=""
                                className="ms-auto"
                              />
                            </div>
                            <Card.Title
                              className="para14"
                              style={{ color: "#6B6B6B" }}
                            >
                              {trainings?.name}
                            </Card.Title>
                            <p className="blueborder"></p>
                            <Card.Text
                              className="fs-12 fw-400"
                              style={{ color: "#A0A0A0" }}
                            >
                              {trainings?.desc}
                            </Card.Text>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              {trainings?.purchased ? (
                                <p
                                  className="fs-12 fw-400"
                                  style={{ color: "#A0A0A0" }}
                                >
                                  <span>Purchased on</span>
                                  <br />
                                  <span>
                                    {trainings?.purchased?.created_at
                                      ? moment(
                                        trainings?.purchased?.created_at?.split(
                                          "T"
                                        )[0]
                                      ).format("DD/MM/YYYY")
                                      : "—"}
                                  </span>
                                </p>
                              ) : (
                                <p
                                  className="fs-12 fw-400"
                                  style={{ color: "#A0A0A0" }}
                                >
                                  <span
                                    style={{
                                      textDecorationLine: "line-through",
                                      color: "#A0A0A0",
                                    }}
                                  >
                                    € {trainings?.price}
                                  </span>
                                  <br />
                                  <span style={{ color: "#ED4C5C" }}>
                                    € {trainings?.price - trainings?.discount}
                                  </span>
                                </p>
                              )}

                              {trainings?.purchased === null ? (
                                <Button
                                  label="ADD TO CART"
                                  buttonStyle="addtocart-btn ps-3 pe-3"
                                  iconPrev={cartIconAsset}
                                />
                              ) : (
                                <Button
                                  label="Get certificate"
                                  buttonStyle="certificate-btn ps-3 pe-3"
                                />
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {getAllTraining?.total_over_due_training <=
            getAllTraining?.training?.data?.length ? (
            <div className="d-flex justify-content-center mt-3 mb-5">
              <div className="d-flex align-items-center">
                <p>No more trainings</p>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-3 mb-5">
              {getAllTraining?.training?.data?.length >= 10 && (
                <>
                  {loading ? (
                    <div className="d-flex align-items-center">
                      <img src={loaderAsset} height="40px" width="40px" />
                      <p>Loading more...</p>
                    </div>
                  ) : (
                    <Button
                      label="Load More"
                      buttonStyle="text-white fs-14 fw-500 addnew_btn"
                      onClick={handleLoadMore}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTranings;
