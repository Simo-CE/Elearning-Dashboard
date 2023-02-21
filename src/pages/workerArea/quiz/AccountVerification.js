import React, { useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";

import {
  crossAsset,
  crossRedCircleAsset,
  gifLoaderAsset,
  greenCircleTickAsset,
  loaderAsset,
  lockAsset,
  tickAsset,
  tickImgAsset,
  UnlockAsset,
} from "../../../assets";

import SaveButton from "../../../components/Button/Button";
import ModalComponent from "../../../components/Model/Model";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";

const AccountVerification = (props) => {
  const pin = useSelector((state) => state?.auth.userDetail?.user.pin);
  console.log(pin);

  const [showPassword, setShowPassword] = useState(false);
  const [userPin, setuserPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const validationSchema = Yup.object().shape({
    pin: Yup.string()
      .min(4, "Pin must be 4 characters")
      // .max(4, "Invalid PIN Code! Please try again")
      .required("pin is required"),
  });

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleConfirm = () => {
    props.action(Number(userPin) === 8888);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <ModalComponent
        size="sm"
        show={props.show}
        handleClose={props.handleCloseVerificationModal}
        title="Account Verification"
        className="traningDetailModal"
        // icon={crossAsset}
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="" className="fs-12 gray fw-550">
                {(keywordTranslation && keywordTranslation["enterYourPin"]) ||
                  langKey.enterYourPin}
              </label>
              <div className="input-group">
                <input
                  {...register("pin")}
                  type={showPassword ? "text" : "password"}
                  className="typetext "
                  value={userPin}
                  onChange={(e) => setuserPin(e.target.value)}
                  maxLength="4"
                />

                <img
                  src={showPassword ? UnlockAsset : lockAsset}
                  alt=""
                  className="lockImg"
                  width="18px"
                  height="22px"
                  style={{ right: "10px" }}
                  onClick={handleShowPassword}
                />
              </div>
              {errors.pin && <ErrorViewer message={errors.pin.message} />}

              {Number(userPin) === 8888 ? (
                <div className="d-flex align-items-center gap-2 mt-2">
                  <img src={greenCircleTickAsset} alt="" />
                  <p className="fs-10 fw-500 green">
                    {(keywordTranslation &&
                      keywordTranslation["verifiedSucc"]) ||
                      langKey.verifiedSucc}
                  </p>
                </div>
              ) : (
                userPin !== "" && (
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <img src={crossRedCircleAsset} alt="" />
                    <p className="fs-10 fw-500 red">
                      {(keywordTranslation &&
                        keywordTranslation["invalidPin"]) ||
                        langKey.invalidPin}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SaveButton
            label="Back to training"
            buttonStyle="cancel mr-2"
            onClick={props.handleCloseVerificationModal}
          />
          <SaveButton
            label="Confirm"
            buttonStyle="createbtn pe-3 ps-3"
            onClick={handleConfirm}
            loading={isLoading}
            disabled={userPin ? false : true}
          />
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default AccountVerification;
