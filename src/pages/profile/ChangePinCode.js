import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import "../../components/ResponsiveText.css";
import { lockAsset, UnlockAsset } from "../../assets";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import validationsKey from "../../localization/validationsLocale.json";
import successMsg from "../../localization/successMsgLocale.json";
import SaveButton from "../../components/Button/Button";
import langKey from "../../localization/locale.json";
import { useLocation } from "react-router-dom";
import {
  useAddPinCodeMutation,
  useGetSingleUserDetailQuery,
  useUpdatePinCodeMutation,
} from "../../services/api";
import { toast } from "react-toastify";

const Profile = (props) => {
  const location = useLocation();

  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [
    addPinCode,
    {
      isSuccess: addPinCodeSuccess,
      isLoading: addPinCodeLoading,
      isFetching: addPinCodeFetching,
      error: addPinCodeError,
      reset: addPinCodeReset,
    },
  ] = useAddPinCodeMutation();

  const [
    updatePinCode,
    {
      isSuccess: updatePinCodeSuccess,
      isLoading: updatePinCodeLoading,
      isFetching: updatePinCodeFetching,
      error: updatePinCodeError,
      reset: updatePinCodeReset,
    },
  ] = useUpdatePinCodeMutation();


  const { data: getSingleUserDetail } = useGetSingleUserDetailQuery({
    params: { user_id: location?.state?.user_id },
  });

  const currentUserById = getSingleUserDetail?.data;

  const validationSchema = currentUserById?.pin
    ? Yup.object().shape({
        current_pin: Yup.string()
          .required(
            (keywordTranslation && keywordTranslation["pinRequired"]) ||
              validationsKey.pinRequired
          )
          .min(
            4,
            (keywordTranslation && keywordTranslation["pinEightChar"]) ||
              validationsKey.pinEightChar
          ),
        new_pin: Yup.string()
          .required(
            (keywordTranslation && keywordTranslation["pinRequired"]) ||
              validationsKey.pinRequired
          )
          .min(
            4,
            (keywordTranslation && keywordTranslation["pinEightChar"]) ||
              validationsKey.pinEightChar
          ),
        pin: Yup.string()
          .oneOf(
            [Yup.ref("new_pin"), null],
            (keywordTranslation && keywordTranslation["pinMustMatch"]) ||
              validationsKey.pinMustMatch
          )
          .required(
            (keywordTranslation && keywordTranslation["pinRequired"]) ||
              validationsKey.pinRequired
          )
          .min(
            4,
            (keywordTranslation && keywordTranslation["pinEightChar"]) ||
              validationsKey.pinEightChar
          ),
      })
    : Yup.object().shape({
        new_pin: Yup.string()
          .required(
            (keywordTranslation && keywordTranslation["pinRequired"]) ||
              validationsKey.pinRequired
          )
          .min(
            4,
            (keywordTranslation && keywordTranslation["pinEightChar"]) ||
              validationsKey.pinEightChar
          ),
        pin: Yup.string()
          .oneOf(
            [Yup.ref("new_pin"), null],
            (keywordTranslation && keywordTranslation["pinMustMatch"]) ||
              validationsKey.pinMustMatch
          )
          .required(
            (keywordTranslation && keywordTranslation["pinRequired"]) ||
              validationsKey.pinRequired
          )
          .min(
            4,
            (keywordTranslation && keywordTranslation["pinEightChar"]) ||
              validationsKey.pinEightChar
          ),
      });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    let formData = new FormData();

    if (currentUserById?.pin) {
      formData.append("current_pin", values?.current_pin);
    }

    if (currentUserById) {
      formData.append("user_id", currentUserById?.id);
    }

    formData.append("new_pin", values?.new_pin);

    formData.append("pin", values?.pin);

    if (currentUserById?.pin) {
      updatePinCode(formData)
        .unwrap()
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["pinUpdateSuccess"]) ||
            successMsg.pinUpdateSuccess;
          toast.success(msg);
        });
    } else {
      addPinCode(formData)
        .unwrap()
        .then((payload) => {
          let msg =
            (payload?.message == "created" &&
              keywordTranslation &&
              keywordTranslation["pinAddSuccess"]) ||
            successMsg.pinAddSuccess;
          toast.success(msg);
        });
    }
  };

  return (
    <>
      <div className="row m-3">
        <div className="co-12 p-0 pincode-column">
          <p className="pincodeHeading mb-0 fontsize-13">
            {(keywordTranslation && keywordTranslation["Change PIN Code"]) ||
              "Change PIN Code"}
          </p>
          <p className="pincodetext fontsize-11">
            {(keywordTranslation &&
              keywordTranslation[
                "You will be prompted to enter this code each time your signature is required."
              ]) ||
              "You will be prompted to enter this code each time your signature is required."}
          </p>

          <div className="row">
            {currentUserById?.pin && (
              <div className="col-md-4">
                <label className="labels fontsize-11">
                  {(keywordTranslation &&
                    keywordTranslation["Current PIN Code"]) ||
                    "Current PIN Code"}
                </label>
                <input
                  type={showCurrentPin ? "text" : "password"}
                  className="pinfield form-control fs-12 fw-500"
                  maxLength={4}
                  {...register("current_pin")}
                />
                <img
                  src={showCurrentPin ? UnlockAsset : lockAsset}
                  alt="unlock"
                  className="img-fluid unlockImg"
                  width="14px"
                  height="15.56px"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                  style={{ marginTop: "-23px" }}
                />

                {errors.current_pin && (
                  <ErrorViewer message={errors.current_pin.message} />
                )}
              </div>
            )}

            <div className="col-md-4">
              <label className="labels fontsize-11">
                {(keywordTranslation && keywordTranslation["New PIN Code"]) ||
                  "New PIN Code"}
              </label>
              <input
                type={showNewPin ? "text" : "password"}
                className="pinfield form-control fs-12 fw-500"
                maxLength={4}
                {...register("new_pin")}
              />
              <img
                src={showNewPin ? UnlockAsset : lockAsset}
                alt="unlock"
                className="img-fluid unlockImg"
                width="14px"
                height="15.56px"
                onClick={() => setShowNewPin(!showNewPin)}
                style={{ marginTop: "-23px" }}
              />

              {errors.new_pin && (
                <ErrorViewer message={errors.new_pin.message} />
              )}
            </div>

            <div className="col-md-4">
              <label className="labels fontsize-11">
                {(keywordTranslation &&
                  keywordTranslation["Confirm PIN Code"]) ||
                  "Confirm PIN Code"}
              </label>
              <input
                type={showConfirmPin ? "text" : "password"}
                className="pinfield form-control fs-12 fw-500"
                maxLength={4}
                {...register("pin")}
              />
              <img
                src={showConfirmPin ? UnlockAsset : lockAsset}
                alt="unlock"
                className="img-fluid unlockImg"
                width="14px"
                height="15.56px"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                style={{ marginTop: "-23px" }}
              />
              {errors.pin && <ErrorViewer message={errors.pin.message} />}
            </div>
          </div>
        </div>

        <div className="mt-3 p-0">
          <SaveButton
            label={
              (keywordTranslation &&
                keywordTranslation[
                  currentUserById?.pin ? "updatebtn" : "create"
                ]) ||
              (currentUserById?.pin ? langKey.updatebtn : langKey.create)
            }
            buttonStyle="downloadbtn float-right mr-0"
            loading={
              currentUserById?.pin ? updatePinCodeLoading : addPinCodeLoading
            }
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
