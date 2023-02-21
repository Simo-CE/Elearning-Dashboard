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
  useGetSeriesTrainingQuery,
} from "../../services/api";

import "./WorkerArea.css";
const MySeries = () => {
  const [sorting, setSorting] = useState("");
  const { data: getSeriesTraining } = useGetSeriesTrainingQuery(sorting);

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-4">
          <div className="col-lg-12 p-0">
            <div className="d-flex gap-2 align-items-end">
              <p className="pageHeading">Categories</p>

              <div className="d-flex gap-2 overflow">
                <div className="allCategory">
                  <img src={allAsset} width="18px" height="18px" alt="" />
                  <p>All</p>
                </div>
                <div className="allCategory">
                  <img src={security1Asset} width="17px" height="21px" alt="" />
                  <p>Security</p>
                </div>

                <div className="allCategory">
                  <img
                    src={maintenanceAsset}
                    width="17px"
                    height="17px"
                    alt=""
                  />
                  <p>Maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12 p-0">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="pageHeading">
                My Series{" "}
                <span style={{ color: "#2C8EFF" }}>“All Categories”</span>
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
            <div className="row">
              {getSeriesTraining?.training?.data?.length ? (
                <>
                  {getSeriesTraining?.training?.data?.map(
                    (trainings, index) => {
                      return (
                        <div className="col-lg-3 col-md-4 mt-3">
                          <NavLink
                            to={paths.safetyCertificate}
                            state={{ trainings }}
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
                                    SECURITY
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
                                  <Button
                                    label=" ADD TO CART"
                                    buttonStyle="addtocart-btn ps-3 pe-3"
                                    iconPrev={cartIconAsset}
                                  />
                                </div>
                              </Card.Body>
                            </Card>
                          </NavLink>
                        </div>
                      );
                    }
                  )}
                </>
              ) : (
                <div className="d-flex justify-content-center mt-3 mb-5">
                  <div className="d-flex align-items-center">
                    <p>No record found</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySeries;
