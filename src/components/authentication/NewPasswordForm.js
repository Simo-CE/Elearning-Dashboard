import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import "../../components/errorViewer/ErrorViewer.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Button/Button";

import "./login.css";
import {
  WarningAsset,
  LockAsset,
  UnlockAsset,
  BGAsset,
  bg2Asset,
  slashAsset,
  bg3Asset,
} from "../../assets";
import { useNewpasswordMutation } from "../../services/api";
import langkey from "../../localization/locale.json";

const NewPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const { token_id } = useParams();
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [newPassword] = useNewpasswordMutation();

  const validationSchema = Yup.object().shape({
    passwordInput: Yup.string()
      .min(
        8,
        (keywordTranslation &&
          keywordTranslation["Password must be at least 8 characters"]) ||
          langkey.passMustBeAtLeast8Char
      )
      .required(
        (keywordTranslation && keywordTranslation["Password is required"]) ||
          langkey.passwordRequired
      ),
    confirmPasswordInput: Yup.string()
      .oneOf(
        [Yup.ref("passwordInput"), null],
        (keywordTranslation && keywordTranslation["Passwords must match"]) ||
          langkey.passwordMatch
      )
      .min(
        8,
        (keywordTranslation &&
          keywordTranslation["Password must be at least 8 characters"]) ||
          langkey.passMustBeAtLeast8Char
      )
      .required(
        (keywordTranslation && keywordTranslation["Password is required"]) ||
          langkey.passwordRequired
      ),
  });

  let defaultValues = { passwordInput: "", confirmPasswordInput: "" };

  // {(keywordTranslation &&
  //   keywordTranslation[
  //     "©SafetyTracker 2022 | Un pas de géant vers l'objectif 0 accident"
  //   ]) ||
  //   langkey.safetyTracker}

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

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values) => {
    setLoading(true);
    const data = { password: values.passwordInput, token_id: token_id };
    newPassword({ data: data })
      .unwrap()
      .then((payload) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="right-content my-auto mx-auto">
      <img src={BGAsset} alt="Background" className="bg-img" />
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
              {(keywordTranslation && keywordTranslation["New Password"]) ||
                langkey.newPassword}
            </h2>
            <h6 className="mb-5">
              {(keywordTranslation &&
                keywordTranslation["Enter the new password."]) ||
                langkey.enterNewPassword}
            </h6>
          </div>
          <h6 className="mb-3 pasword">
            {(keywordTranslation && keywordTranslation["New password"]) ||
              langkey.newPassword}
          </h6>
          <form>
            <div className="container p-0 f-div">
              <div>
                <input
                  {...register("passwordInput")}
                  type={
                    showPassword
                      ? (keywordTranslation && keywordTranslation["text"]) ||
                        langkey.text
                      : (keywordTranslation &&
                          keywordTranslation["password"]) ||
                        langkey.password
                  }
                  className="pswd"
                  id="password"
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["Enter your password"]) ||
                    langkey.enterPassword
                  }
                />
                {showPassword ? (
                  <img
                    src={UnlockAsset}
                    alt="unlock"
                    className="img-fluid unlock-icon"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <img
                    src={LockAsset}
                    alt="lock"
                    className="img-fluid lock-icon"
                    onClick={handleShowPassword}
                  />
                )}
                <h6 className="mb-1 pasword">
                  {(keywordTranslation &&
                    keywordTranslation["Confirm new password"]) ||
                    langkey.confirmPassword}
                </h6>
                <input
                  {...register("confirmPasswordInput")}
                  type={confirmPassword ? "text" : "password"}
                  className="pswd"
                  id="password"
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["Enter your password"]) ||
                    langkey.enterPassword
                  }
                  required
                  style={{ position: "relative" }}
                />
                {confirmPassword ? (
                  <img
                    src={UnlockAsset}
                    alt="unlock"
                    className="img-fluid unlock-icon"
                    onClick={() => setConfirmPassword(!confirmPassword)}
                  />
                ) : (
                  <img
                    src={LockAsset}
                    alt="lock"
                    className="img-fluid lock-icon"
                    onClick={() => setConfirmPassword(!confirmPassword)}
                  />
                )}
              </div>

              {/* {errors.confirmPasswordInput && (
                <div className="d-flex warning-msg2">
                  <img src={WarningAsset} className="img-fluid error2" alt="" />
                  <p className="error2">
                    Password must contains at least 8 characters, including
                    uppercase, lowercase, numbers, and symbols.
                  </p>
                </div>
              )} */}
              {errors.confirmPasswordInput && (
                <div className="d-flex warning-msg2">
                  <img src={WarningAsset} className="img-fluid error2" alt="" />
                  <p className="error2">
                    {(keywordTranslation &&
                      keywordTranslation["Passwords must be same."]) ||
                      langkey.samePassword}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                loading={loading}
                label={
                  (keywordTranslation && keywordTranslation["CONFIRM"]) ||
                  langkey.confirm
                }
                buttonStyle="loginButton"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordForm;
