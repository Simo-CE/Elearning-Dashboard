import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./login.css";
import "../../components/errorViewer/ErrorViewer.css";
import * as Yup from "yup";
import {
  WarningAsset,
  BGAsset,
  bg2Asset,
  slashAsset,
  bg3Asset,
} from "../../assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgetpasswordMutation } from "../../services/api";
import Button from "../Button/Button";
import ErrorViewer from "../errorViewer/ErrorViewer";
import { NavLink } from "react-router-dom";
import paths from "../../routes/paths";
import langkey from "../../localization/locale.json";

const ResetPassword = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [forgetPassword] = useForgetpasswordMutation();
  const [loading, setLoading] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [errorOccured, setErrorOccured] = useState(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(
        (keywordTranslation && keywordTranslation["Email is required"]) ||
          langkey.emailRequire
      )
      .email(
        (keywordTranslation && keywordTranslation["Email is invalid"]) ||
          langkey.invalidEmail
      ),
  });

  const onSubmit = (values) => {
    setLoading(true);
    forgetPassword({ data: values })
      .unwrap()
      .then((payload) => {
        setLoading(false);
        if (payload.code == "201") {
          setEmailSend(true);
          setErrorOccured(null);
        } else {
          setEmailSend(false);
          setErrorOccured(payload.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorOccured(error.data.message);
      });
  };

  let defaultValues = { email: "" };
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    handleValidation,
  } = methods;

  return (
    <div className="right-content my-auto mx-auto">
      <img src={BGAsset} alt="back" className="bg-img" />
      <img src={BGAsset} alt="" className="bg-img" />
      <img src={bg2Asset} alt="" className="bg2img" />
      <img src={slashAsset} alt="" className="slash" />
      <p className="para">
        {(keywordTranslation &&
          keywordTranslation[
            "©SafetyTracker 2022 | Un pas de géant vers l'objectif 0 accident"
          ]) ||
          langkey.safetyTracker}
      </p>
      <div className="row mx-auto">
        <div className="col-md-12 my-auto p-0">
          <div className="main-content">
            <img src={bg3Asset} alt="" className="bg3img mb-3" />
            <h2>
              {(keywordTranslation && keywordTranslation["Reset Password"]) ||
                "Reset Password"}
            </h2>
            <h6 className="mb-5">
              {(keywordTranslation &&
                keywordTranslation[
                  "Enter the email associated with your account and we will send an email with instructions."
                ]) ||
                langkey.enterEmailAssocYourAcc}
            </h6>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container p-0 f-div">
              <label className="email">
                {(keywordTranslation && keywordTranslation["Email address"]) ||
                  langkey.emailAddress}
              </label>
              <input
                {...register("email")}
                type="text"
                className={`txt error${Boolean(errors.email)}`}
                id="email"
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["Enter your email address"]) ||
                  langkey.enterEmailAddress
                }
              />
              {errors.email && (
                <div className="d-flex warning-msg2">
                  <img src={WarningAsset} className="img-fluid error2" alt="" />
                  <p className="error2">{errors.email.message}</p>
                </div>
              )}
              {emailSend && (
                <div className="d-flex warning-msg2">
                  <p style={{ color: "#37B34A" }}>
                    {(keywordTranslation &&
                      keywordTranslation["Password Sent."]) ||
                      langkey.passwordSent}
                  </p>
                </div>
              )}

              {errorOccured && (
                <ErrorViewer
                  message={
                    (keywordTranslation &&
                      keywordTranslation["We could not find this email."]) ||
                    langkey.notFindEmail
                  }
                />
              )}

              <Button
                type="submit"
                loading={loading}
                label={
                  (keywordTranslation && keywordTranslation["SEND"]) ||
                  langkey.send
                }
                buttonStyle="loginButton"
              />

              <h6 className="no-account-text">
                {(keywordTranslation &&
                  keywordTranslation[
                    "Didn't receive the reset password link?"
                  ]) ||
                  langkey.didNotReceivePass}
              </h6>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  type="submit"
                  label={
                    (keywordTranslation && keywordTranslation["Resend Now"]) ||
                    langkey.resendNow
                  }
                  buttonStyle="resendNow"
                />
                <NavLink to={paths.signin}>
                  <h6 className="back-text">
                    {(keywordTranslation &&
                      keywordTranslation["Back to login"]) ||
                      langkey.backToLogin}
                  </h6>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
