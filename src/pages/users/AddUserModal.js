import React, { useEffect, useState, useLayoutEffect } from "react";
import Button from "../../components/Button/Button";
import { Modal } from "react-bootstrap";
import ModelComponent from "../../components/Model/Model";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  totalUsersAsset,
  uploadAsset,
  contactpersonAsset,
  userAsset,
  emptyImageAsset,
  downarrowAsset,
  multidropdownAsset,
} from "../../assets";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import { useSelector } from "react-redux";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import DropdownResultsTransformer from "../../utils/DropdownResults";
import {
  useLanguageDropDownQuery,
  useNativeOtherLangaugesDropdownQuery,
  useEntityDropdownQuery,
  useRoleDropDownQuery,
  useGetCompaniesListQuery,
  useGetFunctionDropdownQuery,
  useGetDepartmentDropdownQuery,
  useManagerDropDownQuery,
} from "../../services/api";
import ImageViewer from "../../components/ImageViewer";
import { MultiSelect } from "react-multi-select-component";
import InputMasks from "../../components/inputMask/InputMask";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";
import { useLocation } from "react-router-dom";

const AddUserModal = (props) => {
  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  // const companyName = useSelector(
  //   (state) => state.auth.userDetail.user.company.name
  // );

  const main_admin = useSelector(
    (state) => state.auth?.userDetail?.user?.role[0]
  );

  const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Strawberry2", value: "strawberry2" },
    { label: "Strawberry3", value: "strawberry3" },
  ];
  const [selected, setSelected] = useState([]);
  const [customError, setCustomError] = useState({
    userCompanyError: false,
    userRoleError: false,
  });
  const [phone, setPhone] = useState("");
  const [inputImageValue, setInputImageValue] = useState();
  const [inputSignatureValue, setInputSignatureValue] = useState();
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [showNativeLanguage, setShowNativeLanguage] = useState(false);
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [validationGroupStatus, setValidationGroupStatus] = useState();
  const location = useLocation();
  const [company_id, setCompanyId] = useState(location?.state?.company_id);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const roleId = props?.companyDetail?.user_role?.role_id;
  const currentUser = useSelector((user) => user.auth.userDetail.user);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(
      (keywordTranslation && keywordTranslation["firstNameRequired"]) ||
        validationsKey.firstNameRequired
    ),
    last_name: Yup.string().required(
      (keywordTranslation && keywordTranslation["lastNameRequired"]) ||
        validationsKey.lastNameRequired
    ),
    email: Yup.string()
      .required(
        (keywordTranslation && keywordTranslation["emailRequired"]) ||
          validationsKey.emailRequired
      )
      .email(
        (keywordTranslation && keywordTranslation["emailInvalid"]) ||
          validationsKey.emailInvalid
      ),
    // company_id: Yup.string().required(
    //   (keywordTranslation && keywordTranslation["companyRequired"]) ||
    //     validationsKey.companyRequired
    // ),
    role_id: Yup.string().required(
      (keywordTranslation && keywordTranslation["roleRequired"]) ||
        validationsKey.roleRequired
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  let {
    // company_id,
    profile_photo,
    signature,
    first_name,
    last_name,
    email,
    site_id,
    phone_number,
    function_id,
    department_id,
    report_to,
    role_id,
    select_native_language,
    add_native_language,
  } = watch();

  const {
    data: managerList,
    isLoading: managerListLoading,
    isError: managerListError,
  } = useManagerDropDownQuery(company_id);

  const { data: nativeOtherLangauge } = useNativeOtherLangaugesDropdownQuery();

  const { data: languages } = useLanguageDropDownQuery();
  const NativeLanguages = nativeOtherLangauge?.data?.NativeLanguage;
  const OtherLanguages = nativeOtherLangauge?.data?.OtherLanguage;

  let nativeLanguagesDropDown = NativeLanguages?.map((language) => {
    return { value: language.id, label: language.name };
  });

  const {
    data: roleList,
    isLoading: roleLoading,
    isFetching: roleFetching,
    isError: roleError,
  } = useRoleDropDownQuery(company_id);

  const {
    data: entityList,
    isLoading: siteLoading,
    isFetching: siteFetching,
    isError: siteError,
  } = useEntityDropdownQuery(company_id);
  const {
    data: functionList,
    isLoading: functionLoading,
    isFetching: functionFetching,
    isError: functionError,
  } = useGetFunctionDropdownQuery(company_id);
  const {
    data: companyList,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", company_id, params: { search: "" } });
  const {
    data: departmentList,
    isLoading: departmentLoading,
    isFetching: departmentFetching,
    isError: departmentError,
  } = useGetDepartmentDropdownQuery(company_id);

  const onSubmit = (values) => {
    let formData = new FormData();

    // if (typeof profile_photo !== "object") {
    //   let { profile_photo, ...rest } = values;
    //   values = { ...rest };
    // }

    // if (typeof signature !== "object") {
    //   let { signature, ...rest } = values;
    //   values = { ...rest };
    // }

    // if (props?.info && values["email"]) {
    //   let { email, ...rest } = values;
    //   values = { ...rest };
    // }

    // for (const field in values) {
    //   if (values[field]) {
    //     formData.append(`${field}`, values[field]);
    //   }
    // }

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("acronym", values?.acronym);
    profile_photo && formData.append("profile_photo", profile_photo);
    signature && formData.append("signature", signature);
    values?.birthday && formData.append("birthday", values?.birthday);
    formData.append("phone_number", phone);
    formData.append("email", email);
    company_id && formData.append("company_id", company_id);
    function_id && formData.append("function_id", function_id.value);
    values?.role_id && formData.append("role_id", role_id);
    department_id && formData.append("department_id", department_id.value);
    values?.add_other_language &&
      formData.append("add_other_language", values?.add_other_language);
    report_to && formData.append("report_to", report_to.value);
    site_id && formData.append("side_id", site_id.value);
    if (select_native_language) {
      select_native_language &&
        formData.append("add_native_language", select_native_language);
    } else {
      add_native_language &&
        formData.append("add_native_language", add_native_language);
    }

    if (otherLanguages.length) {
      otherLanguages &&
        otherLanguages.map((data, index) =>
          formData.append(`select_other_language[${index}]`, data.value)
        );
    }

    if (props?.info) {
      formData.append("_method", "put");
      formData.append("id", props?.id);
    }
    props.action(formData);
  };

  useEffect(() => {
    if (main_admin === "main_admin") {
      setCompanyId(location.state.company_id);
    } else {
      setCompanyId(companyId);
    }

    if (currentUser.first_name === "Master") {
      setValidationGroupStatus(false);
    } else {
      setValidationGroupStatus(true);
    }
  }, [currentUser, location, companyId]);

  const dropdownHandler = (e) => {
    let { name, value } = e;
    setValue(name, value);
  };

  const userImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  useEffect(() => {
    if (props?.info) {
      let {
        first_name,
        last_name,
        acronym,
        birthday,
        phone_number,
        email,
        company_id,
        user_role,
      } = props?.info;
      reset({
        first_name,
        last_name,
        acronym,
        birthday,
        phone_number,
        email,
        company_id,
        role_id: user_role ? user_role.role_id : "",
      });

      setPhone(phone_number);
    }
  }, [props?.info]);

  useLayoutEffect(() => {
    let [firstChrac, middleChrac, lastChrac] = ["", "", ""];
    firstChrac = first_name?.slice(0, 1);
    middleChrac = last_name?.slice(0, 1);
    if (last_name?.length > 1) {
      lastChrac = last_name?.slice(-1);
    }
    setValue("acronym", firstChrac + middleChrac + lastChrac);
  }, [first_name, last_name]);

  useEffect(() => {
    if (showOtherLanguage) {
      setOtherLanguages([]);
    }
    if (!showOtherLanguage) {
      setValue("add_other_language", "");
    }
  }, [showOtherLanguage]);

  useEffect(() => {
    if (showNativeLanguage) {
      setValue("select_native_language", "");
    } else {
      setValue("add_native_language", "");
    }
  }, [showNativeLanguage]);

  useEffect(() => {
    if (props?.info) {
      if (props?.info?.userother_langauge?.length) {
        let other_languagesz = props.info.userother_langauge;
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
      // setValue("profile_photo", props?.info.profile_photo);
      // setValue("signature", props?.info.signature);
    }
  }, [props?.info]);

  const newOptions = [
    {
      value: "Belgium work contract",
      label: "Belgium work contract",
    },
    {
      value: "Foreign work contract",
      label: "Foreign work contract",
    },
  ];

  const resetInputImage = () => {
    setInputImageValue("");
    setValue("profile_photo", "");
  };

  const resetInputSignature = () => {
    setInputSignatureValue("");
    setValue("signature", "");
  };

  const handleInput = ({ target: { value } }) => {
    setPhone(value);
    setValue("phone_number", phone);
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

  function validDate() {
    var today = new Date().toISOString().split("T")[0];
    document
      .getElementsByClassName("futureDateRestrict")[0]
      .setAttribute("max", today);
  }

  return (
    <>
      <ModelComponent
        size="lg"
        show={true}
        handleClose={props.handleCloseUserModal}
        title={
          (keywordTranslation &&
            keywordTranslation[
              props?.info && props?.edit
                ? "editUser"
                : props?.view
                ? "viewUser"
                : "addUser"
            ]) ||
          (props?.info && props?.edit
            ? langKey.editUser
            : props?.view
            ? langKey.viewUser
            : langKey.addUser)
        }
        // icon={totalUsersAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-6">
              <p className="modalLabel">
                {(keywordTranslation && keywordTranslation["photo"]) ||
                  langKey.photo}
              </p>

              <p className="imgSizeTextUser mb-0 fs-11">
                {(keywordTranslation && keywordTranslation["imageSizeText"]) ||
                  langKey.imageSizeText}
              </p>
              <div className="d-flex align-items-center mt-3 mb-3">
                <ImageViewer
                  src={
                    profile_photo ||
                    props?.info?.profile_photo ||
                    contactpersonAsset
                  }
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
                      (keywordTranslation &&
                        keywordTranslation["uploadImage"]) ||
                      langKey.uploadImage
                    }
                    buttonStyle="uploadimgbtn ml-0 pl-4 pr-4 "
                  />
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="profile_photo"
                    className="csvfileUser"
                    onInput={userImageUploadHandler}
                    disabled={props?.view ? true : false}
                  />
                  <p
                    className="removeImgUser mb-0 mt-2"
                    onClick={resetInputImage}
                    disabled={props?.view ? true : false}
                  >
                    {(keywordTranslation &&
                      keywordTranslation["removeImage"]) ||
                      langKey.removeImage}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <p className="modalLabel">
                {(keywordTranslation && keywordTranslation["signature"]) ||
                  langKey.signature}
              </p>
              <p className="imgSizeTextUser mb-0 opacity-0 fs-11">
                {(keywordTranslation &&
                  keywordTranslation[
                    "Only JPG, PNG files are allowed. Image must be less than 2 MB"
                  ]) ||
                  "Only JPG, PNG files are allowed. Image must be less than 2 MB"}
              </p>

              <div className="d-flex align-items-center mt-3 mb-3">
                <div>
                  <ImageViewer
                    src={signature || props?.info?.signature || emptyImageAsset}
                    alt="user"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = emptyImageAsset;
                    }}
                    width="146px"
                    height="111px"
                  />
                </div>
                <div className="ml-2 text-center position-relative">
                  <Button
                    label={
                      (keywordTranslation &&
                        keywordTranslation["uploadSignature"]) ||
                      langKey.uploadSignature
                    }
                    buttonStyle="uploadimgbtn ml-0 pr-3 pl-3"
                  />
                  <input
                    name="signature"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    value={inputSignatureValue}
                    className="csvfileUser"
                    onInput={userImageUploadHandler}
                    disabled={props?.view ? true : false}
                  />
                  <p
                    className="removeImgUser mb-0 mt-2"
                    onClick={resetInputSignature}
                    disabled={props?.view ? true : false}
                  >
                    {(keywordTranslation &&
                      keywordTranslation["removeSignature"]) ||
                      langKey.removeSignature}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mr-0 mt-2">
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["firstName"]) ||
                  langKey.firstName}
              </label>
              <br />
              <input
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Prewitt"
                {...register("first_name")}
                disabled={props?.view ? true : false}
              />
              {errors.first_name && (
                <ErrorViewer message={errors.first_name.message} />
              )}
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["lastName"]) ||
                  langKey.lastName}
              </label>
              <br />
              <input
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Lemaitre"
                {...register("last_name")}
                disabled={props?.view ? true : false}
              />
              {errors.last_name && (
                <ErrorViewer message={errors.last_name.message} />
              )}
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["acronym"]) ||
                  langKey.acronym}
              </label>
              <br />
              <input
                type="text"
                className="typetext mr-2 form-control text-uppercase"
                placeholder="ACRONYM"
                {...register("acronym")}
                disabled={props?.view ? true : false}
                readOnly
              />
            </div>

            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["birthday"]) ||
                  langKey.birthday}
              </label>
              <br />
              <input
                type="date"
                className="typetext mr-2 form-control futureDateRestrict"
                placeholder="BDO"
                onClick={validDate}
                {...register("birthday")}
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["phoneNumber"]) ||
                  langKey.phoneNumber}
              </label>
              <br />
              <InputMasks
                mask="99/99/9999"
                value={phone || props?.info?.phone_number}
                onChange={handleInput}
                disabled={props?.view ? true : false}
              >
                <input
                  {...register("phone_number")}
                  type="number"
                  className="typetext mr-2 form-control"
                  value={phone_number}
                  placeholder="+32 0 000 00 00"
                />
              </InputMasks>
            </div>

            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["email"]) ||
                  langKey.email}
              </label>
              <br />
              <input
                readOnly={props?.info?.email && email}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Info@clientname.com"
                {...register("email")}
                disabled={props?.view ? true : false}
              />
              {errors.email && <ErrorViewer message={errors.email.message} />}
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["company"]) ||
                  langKey.company}
              </label>
              <br />

              <SearchableDropdown
                placeholder={
                  props?.userCompanyName ||
                  // currentUser?.company.name ||
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companyList}
                selectedValue={
                  props?.info?.company?.id || company_id || props?.userCompanyId
                }
                changeHandler={(value) => setValue("company_id", value)}
                disabled={props?.view ? true : false}
              />
              {/* {errors.company_id && (
                <ErrorViewer message={errors.company_id.message} />
              )} */}
            </div>

            {main_admin != "main_admin" && (
              <div className="col-4 mb-2">
                <label className="modalLabel">
                  {(keywordTranslation && keywordTranslation["entity"]) ||
                    langKey.entity}
                </label>
                <br />
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["selectEntity"]) ||
                    langKey.selectEntity
                  }
                  selectedValue={
                    props?.info?.entity?.id || props?.info?.entity_id
                  }
                  options={entityList}
                  changeHandler={(value) => setValue("site_id", value)}
                  e={true}
                  disabled={props?.view ? true : false}
                />
              </div>
            )}
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["function"]) ||
                  langKey.function}
              </label>
              <br />
              <SearchableDropdown
                placeholder={
                  props?.info?.function?.name ||
                  (keywordTranslation &&
                    keywordTranslation["selectFunction"]) ||
                  langKey.selectFunction
                }
                options={functionList}
                selectedValue={props?.info?.function?.id}
                changeHandler={(value) => setValue("function_id", value)}
                e={true}
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["role"]) ||
                  langKey.role}
              </label>
              <br />

              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectRole"]) ||
                  langKey.selectRole
                }
                selectedValue={props?.info?.user_role?.role_list?.id}
                options={roleList}
                changeHandler={(value) => setValue("role_id", value.value)}
                e={true}
                disabled={props?.view ? true : false}
                {...register("role_id")}
              />
              {errors.role_id && (
                <ErrorViewer message={errors.role_id.message} />
              )}
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["department"]) ||
                  langKey.department}
              </label>
              <br />
              <SearchableDropdown
                placeholder={
                  props?.info?.department?.name ||
                  (keywordTranslation &&
                    keywordTranslation["selectDepartment"]) ||
                  langKey.selectDepartment
                }
                selectedValue={props?.info?.department?.id}
                options={departmentList}
                changeHandler={(value) => setValue("department_id", value)}
                e={true}
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-4 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["N+1"]) || "N+1"}
              </label>
              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectManager"]) ||
                  langKey.selectManager
                }
                selectedValue={props?.info?.report_to?.id}
                options={managerList}
                name="report_to"
                changeHandler={(value) => setValue("report_to", value)}
                e={true}
                disabled={props?.view ? true : false}
              />
            </div>

            {/* <div className="col-4">
              <label className="modalLabel mb-1">
                {keywordTranslation && keywordTranslation["WORK CONTRACT TYPE"] || "WORK CONTRACT TYPE"}
              </label>
              <SearchableDropdown
                placeholder={keywordTranslation && keywordTranslation["Contract type"] || "Contract type"}
                // options={}
                changeHandler={(value) => setValue("Contract", value)} />
            </div> */}

            <div className="col-4 mb-2">
              <div className="d-flex align-items-center justify-content-between mt-1">
                <label className="modalLabel mb-1">
                  {(keywordTranslation &&
                    keywordTranslation["nativeLanguage"]) ||
                    langKey.nativeLanguage}
                </label>
                <label
                  className="addNew mb-0"
                  onClick={() => {
                    setShowNativeLanguage(!showNativeLanguage);
                    setValue("select_native_language", "");
                  }}
                >
                  {!showNativeLanguage
                    ? (keywordTranslation && keywordTranslation["addNew"]) ||
                      langKey.addNew
                    : (keywordTranslation &&
                        keywordTranslation["selectLanguage"]) ||
                      langKey.selectLanguage}
                </label>
              </div>

              <>
                {!showNativeLanguage && (
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["selectLanguage"]) ||
                      langKey.selectLanguage
                    }
                    options={DropdownResultsTransformer(NativeLanguages, true)}
                    // name="select_native_language"
                    changeHandler={(value) =>
                      setValue("select_native_language", value.value)
                    }
                    selectedValue={
                      props?.info ? props?.info.nativelanguage_id : ""
                    }
                    e={true}
                    disabled={props?.view ? true : false}
                  />
                )}
                {showNativeLanguage && (
                  <input
                    type="text"
                    className="typetext mr-2 form-control"
                    placeholder="French"
                    {...register("add_native_language")}
                    disabled={props?.view ? true : false}
                  />
                )}{" "}
              </>
            </div>
            <div className="col-4 mb-2">
              <div className="d-flex align-items-center justify-content-between mt-1">
                <label className="modalLabel mb-1">
                  {(keywordTranslation &&
                    keywordTranslation["otherLanguage"]) ||
                    langKey.otherLanguage}
                </label>
                <label
                  className="addNew mb-0"
                  onClick={() => {
                    setShowOtherLanguage(!showOtherLanguage);
                  }}
                >
                  {!showOtherLanguage
                    ? (keywordTranslation && keywordTranslation["addNew"]) ||
                      langKey.addNew
                    : (keywordTranslation &&
                        keywordTranslation["selectLanguage"]) ||
                      langKey.selectLanguage}
                </label>
              </div>

              {!showOtherLanguage && (
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
                  disabled={props?.view ? true : false}
                />
              )}

              {showOtherLanguage && (
                <input
                  type="text"
                  className="typetext mr-2 form-control"
                  placeholder="French"
                  {...register("add_other_language")}
                  disabled={props?.view ? true : false}
                />
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={
                (keywordTranslation && keywordTranslation["cancel"]) ||
                langKey.cancel
              }
              buttonStyle="cancel mr-3"
              onClick={props.handleCloseUserModal}
            />
            {!props?.view && (
              <Button
                loading={props.loading}
                label={
                  (keywordTranslation &&
                    keywordTranslation[props?.info ? "updatebtn" : "create"]) ||
                  (props?.info ? langKey.updatebtn : langKey.create)
                }
                buttonStyle={props?.info ? "updateBtn" : "createbtn"}
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default AddUserModal;
