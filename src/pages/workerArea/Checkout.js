import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  delete_iconAsset,
  filePurpleAsset,
  iconAsset,
  img1Asset,
  securityAsset,
  statusfailedAsset,
  statuspassedAsset,
  statusunderreviewAsset,
  validityAsset,
} from "../../assets";
import { removeFromCart, removeSpecificFromCart } from "../../redux/AddToCart";
import "./WorkerArea.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useGetAllTrainingQuery } from "../../services/api";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const {
    data: getAllTraining,
    isSuccess: getAllTrainingSuccess,
    isLoading: getAllTrainingLoading,
    isFetching: getAllTrainingFetching,
    error: getAllTrainingError,
    reset: getAllTrainingReset,
    refetch: getAllTrainingRefetch,
  } = useGetAllTrainingQuery();

  const stripePromise = loadStripe(
    "pk_test_51LfibTBXelqJzlBHsW7OHf6e3fTe29e53JSPY4EJS7pZgitsGIgzaph9qC7p6ZCP2mnLWRRLzQedxsJoCRdab00L00nMdo4J0I"
  );

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  let results = cart?.filter(
    (o) => !getAllTraining?.training?.data.some((i) => i.id === o.id)
  );

  // useEffect(() => {
  //   results?.length && dispatch(removeSpecificFromCart(results));
  // }, [cart]);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <p className="fs-20 fw-600 mb-3" style={{ color: "#7C7C7C" }}>
            Check Out
          </p>
          <div className="col-lg-9">
            <div className="main-div p-3">
              <h3 className="fs-14 fw-600 mb-3" style={{ color: "#B6B6B6" }}>
                Training information
              </h3>
              {cart.length ? (
                <>
                  {" "}
                  {cart?.map((item, index) => {
                    return (
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src={item.image || img1Asset}
                            width="200px"
                            height="132.14px"
                            className="certificate-img"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <p className="working-at-height">
                                Training: {item?.name}
                              </p>
                            </div>
                            <img src={iconAsset} width="25px" height="25px" />
                          </div>

                          <div
                            className="d-flex align-items-center mt-2 mb-3 gap-4"
                            // style={{ marginLeft: "-30px" }}
                          >
                            {item.training_series_section && (
                              <p className="para-text ml-1">
                                This certificate has{" "}
                                {item.training_series_section?.length} trainings
                              </p>
                            )}
                            {item.training_series_section ? (
                              ""
                            ) : (
                              <>
                                <div className="d-flex">
                                  <img
                                    src={item.category?.image || securityAsset}
                                    width="16px"
                                    height="16px"
                                    className="imgs"
                                  />
                                  <p className="status">
                                    {item.category?.name}
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <img
                                    src={filePurpleAsset}
                                    width="14px"
                                    height="16.8px"
                                    className="imgs"
                                  />
                                  <p className="status">PDF file (98 pages)</p>
                                </div>
                                <div>
                                  {getDays(item?.deadline) < 0 ? (
                                    <img
                                      src={statusfailedAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="ms-auto"
                                    />
                                  ) : getDays(item?.deadline) >= 0 &&
                                    getDays(item?.deadline) <= 30 ? (
                                    <img
                                      src={statusunderreviewAsset}
                                      width="20px"
                                      height="20px"
                                      alt=""
                                      className="ms-auto"
                                    />
                                  ) : (
                                    getDays(item?.deadline) > 30 && (
                                      <img
                                        src={statuspassedAsset}
                                        width="20px"
                                        height="20px"
                                        alt=""
                                        className="ms-auto"
                                      />
                                    )
                                  )}
                                  <p className="status">New</p>
                                </div>
                              </>
                            )}

                            <div className="d-flex align-items-center gap-1">
                              <img
                                src={validityAsset}
                                width="16px"
                                height="16px"
                                className="imgs"
                              />
                              <p className="status">
                                Valid for {item.valid_for}
                              </p>
                            </div>
                          </div>

                          <div className="d-flex">
                            <p
                              className="fs-13 fw-500"
                              style={{ color: "#838383" }}
                            >
                              {item?.desc}
                            </p>

                            <div className="ml-auto w-100 d-flex justify-content-end align-items-end flex-column">
                              <img
                                src={delete_iconAsset}
                                alt=""
                                className="cursor"
                                onClick={() => handleRemove(item.id)}
                              />
                              <p
                                className="fs-10 fw-500"
                                style={{
                                  textDecorationLine: "line-through",
                                  color: "#A0A0A0",
                                }}
                              >
                                € {Number(item.price).toFixed(0)}
                              </p>
                              <p
                                className=" fs-16 fw-600"
                                style={{ color: "#ED4C5C" }}
                              >
                                € {item.price - item.discount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <hr />
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <div className="d-flex align-items-center">
                    <p
                      className="fs-14 fw-600 mb-3"
                      style={{ color: "#B6B6B6" }}
                    >
                      Your cart is empty
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="Checkout">
              <GoogleReCaptchaProvider
                reCaptchaKey="6LcoEt4bAAAAACuJio03nw9Bugnsc1AZvL7Nr5m_"
                language="en-AU"
              >
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </GoogleReCaptchaProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
