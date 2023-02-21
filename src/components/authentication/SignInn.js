import React, { useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import "./login.css";
import "../../components/errorViewer/ErrorViewer.css";
import PATHS from "../../routes/paths";
import { loggedIn } from "../../redux/authSlice";
import { updateLocalLanguage } from "../../redux/localizationSlice";
import {
  useLoginuserMutation,
  useLanguageTranslationApiMutation,
} from "../../services/api";
import ErrorViewer from "../errorViewer/ErrorViewer";
import Button from "../Button/Button";
import {
  BGAsset,
  LockAsset,
  UnlockAsset,
  bg2Asset,
  slashAsset,
  bg3Asset,
} from "../../assets";
import { english } from "../../utils/localization";
import langKey from "../../localization/locale.json";
import { toast } from "react-toastify";
import successMsg from "../../localization/successMsgLocale.json";
import validationMessage from "../../localization/validationsLocale.json";
import successMessage from "../../localization/successMsgLocale.json";

const SignInn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorOccured, setErrorOccured] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [loginuser, { isLoading, isError }] = useLoginuserMutation();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  let defaultValues = { email: "", password: "" };

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (values) => {
    loginuser({ data: values })
      .unwrap()
      .then((payload) => {
        navigator(PATHS.dashboard);
        if (payload.status) {
          const response = {
            token: payload.token,
            user: payload.data,
          };
          dispatch(loggedIn(response));
          dispatch(
            updateLocalLanguage(
              payload?.data?.default_language?.keywordTranslation
                ? payload.data.default_language
                : english
            )
          );
          navigator(PATHS.dashboard);
          let msg =
            payload.message == "userLogin" && successMessage.userLoginSucsess;
          toast.success(msg);
        } else {
          setErrorOccured(payload.message);
        }
      })
      .catch((error) => {
        if (error?.data?.message == "inactiveCompany") {
          let msg =
            (error?.data?.message == "inactiveCompany" &&
              keywordTranslation &&
              keywordTranslation["inactiveCompany"]) ||
            validationMessage.inactiveCompany;

          setErrorOccured(msg);
        } else if (error?.data?.message == "webUser") {
          let msg2 =
            (error?.data?.message == "webUser" &&
              keywordTranslation &&
              keywordTranslation["notWebUser"]) ||
            validationMessage.notWebUser;

          setErrorOccured(msg2);
        } else if (error?.data?.message == "roleHasNotPermission") {
          let msg3 =
            (error?.data?.message == "roleHasNotPermission" &&
              keywordTranslation &&
              keywordTranslation["roleHasNotPermission"]) ||
            validationMessage.roleHasNotPermission;

          setErrorOccured(msg3);
        } else if (error?.data?.message == "credentialsFailed") {
          let msg4 =
            (error?.data?.message == "credentialsFailed" &&
              keywordTranslation &&
              keywordTranslation["credentialsFailed"]) ||
            validationMessage.credentialsFailed;

          setErrorOccured(msg4);
        } else if (error?.data?.message == "inactive") {
          let msg5 =
            (error?.data?.message == "inactive" &&
              keywordTranslation &&
              keywordTranslation["inactiveUser"]) ||
            validationMessage.inactiveUser;

          setErrorOccured(msg5);
        } else if (error?.data?.message == "auth.no_role_permission") {
          let msg6 =
            (error?.data?.message == "auth.no_role_permission" &&
              keywordTranslation &&
              keywordTranslation["roleHasNotPermission"]) ||
            validationMessage.roleHasNotPermission;

          setErrorOccured(msg6);
        }
      });
  };
  return (
    <div className="right-content my-auto mx-auto">
      <img src={BGAsset} alt="" className="bg-img" />
      <img src={bg2Asset} alt="" className="bg2img" />
      <img src={slashAsset} alt="" className="slash" />
      <p className="para">
        {(keywordTranslation &&
          keywordTranslation[
            "©SafetyTracker 2022 | Un pas de géant vers l'objectif 0 accident"
          ]) ||
          "©SafetyTracker 2022 | Un pas de géant vers l'objectif 0 accident"}
      </p>
      <div className="row mx-auto">
        <div className="col-md-12 my-auto p-0">
          <div className="main-content">
            <img src={bg3Asset} alt="" className="bg3img mb-3" />
            <h2>
              {(keywordTranslation && keywordTranslation["signIn"]) ||
                langKey.signIn}
            </h2>
            <h6 style={{ marginBottom: "55px" }}>
              {(keywordTranslation && keywordTranslation["manageSignIn"]) ||
                langKey.manageSignIn}
            </h6>
          </div>
          <form>
            <div className="container p-0 f-div">
              <label className="email">
                {(keywordTranslation && keywordTranslation["emailAddress"]) ||
                  langKey.emailAddress}
              </label>
              <input
                {...register("email")}
                type="text"
                className={`txt error${Boolean(errors.email)}`}
                id="email"
                placeholder={
                  (keywordTranslation && keywordTranslation["enterEmail"]) ||
                  langKey.enterEmail
                }
                required
              />
              {errors.email && <ErrorViewer message={errors.email.message} />}
              <div className="d-flex mt-2 align-items-center">
                <label className="pasword">
                  {(keywordTranslation && keywordTranslation["password"]) ||
                    langKey.password}
                </label>
                <Link to="/resetpassword" className="f-pasword">
                  {(keywordTranslation &&
                    keywordTranslation["forgotPassword"]) ||
                    langKey.forgotPassword}
                </Link>
              </div>
              <div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`pswd error${Boolean(errors.password)}`}
                  id="password"
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["enterPassword"]) ||
                    langKey.enterPassword
                  }
                  required
                />
                <img
                  src={showPassword ? UnlockAsset : LockAsset}
                  alt="unlock"
                  className="img-fluid unlock-icon"
                  onClick={handleShowPassword}
                />
              </div>{" "}
              {errors.password && (
                <ErrorViewer message={errors.password.message} />
              )}
              {errorOccured && <ErrorViewer message={errorOccured} />}
              <Button
                loading={isLoading}
                type="submit"
                label={
                  (keywordTranslation && keywordTranslation["signIn"]) ||
                  langKey.signIn
                }
                buttonStyle="loginButton text-uppercase"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInn;
