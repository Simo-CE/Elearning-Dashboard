import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ImageViewer from "../../components/ImageViewer";
import AlertComponent from "../../components/alert/Alert";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userAsset,
  emptyImageAsset,
  notFoundAsset,
  downarrowAsset,
  multidropdownAsset,
} from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import "../../components/ResponsiveText.css";
import {
  useNativeOtherLangaugesDropdownQuery,
  useEntityDropdownQuery,
  useUpdateProfileMutation,
  useGetFunctionDropdownQuery,
  useLanguageDropDownQuery,
  useReportToDropDownQuery,
  useGetDepartmentDropdownQuery,
  useGetSingleUserDetailQuery,
} from "../../services/api";
import { updateUserProfile } from "./../../redux/authSlice";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import DropdownResultsTransformer from "../../utils/DropdownResults";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import InputMasks from "../../components/inputMask/InputMask";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";
import { useLocation } from "react-router-dom";

const DATA_FORMATS = ["image/jpg", "image/png"];

export const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const Personalinfo = () => {
  const dispatch = useDispatch();
  const [otherLanguages, setOtherLanguages] = useState([]);

  const location = useLocation();

  const { data: getSingleUserDetail, refetch: getSingleUserDetailRefetch } =
    useGetSingleUserDetailQuery({
      params: { user_id: location?.state?.user_id },
    });

  const currentUser = useSelector((user) => user.auth.userDetail.user);

  const currentUserById = getSingleUserDetail?.data;

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [
    updateProfile,
    {
      isLoading: updateProfileLoading,
      isError: updateProfileIsError,
      isSuccess: updateProfileSuccess,
      reset: updateProfileReset,
      error: updateProfileError,
    },
  ] = useUpdateProfileMutation();

  const { data: nativeOtherLangauge } = useNativeOtherLangaugesDropdownQuery();
  const NativeLanguages = nativeOtherLangauge?.data?.NativeLanguage;
  const OtherLanguages = nativeOtherLangauge?.data?.OtherLanguage;

  const {
    data: siteList,
    isLoading: siteLoading,
    isFetching: siteFetching,
    isError: siteError,
  } = useEntityDropdownQuery(currentUser?.company?.id || "");

  const {
    data: functionList,
    isLoading: functionLoading,
    isFetching: functionFetching,
    isError: functionError,
  } = useGetFunctionDropdownQuery(currentUser?.company?.id || "");

  const {
    data: languageDropdown,
    isLoading: languageDropdownLoading,
    isFetching: languageDropdownFetching,
    isError: languageDropdownError,
  } = useLanguageDropDownQuery();

  const {
    data: reportToList,
    isLoading: reportToListLoading,
    isError: reportToListError,
  } = useReportToDropDownQuery(currentUser?.company?.id || "");

  const {
    data: departmentList,
    isLoading: departmentLoading,
    isFetching: departmentFetching,
    isError: departmentError,
  } = useGetDepartmentDropdownQuery(currentUser?.company?.id || "");

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .required(
        (keywordTranslation && keywordTranslation["firstNameRequired"]) ||
          validationsKey.firstNameRequired
      ),
    last_name: yup
      .string()
      .required(
        (keywordTranslation && keywordTranslation["lastNameRequired"]) ||
          validationsKey.lastNameRequired
      ),
    email: yup
      .string()
      .required(
        (keywordTranslation && keywordTranslation["emailRequired"]) ||
          validationsKey.emailRequired
      )
      .email(
        (keywordTranslation && keywordTranslation["emailInvalid"]) ||
          validationsKey.emailInvalid
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    getValues,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {},
  });

  const values = getValues();
  let {
    profile_photo,
    signature,
    company_id,
    site_id,
    nativelanguage_id,
    phone_number,
    first_name,
    last_name,
  } = watch();

  const onSubmit = (data = values) => {
    let formData = new FormData();
    formData.append("_method", "put");

    for (const field in data) {
      if (field == "profile_photo" && profile_photo == "") {
        formData.append(field, "");
      } else if (field == "profile_photo" && typeof data[field] === "string") {
      } else if (field == "signature" && signature == "") {
        formData.append(field, "");
      } else if (field == "signature" && typeof data[field] === "string") {
      } else {
        if (data[field]) {
          formData.append(field, data[field]);
        }
      }
    }

    if (!currentUser.role.includes("main_admin")) {
      if (otherLanguages.length) {
        otherLanguages.map((data, index) =>
          formData.append(`otherlanguage_id[${index}]`, data.value)
        );
      }
    }

    updateProfile(formData)
      .unwrap()

      .then((payload) => {
        if (payload.status) {
          dispatch(updateUserProfile(payload.data));
          //  toast.success(keywordTranslation && keywordTranslation["profileUpdateSucsess"] || successMsg.profileUpdateSucsess);
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["profileUpdateSucsess"]) ||
            successMsg.profileUpdateSucsess;
          toast.success(msg);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (currentUserById && currentUserById !== undefined) {
      let {
        first_name,
        last_name,
        acronym,
        birthday,
        phone_number,
        email,
        profile_photo,
        signature,
        otherlanguage_id,
        nativelanguage_id,
        company_id,
        phone,
      } = currentUserById;
      phone_number = ++phone_number;

      reset({
        first_name,
        last_name,
        acronym,
        birthday,
        phone_number,
        email,
        profile_photo,
        signature,
        otherlanguage_id,
        nativelanguage_id,
        company_id,
        phone,
      });

      getSingleUserDetailRefetch();
    }
  }, [currentUserById, updateProfileSuccess]);

  useEffect(() => {
    let {
      first_name,
      last_name,
      acronym,
      birthday,
      phone_number,
      email,
      profile_photo,
      signature,
      otherlanguage_id,
      nativelanguage_id,
      company_id,
      phone,
    } = currentUser;
    phone_number = ++phone_number;

    if (currentUser.role.includes("main_admin")) {
      reset({
        first_name,
        last_name,
        birthday,
        profile_photo,
        signature,
        phone_number,
        email,
        phone,
      });
    } else {
      reset({
        first_name,
        last_name,
        acronym,
        birthday,
        phone_number,
        email,
        profile_photo,
        signature,
        otherlanguage_id,
        nativelanguage_id,
        company_id,
        phone,
      });
    }
  }, [currentUser]);

  const profileImageUploadHandler = (e) => {
    let { name, files } = e.target;

    if (e.target.files[0].size <= 2097152) {
      setValue(name, files[0]);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  const dropdownHandler = (e) => {
    let { name, value } = e.target;
    setValue(name, +value);
  };

  const searchDropdownHandler = (e) => {
    let { name, value } = e;
    setValue(name, +value);
  };

  function validDate() {
    var today = new Date().toISOString().split("T")[0];
    document
      .getElementsByClassName("futureDateRestrict")[0]
      .setAttribute("max", today);
  }

  const [inputImageValue, setInputImageValue] = useState();
  const [inputSignatureValue, setInputSignatureValue] = useState();
  const resetInputImage = () => {
    setInputImageValue("");
    setValue("profile_photo", "");
  };

  const resetInputSignature = () => {
    setInputSignatureValue("");
    setValue("signature", "");
  };

  useEffect(() => {
    if (first_name || last_name) {
      let [firstChrac, middleChrac, lastChrac] = ["", "", ""];

      firstChrac = first_name ? first_name.slice(0, 1) : "";
      middleChrac = last_name ? last_name.slice(0, 1) : "";
      if (last_name?.length > 1) {
        lastChrac = last_name.slice(-1);
      }
      setValue("acronym", firstChrac + middleChrac + lastChrac);
    }
  }, [first_name, last_name]);

  useEffect(() => {
    if (currentUser?.userother_langauge?.length) {
      setOtherLanguages(currentUser.userother_langauge);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.userother_langauge?.length) {
        let other_languagesz = currentUser.userother_langauge;
        let mylang =
          typeof other_languagesz == "undefined"
            ? []
            : other_languagesz.map(({ name, id }) => {
                return {
                  label: name,
                  value: id,
                };
              });
        setOtherLanguages([...mylang]);
      }
    }
  }, [currentUser]);

  const handleInput = ({ target: { value } }) => {
    setValue("phone_number", value);
  };

  const reNameStrings = {
    allItemsAreSelected:
      (keywordTranslation && keywordTranslation["selectAllLanguage"]) ||
      langKey.selectAllLanguage,
    selectSomeItems:
      (keywordTranslation && keywordTranslation["selectLanguage"]) ||
      langKey.selectLanguage,
  };

  const ArrowRenderer = ({ expanded }) => (
    <>
      {expanded ? (
        <img src={multidropdownAsset} />
      ) : (
        <img src={multidropdownAsset} />
      )}
    </>
  );

  return (
    <>
      {updateProfileIsError && (
        <AlertComponent
          error={true}
          message={updateProfileError.data.message}
          closeHandler={updateProfileReset}
        />
      )}

      <div className="m-3">
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <p className="imgHeading fs-12">
              {(keywordTranslation && keywordTranslation["photo"]) ||
                langKey.photo}
            </p>

            <p className="imgSizeText mb-0 mt-1 fs-11">
              {(keywordTranslation && keywordTranslation["imageSizeText"]) ||
                langKey.imageSizeText}
            </p>
            <div className="d-flex align-items-center mt-3 mb-3">
              <ImageViewer
                src={profile_photo || userAsset}
                alt="user"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = userAsset;
                }}
                width="90px"
                height="90px"
                className="rounded-circle"
              />
              <div className="ml-2 text-center position-relative">
                <Button
                  label={
                    (keywordTranslation && keywordTranslation["uploadImage"]) ||
                    langKey.uploadImage
                  }
                  buttonStyle="uploadimgbtn ml-0 pl-4 pr-4"
                />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  className="file_upload"
                  value={inputImageValue}
                  name="profile_photo"
                  onInput={profileImageUploadHandler}
                />
                <p
                  className="removeImg mb-0 mt-2 fs-11"
                  onClick={resetInputImage}
                >
                  {(keywordTranslation && keywordTranslation["removeImage"]) ||
                    langKey.removeImage}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <p className="imgHeading fs-12">
              {(keywordTranslation && keywordTranslation["signature"]) ||
                langKey.signature}
            </p>
            <p className="imgSizeText mb-0 opacity-0 fs-11">
              {(keywordTranslation &&
                keywordTranslation["Only JPG, PNG files are allowed."]) ||
                "Only JPG, PNG files are allowed. Image must be less than 2 MB"}
            </p>
            <div className="d-flex align-items-center mb-3 mt-3">
              <div>
                <ImageViewer
                  src={signature || emptyImageAsset}
                  alt="user"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = notFoundAsset;
                  }}
                  width="90px"
                  height="90px"
                />
              </div>
              <div className="ml-2 text-center position-relative">
                <Button
                  label={
                    (keywordTranslation &&
                      keywordTranslation["uploadSignature"]) ||
                    langKey.uploadSignature
                  }
                  buttonStyle="uploadimgbtn ml-0 pl-3 pr-3"
                />
                <input
                  name="signature"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  value={inputSignatureValue}
                  className="file_upload ml-2"
                  onInput={profileImageUploadHandler}
                />
                <p
                  className="removeImg mb-0 mt-2 fs-11"
                  onClick={resetInputSignature}
                >
                  {(keywordTranslation &&
                    keywordTranslation["removeSignature"]) ||
                    langKey.removeSignature}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-2 pr-lg-0">
            <label className="labels">
              {(keywordTranslation && keywordTranslation["firstName"]) ||
                langKey.firstName}
            </label>
            <br />
            <input
              {...register("first_name")}
              type="text"
              className="profileinputs mr-2 form-control"
              placeholder="Blaise"
            />
            {errors.first_name && (
              <ErrorViewer message={errors.first_name.message} />
            )}
          </div>

          <div className="col-2 pr-lg-0">
            <label className="labels">
              {(keywordTranslation && keywordTranslation["lastName"]) ||
                langKey.lastName}
            </label>
            <br />
            <input
              {...register("last_name")}
              type="text"
              className="profileinputs mr-2 form-control"
              placeholder="Defloo"
            />
            {errors.last_name && (
              <ErrorViewer message={errors.last_name.message} />
            )}
          </div>
          {!currentUser.role.includes("main_admin") && (
            <div className="col-2 pr-lg-0">
              <label className="labels">
                {(keywordTranslation && keywordTranslation["acronym"]) ||
                  langKey.acronym}
              </label>
              <br />
              <input
                {...register("acronym")}
                type="text"
                className="profileinputs mr-2 form-control text-uppercase"
                placeholder="BDO"
                readOnly
              />
            </div>
          )}

          <div className="col-3 pr-lg-0">
            <label className="labels">
              {(keywordTranslation && keywordTranslation["birthday"]) ||
                langKey.birthday}
            </label>
            <br />
            <input
              {...register("birthday")}
              type="date"
              onClick={validDate}
              className="profileinputs mr-2 form-control futureDateRestrict"
            />
          </div>

          <div className="col-3">
            <label className="labels">
              {(keywordTranslation && keywordTranslation["phoneNumber"]) ||
                langKey.phoneNumber}
            </label>
            <br />
            <div className="profilenumber h-29px">
              <InputMasks
                mask="99/99/9999"
                value={
                  phone_number ||
                  currentUserById?.phone_number ||
                  currentUser?.phone_number
                }
                onChange={handleInput}
              >
                <input
                  {...register("phone_number")}
                  type="number"
                  className="typephone mr-2 form-control"
                  placeholder="+32 0 000 00 00"
                />
              </InputMasks>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4 pr-lg-0">
            <label className="labels">
              {(keywordTranslation && keywordTranslation["email"]) ||
                langKey.email}
            </label>
            <br />
            <input
              {...register("email")}
              type="email"
              className="profileinputs  mr-2 form-control"
              placeholder="blaise.defloo@newelec.be"
              readOnly
            />
          </div>
          {!currentUser.role.includes("main_admin") && (
            <>
              <div className="col-4 pr-lg-0">
                <label className="labels">
                  {(keywordTranslation && keywordTranslation["company"]) ||
                    langKey.company}
                </label>
                <br />
                <select
                  className="form-select profileinputs  mr-2 w-100"
                  disabled
                  defaultValue={company_id}
                  name="company_id"
                  onChange={dropdownHandler}
                >
                  <option value="">{currentUser?.company?.name}</option>
                </select>
              </div>

              <div className="col-4">
                <label className="labels">
                  {(keywordTranslation && keywordTranslation["site"]) ||
                    langKey.site}
                </label>
                <br />
                <div className="profileDropdowns h-29px">
                  <SearchableDropdown
                    name="site_id"
                    selectedValue={currentUserById?.entity?.id || site_id}
                    placeholder={
                      currentUserById?.entity?.name ||
                      currentUser?.entity?.name ||
                      (keywordTranslation &&
                        keywordTranslation["selectSite"]) ||
                      langKey.selectSite
                    }
                    options={siteList}
                    changeHandler={(value) => setValue("site_id", value)}
                    e={true}
                  />
                </div>
              </div>

              {currentUser.role.includes("super_admin") && (
                <div className="col-4 pr-lg-0">
                  <label className="labels">
                    {(keywordTranslation && keywordTranslation["function"]) ||
                      langKey.function}
                  </label>
                  <br />
                  <div className="profileDropdowns h-29px">
                    <SearchableDropdown
                      name="function_id"
                      placeholder={
                        currentUser?.function?.name ||
                        (keywordTranslation &&
                          keywordTranslation["selectFunction"]) ||
                        langKey.selectFunction
                      }
                      options={functionList}
                      changeHandler={searchDropdownHandler}
                      e={true}
                    />
                  </div>
                </div>
              )}

              <div className="col-4 pr-lg-0">
                <label className="labels">
                  {(keywordTranslation && keywordTranslation["role"]) ||
                    langKey.role}
                </label>
                <br />
                <select
                  className="form-select profileinputs mr-2 w-100 text-capitalize"
                  disabled
                >
                  <option value="">
                    {currentUserById?.role[0] ||
                      currentUser?.role[0] ||
                      (keywordTranslation &&
                        keywordTranslation["selectRole"]) ||
                      langKey.selectRole}
                  </option>
                </select>
              </div>
            </>
          )}
        </div>
        {!currentUser.role.includes("main_admin") && (
          <>
            <div className="row mt-3">
              {currentUser.role.includes("super_admin") && (
                <>
                  <div className="col-4 pr-lg-0">
                    <label className="labels">
                      {(keywordTranslation &&
                        keywordTranslation["department"]) ||
                        langKey.department}
                    </label>
                    <br />
                    <div className="profileDropdowns h-29px">
                      <SearchableDropdown
                        name="department_id"
                        placeholder={
                          currentUser?.department?.name ||
                          (keywordTranslation &&
                            keywordTranslation["selectDepartment"]) ||
                          langKey.selectDepartment
                        }
                        options={departmentList}
                        changeHandler={searchDropdownHandler}
                        e={true}
                      />
                    </div>
                  </div>

                  <div className="col-4 pr-lg-0">
                    <label className="labels">
                      {(keywordTranslation && keywordTranslation["N+1"]) ||
                        "N+1"}
                    </label>
                    <br />
                    <div className="profileDropdowns h-29px">
                      <SearchableDropdown
                        name="report_to"
                        placeholder={
                          currentUser?.report_to?.first_name || "N+1"
                        }
                        options={reportToList}
                        changeHandler={searchDropdownHandler}
                        e={true}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="col-4 pr-lg-0">
                <label className="labels">
                  {(keywordTranslation &&
                    keywordTranslation["nativeLanguage"]) ||
                    langKey.nativeLanguage}
                </label>
                <br />
                <div className="profileDropdowns h-29px">
                  <SearchableDropdown
                    name="nativelanguage_id"
                    selectedValue={nativelanguage_id}
                    placeholder={
                      currentUser?.native_language?.name ||
                      (keywordTranslation &&
                        keywordTranslation["nativeLanguage"]) ||
                      langKey.nativeLanguage
                    }
                    options={DropdownResultsTransformer(NativeLanguages)}
                    changeHandler={(value) =>
                      setValue("nativelanguage_id", value)
                    }
                    e={true}
                  />
                </div>
              </div>

              <div className="col-4 pr-lg-0">
                <label className="labels">
                  {(keywordTranslation &&
                    keywordTranslation["otherLanguage"]) ||
                    langKey.otherLanguage}
                </label>
                <br />
                <div className="profileDropdowns h-29px">
                  <MultiSelect
                    options={
                      typeof OtherLanguages == "undefined"
                        ? []
                        : OtherLanguages.map(({ name, id }) => {
                            return {
                              label: name,
                              value: id,
                            };
                          })
                    }
                    value={otherLanguages}
                    onChange={(value) => setOtherLanguages([...value])}
                    overrideStrings={reNameStrings}
                    ArrowRenderer={ArrowRenderer}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="mt-3 mb-5">
          <Button
            label={
              (keywordTranslation && keywordTranslation["updatebtn"]) ||
              langKey.updatebtn
            }
            buttonStyle="downloadbtn mb-4"
            loading={updateProfileLoading}
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </div>
      </div>
    </>
  );
};

export default Personalinfo;
