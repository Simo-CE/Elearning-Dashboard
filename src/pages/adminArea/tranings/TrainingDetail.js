import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  arrowblueAsset,
  backarrow1Asset,
  binSimpleAsset,
  cartIconWhiteAsset,
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
  validityAsset,
  whiteTickAsset,
} from "../../../assets";
import Button from "../../../components/Button/Button";
import { setCart } from "../../../redux/AddToCart";
import paths from "../../../routes/paths";
import {
  useDeleteTrainingMutation,
  useGetAllTrainingQuery,
  useGetSeriesTrainingQuery,
  useGetSingleTrainingListQuery,
  useSingleSeriesTrainingQuery,
} from "../../../services/api";
import "../../workerArea/WorkerArea.css";
import langKey from "../../../localization/locale.json";

const TrainingDetail = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  let alreadyExist = cart?.filter((item) => {
    return item.id === state?.training.id;
  });

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListQuery(state?.training.id);

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  const handleAddToCart = () => {
    dispatch(setCart(getSingleTrainingList?.training));
  };

  // useEffect(() => {
  // }, [getSingleTrainingList]);

  return (
    <>
      <div className="container-fluid header">
        <div className="row">
          <div className="col-md-7">
            <div className="mt-4" style={{ marginLeft: "50px" }}>
              <div className="d-flex justify-content-between">
                <h3 className="heading">
                  {getSingleTrainingList?.training?.name}
                </h3>
                {alreadyExist?.length ? (
                  <Button
                    label={
                      (keywordTranslation &&
                        keywordTranslation["alreadyExist"]) ||
                      langKey.alreadyExist
                    }
                    buttonStyle="addnew_btn"
                    iconPrev={cartIconWhiteAsset}
                  />
                ) : (
                  <Button
                    label={
                      (keywordTranslation && keywordTranslation["addToCart"]) ||
                      langKey.addToCart
                    }
                    buttonStyle="addnew_btn"
                    iconPrev={cartIconWhiteAsset}
                    onClick={() => handleAddToCart()}
                  />
                )}
              </div>

              <p className="para-text">
                {getSingleTrainingList?.training?.desc}
              </p>
            </div>

            <div className="d-flex justify-content-end">
              <div className="media">
                <div className="media-body mr-2">
                  <p className="current-price mb-0">
                    €{" "}
                    {getSingleTrainingList?.training?.price -
                      getSingleTrainingList?.training?.discount}
                  </p>
                  <p className="discount-text mb-0">
                    € {getSingleTrainingList?.training?.price}
                  </p>
                </div>
                <button className="discount-btn">
                  -
                  {Number(getSingleTrainingList?.training?.discount).toFixed(0)}
                  %
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <img
              src={getSingleTrainingList?.training?.image || safetylogoAsset}
              alt=""
              width="500px"
              height="276px"
              className="mt-4 header-pic"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingDetail;
