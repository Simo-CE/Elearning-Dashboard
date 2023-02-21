import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import "./Profile.css";
import "../../components/ResponsiveText.css";
import Button from "../../components/Button/Button";
import { exportComponentAsJPEG } from "react-component-export-image";
// import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import {
  lockAsset,
  UnlockAsset,
  userAsset,
  downloadIconAsset,
  printIconAsset,
  gifLoaderAsset,
  profilePageAsset,
  englishAsset,
  faranceAsset,
  netherlandAsset,
  companyLogoAsset,
  iconAsset,
  aidAsset,
  qrAltAsset,
  notFoundAsset,
} from "../../assets";
import ProfilTabsComponent from "./ProfileTabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../../components/Subnav.css";
import PATHS from "../../routes/paths";
import { updateLocalLanguage } from "../../redux/localizationSlice";
import { english } from "../../utils/localization";
import {
  useGetSingleUserDetailQuery,
  useGetWorkerBadgeSettingsQuery,
  useLogoutMutation,
  useNewpasswordMutation,
  useUpdateQrCodeMutation,
} from "../../services/api";
import { authSlice, userLogout } from "./../../redux/authSlice";
import { toast } from "react-toastify";
import ErrorViewer from "./../../components/errorViewer/ErrorViewer";
import QRCode from "react-qr-code";
import moment from "moment";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import ReactCardFlip from "react-card-flip";
import successMsg from "../../localization/successMsgLocale.json";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";
import { useLocation } from "react-router-dom";
const createFileName = (extension = "", ...names) => {
  if (!extension) {
    return "";
  }

  return `${names.join("")}.${extension}`;
};
const Profile = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const { id } = useSelector((state) => state.auth.userDetail.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordDiv, setShowPasswordDiv] = useState(2);
  const [showflipBadge, setShowflipBadge] = useState(false);
  const [passwordMatch, setpasswordMatch] = useState(false);
  const currentUser = useSelector((user) => user.auth.userDetail.user);
  const radioHandler = (showPasswordDiv) => {
    setShowPasswordDiv(showPasswordDiv);
  };

  let validationSchema =
    showPasswordDiv === 2
      ? Yup.object().shape({
          passwordInput: Yup.string()
            .required(
              (keywordTranslation && keywordTranslation["passwordRequired"]) ||
                validationsKey.passwordRequired
            )
            .min(
              8,
              (keywordTranslation && keywordTranslation["passwordEightChar"]) ||
                validationsKey.passwordEightChar
            )
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              (keywordTranslation && keywordTranslation["passwordContains"]) ||
                validationsKey.passwordContains
            ),
          confirmPasswordInput: Yup.string()
            .oneOf(
              [Yup.ref("passwordInput"), null],
              (keywordTranslation && keywordTranslation["passwordMustMatch"]) ||
                validationsKey.passwordMustMatch
            )
            .required(
              (keywordTranslation && keywordTranslation["passwordRequired"]) ||
                validationsKey.passwordRequired
            )
            .min(
              8,
              (keywordTranslation && keywordTranslation["passwordEightChar"]) ||
                validationsKey.passwordEightChar
            )
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              (keywordTranslation && keywordTranslation["passwordContains"]) ||
                validationsKey.passwordContains
            ),
        })
      : Yup.object().shape({
          autoPasswordInput: Yup.string()
            .required(
              (keywordTranslation && keywordTranslation["passwordRequired"]) ||
                validationsKey.passwordRequired
            )
            .min(
              8,
              (keywordTranslation && keywordTranslation["passwordEightChar"]) ||
                validationsKey.passwordEightChar
            ),
        });

  const [newPassword, { isLoading: newPasswordLoading }] =
    useNewpasswordMutation();

  const [
    updateQrCode,
    {
      isLoading: updateQrCodeLoading,
      refetch: updateQrCodeRefetch,
      isSuccess: updateQrCodeSuccess,
    },
  ] = useUpdateQrCodeMutation();

  const location = useLocation();

  const { data: getSingleUserDetail } = useGetSingleUserDetailQuery({
    params: { user_id: location?.state?.user_id },
  });

  const currentUserById = getSingleUserDetail?.data;

  const {
    data: getWorkerBadgeSettings,
    isSuccess: getWorkerBadgeSettingsSuccess,
    isLoading: getWorkerBadgeSettingsLoading,
    refetch: getWorkerBadgeSettingsRefetch,
  } = useGetWorkerBadgeSettingsQuery({
    params: { company_id: currentUserById && currentUserById?.company?.id },
  });

  const badgeSetting = getWorkerBadgeSettings?.data;

  useEffect(() => {
    getWorkerBadgeSettingsRefetch();
  }, []);

  const [generateQr, setGenerateQr] = useState();

  const updateQrCodeHandler = () => {
    updateQrCode()
      .unwrap()
      .then((payload) => {
        setGenerateQr(payload?.qr_code);
      })
      .catch((error) => {});
  };

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      uploadimg: userAsset,
      uploadsignature: userAsset,
      passwordInput: "",
      autoPasswordInput: "",
      confirmPasswordInput: "",
    },
  });

  const logoutFunc = () => {
    logout()
      .unwrap()
      .then((payload) => {
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      })
      .catch((error) => {
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      })
      .finally(() => {
        dispatch(updateLocalLanguage(english));
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      });
  };

  const onSubmit = (values) => {
    const data = {
      password:
        showPasswordDiv === 2 ? values.passwordInput : values.autoPasswordInput,
      user_id: id,
    };
    if (data) {
      setpasswordMatch(true);
      values["_method"] = "post";
    }
    newPassword({ data: data })
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["passUpdateSucsess"]) ||
          successMsg.passUpdateSucsess;
        toast.success(msg);
        logoutFunc();
      })
      .catch((error) => {});
  };

  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

  const generatePassword = () => {
    let characterList =
      createPassword(specialCharacters, 2) +
      createPassword(numbers, 2) +
      createPassword(lowerCaseLetters, 2) +
      createPassword(upperCaseLetters, 2);

    let shuffled = characterList
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    setValue("autoPasswordInput", shuffled);
  };

  const createPassword = (characterList, length) => {
    let password = "";
    const characterListLength = length;
    for (let i = 0; i < length; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  // card front Print code
  const cardFrontRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => cardFrontRef.current,
  });

  // card back print
  const cardBackRef = useRef();
  const handleCardBackPrint = useReactToPrint({
    content: () => cardBackRef.current,
  });

  const componentRef = useRef();
  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
      {
        <div
          className="col-3-div cardStyling pt-0 pb-0 pl-0 pr-0 bg-white"
          style={{}}
        >
          <div className="row  bg-white  pt-1">
            {!showflipBadge ? (
              <>
                <div>
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <div className="mt-2 d-flex align-items-center">
                        <img
                          style={{
                            objectFit: "cover",
                            borderRadius: "3px",
                          }}
                          src={
                            (currentUserById?.profile_photo ??
                              currentUser?.profile_photo) ||
                            userAsset
                          }
                          alt=""
                          width="71px"
                          height="64px"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = userAsset;
                          }}
                        />
                        <div>
                          <p className="profName fontsize-13 fs-13">
                            {currentUserById?.first_name ||
                              currentUser?.first_name}{" "}
                            {currentUserById?.last_name ||
                              currentUser?.last_name}
                          </p>

                          {currentUser.role.includes("main_admin") && (
                            <p className="proffunction fontsize-10 fs-10">
                              {currentUser?.function
                                ? currentUser?.function
                                : currentUserById?.function
                                ? currentUserById?.function
                                : "-"}
                            </p>
                          )}

                          <p className="border mt-1"></p>
                        </div>
                      </div>

                      <div className="ml-auto" style={{ marginTop: "-35px" }}>
                        {badgeSetting?.WorkerBadgeSetting?.company_logo == 1 ? (
                          <img
                            src={currentUser?.logo || notFoundAsset}
                            alt=""
                            width="80px"
                            height="24.85px"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <img
                          src={currentUser?.qr_code || generateQr || qrAltAsset}
                          alt=""
                          width="71px"
                          height="64px"
                          className="mt-1"
                          style={{ borderRadius: "3px" }}
                        />

                        <div>
                          {badgeSetting?.WorkerBadgeSetting?.phone_number ==
                          1 ? (
                            <p className="numbertxt fontsize-9 fs-9">
                              {currentUserById?.phone_number ||
                                currentUser?.phone_number}
                            </p>
                          ) : null}

                          {badgeSetting?.WorkerBadgeSetting?.email == 1 ? (
                            <p className="numbertxt fontsize-9 fs-9">
                              {currentUserById?.email || currentUser?.email}
                            </p>
                          ) : null}

                          {!currentUser.role.includes("main_admin") &&
                          badgeSetting?.WorkerBadgeSetting?.site_id == 1 ? (
                            <p className="numbertxt fontsize-9 fs-9">
                              Site:{" "}
                              {currentUserById?.entity?.name ||
                                currentUser?.entity?.name}
                            </p>
                          ) : null}
                          {/* <div className="langflags mt-1 d-flex">
                          <img
                            src={englishAsset}
                            alt=""
                            width="18px"
                            height="18px"
                            className="mr-2"
                          />
                          <img
                            src={faranceAsset}
                            alt=""
                            width="18px"
                            height="18px"
                            className="mr-2"
                          />
                          <img
                            src={netherlandAsset}
                            alt=""
                            width="18px"
                            height="18px"
                            className="mr-2"
                          />
                        </div> */}
                        </div>
                      </div>

                      {!currentUser.role.includes("main_admin") &&
                        currentUser.role.includes("super_admin") && (
                          <div
                            className="row mr-0"
                            style={{ marginTop: "-25px" }}
                          >
                            {currentUser?.user_certificates?.length &&
                            badgeSetting?.WorkerBadgeSetting
                              ?.complete_training == 1 ? (
                              <div className="col-4 p-0">
                                <img
                                  src={iconAsset}
                                  alt=""
                                  width="28px"
                                  height="28px"
                                  className="float-right"
                                />
                              </div>
                            ) : null}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      {badgeSetting?.WorkerBadgeSetting?.psy_photo_id == 1 ? (
                        <div>
                          <img
                            src={badgeSetting?.company?.psy_photo || userAsset}
                            alt="profile"
                            width="46px"
                            height="46px"
                          />
                        </div>
                      ) : null}
                      <div>
                        {badgeSetting?.WorkerBadgeSetting?.psy_name_id == 1 ? (
                          <>
                            <p className="profName fontsize-13 fs-13">
                              {badgeSetting?.company?.psy_name ?? "—"}
                            </p>
                            <p className="proffunction fontsize-10 fs-10">
                              {badgeSetting?.company?.psy_job
                                ? badgeSetting?.company?.psy_job
                                : "—"}
                            </p>
                          </>
                        ) : null}
                        <p className="border"></p>
                        {badgeSetting?.WorkerBadgeSetting?.psy_phone_no_id ==
                        1 ? (
                          <p className="numbertxt fontsize-9 fs-9">
                            {badgeSetting?.company?.psy_phone_no ?? "—"}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="d-flex align-items-center"
                      style={{ marginTop: "-20px" }}
                    >
                      {badgeSetting?.WorkerBadgeSetting?.emergency_icon_id ==
                      1 ? (
                        <div>
                          <img
                            src={
                              badgeSetting?.company?.emergency_icon ||
                              notFoundAsset
                            }
                            width="18px"
                            height="17px"
                          />
                        </div>
                      ) : null}

                      {badgeSetting?.WorkerBadgeSetting
                        ?.emergency_phone_no_id == 1 ? (
                        <div>
                          <p className="numbertxt fontsize-9 fs-9">
                            {badgeSetting?.company?.emergency_phone_no ?? "—"}
                          </p>
                          <p className="proffunction fontsize-10 fs-10">
                            Call for help
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {!currentUser.role.includes("main_admin") &&
                  currentUser.role.includes("super_admin") && (
                    <div className="row mt-3 m-0">
                      {currentUser?.user_certificates?.length &&
                      badgeSetting?.WorkerBadgeSetting?.complete_training ==
                        1 ? (
                        <div className="col-2 mb-2">
                          <img
                            src={iconAsset}
                            alt=""
                            width="28px"
                            height="28px"
                            className=""
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      }
    </div>
  ));

  return (
    <>
      <div
        className="mt-2 mb-5 sideMargin-1024"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <div className="row m-0">
          <div className="col-lg-8 col-md-12 col-9-div mt-4 rowStyling">
            <ProfilTabsComponent />
          </div>

          <div className="col-lg-4 col-md-12 mt-4 pr-0 pl-md-0 pl-lg-4">
            <div className="col-3-div mb-3 colStyling">
              <div className="d-flex">
                <input
                  type="radio"
                  name="radioBtn"
                  checked={showPasswordDiv === 1}
                  onClick={(e) => {
                    radioHandler(1);
                    generatePassword();
                  }}
                />
                <p className="mb-0 ml-2 passGenerate fs-11">
                  {(keywordTranslation &&
                    keywordTranslation["autoGenPassword"]) ||
                    langKey.autoGenPassword}
                </p>
              </div>
              <div className="d-flex mt-2">
                <input
                  type="radio"
                  name="radioBtn"
                  checked={showPasswordDiv === 2}
                  onClick={(e) => radioHandler(2)}
                />
                <p className="mb-0 ml-2 passGenerate fs-11">
                  {(keywordTranslation &&
                    keywordTranslation["creatPassword"]) ||
                    langKey.creatPassword}
                </p>
              </div>

              {showPasswordDiv === 2 && (
                <div>
                  <div>
                    <label className="labels fontsize-11 mt-4">
                      {(keywordTranslation && keywordTranslation["password"]) ||
                        langKey.password}
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control rounded-0"
                      style={{ height: "30px" }}
                      autoComplete="off"
                      {...register("passwordInput")}
                    />

                    <img
                      src={showPassword ? UnlockAsset : lockAsset}
                      alt="unlock"
                      className="img-fluid unlockImg"
                      width="14px"
                      height="15.56px"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {errors.passwordInput && (
                    <ErrorViewer message={errors.passwordInput.message} />
                  )}
                  <div>
                    <label className="labels fontsize-11 mt-3">
                      {(keywordTranslation &&
                        keywordTranslation["confirmPassword"]) ||
                        langKey.confirmPassword}
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control rounded-0"
                      style={{ height: "30px" }}
                      autoComplete="off"
                      {...register("confirmPasswordInput")}
                    />

                    <img
                      src={showConfirmPassword ? UnlockAsset : lockAsset}
                      alt="unlock"
                      className="img-fluid unlockImg"
                      width="14px"
                      height="15.56px"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                  {errors.confirmPasswordInput && (
                    <ErrorViewer
                      message={errors.confirmPasswordInput.message}
                    />
                  )}
                  {passwordMatch && (
                    <p className="match_password mt-2">
                      {" "}
                      {(keywordTranslation &&
                        keywordTranslation["passwordMatched"]) ||
                        langKey.passwordMatched}
                    </p>
                  )}
                </div>
              )}

              {showPasswordDiv === 1 && (
                <div>
                  <div>
                    <label className="labels fontsize-11">
                      {(keywordTranslation && keywordTranslation["password"]) ||
                        langKey.password}
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control rounded-0"
                      autoComplete="off"
                      style={{ height: "30px" }}
                      {...register("autoPasswordInput")}
                    />

                    <img
                      src={showPassword ? UnlockAsset : lockAsset}
                      alt="unlock"
                      className="img-fluid unlockImg"
                      width="14px"
                      height="15.56px"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>

                  {errors.autoPasswordInput && (
                    <ErrorViewer message={errors.autoPasswordInput.message} />
                  )}
                </div>
              )}

              {!newPasswordLoading ? (
                <Button
                  label={
                    (keywordTranslation &&
                      keywordTranslation["resetPassword"]) ||
                    langKey.resetPassword
                  }
                  buttonStyle="resetpassword w-100 mt-3"
                  onClick={handleSubmit(onSubmit)}
                />
              ) : (
                <Button
                  icon={gifLoaderAsset}
                  buttonStyle="resetpassword w-100 mt-3"
                  onClick={handleSubmit(onSubmit)}
                />
              )}

              <p className="resetpasstext mt-3 fontsize-12 mb-1 text-center fs-12">
                {(keywordTranslation && keywordTranslation["resetEmail"]) ||
                  langKey.resetEmail}
              </p>
            </div>

            {!currentUser.role.includes("main_admin") && (
              <div className="col-3-div cardStyling bg-white p-0 pt-3 pb-3">
                <div className="row" style={{ height: "170px" }}>
                  <ReactCardFlip
                    isFlipped={showflipBadge}
                    flipDirection="horizontal"
                  >
                    <>
                      <div>
                        <div className="col-12">
                          <div className="d-flex align-items-center">
                            <div className="mt-2 d-flex align-items-center">
                              <img
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "3px",
                                }}
                                src={
                                  (currentUserById?.profile_photo ??
                                    currentUser?.profile_photo) ||
                                  userAsset
                                }
                                alt=""
                                width="71px"
                                height="64px"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = userAsset;
                                }}
                              />
                              <div>
                                <p className="profName fontsize-13 fs-13">
                                  {currentUserById?.first_name ||
                                    currentUser?.first_name}{" "}
                                  {currentUserById?.last_name ||
                                    currentUser?.last_name}
                                </p>

                                {currentUser.role.includes("main_admin") && (
                                  <p className="proffunction fontsize-10 fs-10">
                                    {currentUser?.function
                                      ? currentUser?.function
                                      : currentUserById?.function
                                      ? currentUserById?.function
                                      : "-"}
                                  </p>
                                )}

                                <p className="border mt-1"></p>
                              </div>
                            </div>

                            <div
                              className="ml-auto"
                              style={{ marginTop: "-35px" }}
                            >
                              {badgeSetting?.WorkerBadgeSetting?.company_logo ==
                              1 ? (
                                <img
                                  src={currentUser?.logo || notFoundAsset}
                                  alt=""
                                  width="80px"
                                  height="24.85px"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mt-4">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <img
                                src={
                                  currentUser?.qr_code ||
                                  generateQr ||
                                  qrAltAsset
                                }
                                alt=""
                                width="71px"
                                height="64px"
                                className="mt-1"
                                style={{ borderRadius: "3px" }}
                              />

                              <div>
                                {badgeSetting?.WorkerBadgeSetting
                                  ?.phone_number == 1 ? (
                                  <p className="numbertxt fontsize-9 fs-9">
                                    {currentUserById?.phone_number ||
                                      currentUser?.phone_number}
                                  </p>
                                ) : null}

                                {badgeSetting?.WorkerBadgeSetting?.email ==
                                1 ? (
                                  <p className="numbertxt fontsize-9 fs-9">
                                    {currentUserById?.email ||
                                      currentUser?.email}
                                  </p>
                                ) : null}

                                {!currentUser.role.includes("main_admin") &&
                                badgeSetting?.WorkerBadgeSetting?.site_id ==
                                  1 ? (
                                  <p className="numbertxt fontsize-9 fs-9">
                                    {(keywordTranslation &&
                                      keywordTranslation["site"]) ||
                                      langKey.site}
                                    :{" "}
                                    {currentUserById?.entity?.name ||
                                      currentUser?.entity?.name}
                                  </p>
                                ) : null}
                                {/* <div className="langflags mt-1 d-flex">
                                <img
                                  src={englishAsset}
                                  alt=""
                                  width="18px"
                                  height="18px"
                                  className="mr-2"
                                />
                                <img
                                  src={faranceAsset}
                                  alt=""
                                  width="18px"
                                  height="18px"
                                  className="mr-2"
                                />
                                <img
                                  src={netherlandAsset}
                                  alt=""
                                  width="18px"
                                  height="18px"
                                  className="mr-2"
                                />
                              </div> */}
                              </div>
                            </div>

                            {!currentUser.role.includes("main_admin") &&
                              currentUser.role.includes("super_admin") && (
                                <div
                                  className="row mr-0"
                                  style={{ marginTop: "-25px" }}
                                >
                                  {currentUser?.user_certificates?.length &&
                                  badgeSetting?.WorkerBadgeSetting
                                    ?.complete_training == 1 ? (
                                    <div className="col-4 p-0">
                                      <img
                                        src={iconAsset}
                                        alt=""
                                        width="28px"
                                        height="28px"
                                        className="float-right"
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                    <>
                      <div className="col-12">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            {badgeSetting?.WorkerBadgeSetting?.psy_photo_id ==
                            1 ? (
                              <div>
                                <img
                                  src={
                                    badgeSetting?.company?.psy_photo ||
                                    userAsset
                                  }
                                  alt="profile"
                                  width="46px"
                                  height="46px"
                                />
                              </div>
                            ) : null}
                            <div>
                              {badgeSetting?.WorkerBadgeSetting?.psy_name_id ==
                              1 ? (
                                <>
                                  <p className="profName fontsize-13 fs-13">
                                    {badgeSetting?.company?.psy_name ?? "—"}
                                  </p>
                                  <p className="proffunction fontsize-10 fs-10">
                                    {badgeSetting?.company?.psy_job
                                      ? badgeSetting?.company?.psy_job
                                      : "—"}
                                  </p>
                                </>
                              ) : null}
                              <p className="border"></p>
                              {badgeSetting?.WorkerBadgeSetting
                                ?.psy_phone_no_id == 1 ? (
                                <p className="numbertxt fontsize-9 fs-9">
                                  {badgeSetting?.company?.psy_phone_no ?? "—"}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div
                            className="d-flex align-items-center"
                            style={{ marginTop: "-20px" }}
                          >
                            {badgeSetting?.WorkerBadgeSetting
                              ?.emergency_icon_id == 1 ? (
                              <div>
                                <img
                                  src={
                                    badgeSetting?.company?.emergency_icon ||
                                    notFoundAsset
                                  }
                                  width="18px"
                                  height="17px"
                                />
                              </div>
                            ) : null}

                            {badgeSetting?.WorkerBadgeSetting
                              ?.emergency_phone_no_id == 1 ? (
                              <div>
                                <p className="numbertxt fontsize-9 fs-9">
                                  {badgeSetting?.company?.emergency_phone_no ??
                                    "—"}
                                </p>
                                <p className="proffunction fontsize-10 fs-10">
                                  {(keywordTranslation &&
                                    keywordTranslation["callForHelp"]) ||
                                    langKey.callForHelp}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {!currentUser.role.includes("main_admin") &&
                        currentUser.role.includes("super_admin") && (
                          <div className="row mt-3 m-0">
                            {currentUser?.user_certificates?.length &&
                            badgeSetting?.WorkerBadgeSetting
                              ?.complete_training == 1 ? (
                              <div className="col-2 mb-2">
                                <img
                                  src={iconAsset}
                                  alt=""
                                  width="28px"
                                  height="28px"
                                  className=""
                                />
                              </div>
                            ) : null}
                          </div>
                        )}
                    </>
                  </ReactCardFlip>
                </div>
              </div>
            )}

            {!currentUser.role.includes("main_admin") && (
              <div className="row">
                {/* <div className="col-md-3 col-lg-6">
                <Button
                  label={
                    (keywordTranslation && keywordTranslation["download"]) ||
                    langKey.download
                  }
                  icon={downloadIconAsset}
                  imgStyle="download-icon"
                  buttonStyle="downloadbtn w-100 mt-2"
                  // onClick={downloadCard}
                  // onClick={() => exportComponentAsJPEG(componentRef)}
                />
              </div> */}

                {!showflipBadge && (
                  <div className="col-md-3 col-lg-6">
                    <Button
                      label={
                        (keywordTranslation && keywordTranslation["print"]) ||
                        langKey.print
                      }
                      icon={printIconAsset}
                      imgStyle="print-icon"
                      buttonStyle="printbtn w-100 mt-2"
                      onClick={handlePrint}
                    />
                  </div>
                )}
                {showflipBadge && (
                  <div className="col-md-3 col-lg-6">
                    <Button
                      label={
                        (keywordTranslation && keywordTranslation["print"]) ||
                        langKey.print
                      }
                      icon={printIconAsset}
                      imgStyle="print-icon"
                      buttonStyle="printbtn w-100 mt-2"
                      onClick={handleCardBackPrint}
                    />
                  </div>
                )}

                <div className="col-md-3 col-lg-6">
                  <Button
                    label={
                      (keywordTranslation &&
                        keywordTranslation["regenerateQr"]) ||
                      langKey.regenerateQr
                    }
                    buttonStyle="nextbtn w-100 mt-2"
                    onClick={updateQrCodeHandler}
                    loading={updateQrCodeLoading}
                  />
                </div>

                <div className="col-md-3 col-lg-6">
                  {!currentUser.role.includes("main_admin") && (
                    <Button
                      label={
                        showflipBadge
                          ? (keywordTranslation &&
                              keywordTranslation["front"]) ||
                            langKey.front
                          : (keywordTranslation &&
                              keywordTranslation["backBtn"]) ||
                            langKey.backBtn
                      }
                      buttonStyle="nextbtn w-100 mt-2"
                      onClick={() => setShowflipBadge(!showflipBadge)}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="downloadCardImg">
              <ComponentToPrint ref={componentRef} />
            </div>

            {/* {
              <div
                className="col-3-div cardStyling pt-0 pb-1 pl-0 pr-0"
                id="cardBackground"
                ref={ref}
              // style={{
              //   position: "fixed",
              //   bottom: "-200px",
              // }}
              >
                <div className="row  bg-white pb-3 pt-1">
                  {!showflipBadge ? (
                    <>
                      <div ref={cardFrontRef} style={{ width: "350px", padding: "0px" }}>
                        <div className="col-12 pt-2">
                          <div className="d-flex align-items-center">
                            <img
                              src={currentUser?.profile_photo || userAsset}
                              alt=""
                              width="71px"
                              height="64px"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = userAsset;
                              }}
                            />
                            <div>
                              <p className="profName fontsize-13 fs-13">
                                {currentUser?.first_name}{" "}
                                {currentUser?.last_name}
                              </p>

                              {currentUser.role.includes("main_admin") && (
                                <p className="proffunction fontsize-10 fs-10">
                                  {currentUser?.function
                                    ? currentUser?.function
                                    : "—"}
                                </p>
                              )}

                              <p className="border mt-1"></p>
                            </div>

                            <div
                              className="ml-auto"
                              style={{ marginTop: "-35px" }}
                            >
                              <img
                                src={companyLogoAsset}
                                alt=""
                                width="80px"
                                height="24.85px"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mt-4">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <div>
                                <p className="numbertxt fontsize-9 fs-9">
                                  {currentUser?.phone_number}
                                </p>
                                <p className="numbertxt fontsize-9 fs-9">
                                  {currentUser?.email}
                                </p>

                                {!currentUser.role.includes("main_admin") && (
                                  <p className="numbertxt fontsize-9 fs-9">
                                    Site: Hainaut
                                  </p>
                                )}
                                <div className="langflags mt-1 d-flex">
                                  <img
                                    src={englishAsset}
                                    alt=""
                                    width="18px"
                                    height="18px"
                                    className="mr-2"
                                  />
                                  <img
                                    src={faranceAsset}
                                    alt=""
                                    width="18px"
                                    height="18px"
                                    className="mr-2"
                                  />
                                  <img
                                    src={netherlandAsset}
                                    alt=""
                                    width="18px"
                                    height="18px"
                                    className="mr-2"
                                  />
                                </div>
                              </div>
                            </div>

                            {!currentUser.role.includes("main_admin") &&
                              currentUser.role.includes("super_admin") && (
                                <div
                                  className="row mr-0"
                                  style={{ marginTop: "-25px" }}
                                >
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      src={iconAsset}
                                      alt=""
                                      width="28px"
                                      height="28px"
                                      className="float-right"
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div ref={cardBackRef} style={{ width: "350px" }}>
                        <div className="col-12 pt-2">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <div className="">
                                <img
                                  src={profilePageAsset}
                                  alt="profile"
                                  width="46px"
                                  height="46px"
                                />
                              </div>
                              <div>
                                <p className="profName fontsize-13 fs-13">
                                  Fletcher LABROSSE
                                </p>
                                <p className="proffunction fontsize-10 fs-10">
                                  Psychologist
                                </p>
                                <p className="border"></p>
                                <p className="numbertxt fontsize-9 fs-9">
                                  06 11 00 00 00
                                </p>
                              </div>
                            </div>

                            <div
                              className="d-flex align-items-center"
                              style={{ marginTop: "-20px" }}
                            >
                              <div>
                                <img src={aidAsset} alt="" />
                              </div>
                              <div>
                                <p className="numbertxt fontsize-9 fs-9">
                                  06 11 00 00 00
                                </p>
                                <p className="proffunction fontsize-10 fs-10">
                                  {(keywordTranslation &&
                                    keywordTranslation["callForHelp"]) ||
                                    langKey.callForHelp}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2 m-0">
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                          <div className="col-2 mb-2">
                            <img
                              src={iconAsset}
                              alt=""
                              width="28px"
                              height="28px"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            } */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
