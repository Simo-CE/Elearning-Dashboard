import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import ModelComponent from "../../components/Model/Model";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  emptyImageAsset,
  addclientAsset,
  uploadAsset,
  contactpersonAsset,
  toggleAsset,
  loaderAsset,
  deleteBlankAsset,
  cameraAsset,
} from "../../assets";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import ToggleSwitch from "../../components/toggleswitch/ToggleSwitch";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import ImageViewer from "../../components/ImageViewer";
import { usePermissionListingQuery } from "../../services/api";
import { useSelector } from "react-redux";
import validator from "validator";
import InputMasks from "../../components/inputMask/InputMask";
import SearchBar from "../../components/SearchBar/SearchBar";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";
import TvaMask from "../../components/inputMask/TvaMask";
import Select from "react-select";

import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";

const AddClient = (props) => {
  const [showContactPerson, setShowContactPerson] = useState(false);
  const [operation, setOperation] = useState("Create");
  const [allPermissionStatus, setAllPermissionStatus] = useState(false);
  const [allPermissionLength, setPermissionLength] = useState(0);
  let [permission_id, setPermission_id] = useState([]);
  const { data: permissions } = usePermissionListingQuery();
  const permissionData = permissions?.data?.getPermission?.data ?? [];
  const [websiteValidation, setWebsiteValidation] = useState("");
  const [phone, setPhone] = useState("");
  const [tva, setTva] = useState("");
  const [phoneCp, setPhoneCp] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const getList = (list) => {
  };

  const validate = (value) => {
    if (!validator.isURL(value)) {
      setWebsiteValidation("url is not valid");
      return false;
    } else {
      setWebsiteValidation("");
      return true;
    }
  };

  const openCp = () => {
    setShowContactPerson(!showContactPerson);
  };

  let emailcond = false;

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const toggleElements = useRef(new Array());
  // Permission Element update
  const addElement = (element) => {
    if (element != null) {
      toggleElements.current.push(element);
    }
  };

  // yup validation of form
  const validationSchema = !showContactPerson
    ? Yup.object().shape({
        name: Yup.string().required(
          (keywordTranslation && keywordTranslation["companyRequired"]) ||
            validationsKey.companyRequired
        ),
      })
    : Yup.object().shape({
        user_first_name: Yup.string().required(
          (keywordTranslation && keywordTranslation["firstNameRequired"]) ||
            validationsKey.firstNameRequired
        ),
        user_last_name: Yup.string().required(
          (keywordTranslation && keywordTranslation["lastNameRequired"]) ||
            validationsKey.lastNameRequired
        ),
        user_email: Yup.string()
          .required(
            (keywordTranslation && keywordTranslation["emailRequired"]) ||
              validationsKey.emailRequired
          )
          .email(
            (keywordTranslation && keywordTranslation["emailInvalid"]) ||
              validationsKey.emailInvalid
          ),
      });

  // form hook consume
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    // defalult Value Assign
    defaultValues: {
      role_and_permission_type: 0,
      legal_form: "SRL",
      logo: "",
      user_image: "",
      status: 0,
      user_status: 0,
      name: "",
      company_type: "internal",
      acronym: "",
      user_first_name: "",
      user_last_name: "",
      // country: "Belgium",
    },
  });

  // watcher of form hook
  const {
    country_name,
    user_status,
    status,
    logo,
    phone_number,
    phone_number_code,
    user_image,
    user_email,
    user_first_name,
    user_last_name,
    user_phone_number,
  } = watch();

  // from submit using react hook form
  const onSubmit = (data) => {
    if (typeof logo !== "object") {
      delete data["logo"];
    }
    if (typeof user_image !== "object") {
      delete data["user_image"];
    }
    if (props?.client?.super_admin?.email && user_email) {
      delete data["user_email"];
    }
    let finalData = {};
    for (const field in data) {
      if (data[field]) {
        finalData[field] = data[field];
      }
    }

    finalData["role_and_permission_type"] = 1;
    console.log(country_name)
    if(country_name) {

      finalData["country"] =
        country_name.value + " " + country_name.label || "Belgium";
    }
    props.action({
      ...finalData,
      permission_id,
    });
  };

  // Add group of permission method pending working
  const addGroupOfPermission = (e) => {
    let permittedElements = [];
    let toggleCount = 0;
    toggleElements.current.forEach((elemitem, elem_index) => {
      if (
        elemitem != null &&
        e.target.getAttribute("main_group") ===
          elemitem.getAttribute("main_group")
      ) {
        let is_exist = permittedElements.includes(elemitem, 0);
        if (!is_exist) {
          permittedElements[toggleCount] = elemitem;
          toggleCount += 1;
        }
      }
    });
    let permitso = []; //permission_id;
    permittedElements.forEach((permitem, permindex) => {
      permitem.checked = Number(e.target.checked);

      permissionHandling(permitem.getAttribute("item_id"));
    });
    permittedElements.forEach((permitem, permindex) => {
      permitem.checked = Number(e.target.checked);
    });
  };

  // Add All permission on Single click
  const AllPermissionMethod = (value) => {
    setAllPermissionStatus(value);
    if (value) {
      setPermission_id([]);
      permissionData.forEach((groupList) => {
        groupList.permission.forEach((permissionItem) => {
          setPermission_id((pre) => [...pre, permissionItem.id]);
        });
      });
    } else {
      setPermission_id([]);
    }
  };

  // company and client permission add and remove
  const permissionHandling = (permissionId) => {
    let permits = permission_id;
    let length = 0;
    permissionData.forEach((current) => {
      length += current.permission.length;
    });
    if (IsPermissionAdded(permissionId)) {
      permits = permits.filter((id) => id !== permissionId);
      setAllPermissionStatus(false);
    } else {
      permits.push(permissionId);
      if (length === permits.length) {
        setAllPermissionStatus(true);
      } else {
        setAllPermissionStatus(false);
      }
    }
    setPermission_id([...permits]);
  };

  // check permission in Array
  const IsPermissionAdded = (id) => {
    return permission_id.includes(id);
  };

  // handle upload image of form
  const imageHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  const handleDeleteClientPitcher = () => {
    setValue("logo", "");
  };

  const handleDeleteUserPitcher = () => {
    setValue("user_image", "");
  };

  // create acro name, first and last character
  const acronymHandler = (e) => {
    let { name, value } = e.target;
    let useLastName = value.length > 1;

    let [acronym, firstLetter, lastLetter, finalAcronym] = ["", "", "", ""];

    if (name === "name") {
      acronym = "acronym";
      firstLetter = value.slice(0, 1);
      if (useLastName) {
        lastLetter = value.slice(-1);
      }
      finalAcronym = firstLetter + lastLetter;
    }

    setValue(acronym, finalAcronym);
  };

  useEffect(() => {
    if (props.client) {
      setOperation("Update & Save");
      emailcond = true;
      let {
        id,
        status,
        logo,
        name,
        acronym,
        tva,
        nace,
        description,
        address,
        house_no,
        po_box,
        zip_code,
        city,
        country,
        website,
        phone_number,
        super_admin,
        legal_form,
      } = props.client;

      let {
        email: user_email,
        first_name: user_first_name,
        id: user_id,
        last_name: user_last_name,
        phone_number: user_phone_number,
        birthday: user_birthday,
        profile_photo: user_image,
        acronym: user_acronym,
        status: user_status,
      } = super_admin;

      if (user_email) {
        setShowContactPerson((prev) => !prev);
        reset({
          id,
          user_status,
          user_acronym,
          user_id,
          // user_birthday,
          user_email,
          user_first_name,
          user_last_name,
          user_phone_number,
          user_image,
          logo,
          name,
          acronym,
          tva,
          nace,
          description,
          address,
          house_no,
          po_box,
          zip_code,
          city,
          country,
          website,
          phone_number,
          status,
          legal_form,
        });
      } else {
        reset({
          id,
          logo,
          name,
          acronym,
          tva,
          nace,
          description,
          address,
          house_no,
          po_box,
          zip_code,
          city,
          country,
          website,
          phone_number,
          user_phone_number,
          status,
          legal_form,
          country_name,
        });
      }

      let permisssionsAssigned = props.client.company_has_permission.map(
        (data) => data.permission_id
      );

      if (permisssionsAssigned?.length == 227) {
        setAllPermissionStatus(true);
      }

      setPermission_id([...permisssionsAssigned]);
    }
  }, []);

  // set "user_acronym" value when "user_first_name, user_last_name" update
  useEffect(() => {
    if (props?.client) {
      setAllPermissionStatus(
        Number(props?.client?.company_has_permission?.length) ===
          Number(permissions?.data?.total_permission)
      );
      setValue("phone_number", props.client.phone_number);
      setValue("country_name", {
        value: props.client.country?.split(" ")[0],
        label: props.client.country?.split(" ")[1],
      });
      setValue(
        "phone_number_code",
        props.client.country.split(" ")[0].toLowerCase()
      );
    }

    if (user_first_name || user_last_name) {
      let [firstChrac, middleChrac, lastChrac] = ["", "", ""];

      firstChrac = user_first_name ? user_first_name.slice(0, 1) : "";
      middleChrac = user_last_name ? user_last_name.slice(0, 1) : "";
      if (user_last_name?.length > 1) {
        lastChrac = user_last_name.slice(-1);
      }
      setValue("user_acronym", firstChrac + middleChrac + lastChrac);
    }
  }, [user_first_name, user_last_name, props, permissions]);

  // const handleInput = ({ target: { value } }) => {
  //   setPhone(value);
  //   setValue("phone_number", phone);
  // };
  const handleTvaInput = ({ target: { value } }) => {
    setTva(value);
    setValue("tva", tva);
  };
  // const handleInputCp = ({ target: { value } }) => {
  //   setPhoneCp(value);
  //   setValue("user_phone_number", phoneCp);
  // };

  function localSearchTableFunction(filter) {
    setSearchInput(filter);
    // var input = document.getElementById("localSearchInput");
    // var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName("mainGroup");

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "flex";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }

  function validDate() {
    var today = new Date().toISOString().split("T")[0];
    document
      .getElementsByClassName("futureDateRestrict")[0]
      .setAttribute("max", today);
  }

  return (
    <form>
      <ModelComponent
        size="lg"
        show={true}
        handleClose={props.modelHandler}
        title={
          (keywordTranslation &&
            keywordTranslation[props.client ? "editClient" : "addClient"]) ||
          (props.client ? langKey.editClient : langKey.addClient)
        }
        // icon={addclientAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-md-4">
              <label className="modalLabel text-start">
                {(keywordTranslation && keywordTranslation["logo"]) ||
                  langKey.logo}
              </label>
              <div className=" d-flex justify-content-center align-items-center  superClientImage">
                <ImageViewer
                  src={logo || emptyImageAsset}
                  alt=""
                  width="100%"
                  height="111px"
                />
                <div className="d-flex justify-content-between flex-column h-100 logoIcons">
                  {logo && (
                    <img
                      src={deleteBlankAsset}
                      alt=""
                      width="13px"
                      height="13px"
                      className="deleteIcon pointer"
                      onClick={handleDeleteClientPitcher}
                      // disabled={props?.view ? true : false}
                    />
                  )}
                  <div
                    className="position-absolute"
                    style={{ bottom: "3px", marginLeft: "-15px" }}
                  >
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      className="cameraUpload"
                      name="logo"
                      onInput={imageHandler}
                      // disabled={props?.view ? true : false}
                    />
                    <div className="cameraDiv">
                      <img src={cameraAsset} alt="" width="10px" height="8px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-5 mb-2 p-0">
                  <label className="modalLabel">
                    {(keywordTranslation &&
                      keywordTranslation["companyName"]) ||
                      langKey.companyName}
                  </label>
                  <br />
                  <input
                    {...register("name")}
                    type="text"
                    className="typetext mr-2 form-control"
                    placeholder="Newelec"
                    onChange={acronymHandler}
                    name="name"
                    disabled={props?.view ? true : false}
                  />
                  {errors.name && <ErrorViewer message={errors.name.message} />}
                </div>
                <div className="col-3 mb-2 pr-0">
                  <label className="modalLabel">
                    {(keywordTranslation && keywordTranslation["acronym"]) ||
                      langKey.acronym}
                  </label>
                  <br />
                  <input
                    {...register("acronym")}
                    readOnly
                    type="text"
                    className="typetext mr-2 form-control text-uppercase"
                    placeholder="NEE"
                    disabled={props?.view ? true : false}
                  />
                </div>
                <div className="col-4 mb-2">
                  <label className="modalLabel">
                    {(keywordTranslation && keywordTranslation["legalForm"]) ||
                      langKey.legalForm}
                  </label>
                  <br />
                  <input
                    {...register("legal_form")}
                    type="text"
                    className="typetext mr-2 form-control"
                    placeholder="SRL"
                  />
                  {/* <select
                    className="typetext mr-2 w-100"
                    disabled={props?.view ? true : false}
                  >
                    <option>SRL</option>
                  </select> */}
                </div>
                <div className="col-4 mb-2 p-0 mt-1">
                  <label className="modalLabel uppercase">
                    {(keywordTranslation && keywordTranslation["tva"]) ||
                      langKey.tva}
                  </label>
                  <br />
                  {/* <input
                    {...register("tva")}
                    type="text"
                    className="typetext mr-2 form-control"
                    placeholder="BE 0999999999"
                    disabled={props?.view ? true : false}
                  /> */}
                  <TvaMask
                    mask="99/99/9999"
                    value={tva || props.client?.tva}
                    onChange={handleTvaInput}
                  >
                    <input
                      {...register("tva")}
                      type="text"
                      className="typetext mr-2 form-control"
                      placeholder="BE 0999999999"
                    />
                  </TvaMask>
                </div>
                <div className="col-5 mb-2 mt-1">
                  <label className="modalLabel uppercase">
                    {(keywordTranslation && keywordTranslation["nace"]) ||
                      langKey.nace}
                  </label>
                  <br />
                  <input
                    {...register("nace")}
                    type="text"
                    className="typetext mr-2 form-control"
                    placeholder="Nace"
                    disabled={props?.view ? true : false}
                  />
                </div>
                <div className="col-3 mb-2 mt-1">
                  <div className="statusDisplay">
                    <label className="modalLabel">
                      {(keywordTranslation && keywordTranslation["status"]) ||
                        langKey.status}
                    </label>
                    <br />
                    <ToggleSlide
                      className="Dark"
                      disabled={props?.view ? true : false}
                      name="status"
                      checked={status}
                      // {...register("status") }
                      onChangeHandler={(value) =>
                        setValue("status", value ? 1 : 0)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2 mt-3">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["description"]) ||
                  langKey.description}
              </label>
              <br />
              <textarea
                {...register("description")}
                className="typetext mr-2 form-control"
                cols="30"
                rows="3"
                disabled={props?.view ? true : false}
              ></textarea>
            </div>

            <div className="col-7 mb-2 pr-0 mt-1">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["address"]) ||
                  langKey.address}
              </label>
              <br />
              <input
                {...register("address")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Rue des Fraisiers"
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-2 mb-2 mt-1 pr-0">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["Nº"]) || "Nº"}
              </label>
              <br />
              <input
                {...register("house_no")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="91"
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-3 mb-2 mt-1">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["mpoBox"]) ||
                  langKey.mpoBox}
              </label>
              <br />
              <input
                {...register("po_box")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="B-4041"
                disabled={props?.view ? true : false}
              />
            </div>

            <div className="col-3 mb-2 mt-1">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["zipCode"]) ||
                  langKey.zipCode}
              </label>
              <br />
              <input
                {...register("zip_code")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="B-4041"
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-4 mb-2 mt-1 p-0">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["city"]) ||
                  langKey.city}
              </label>
              <br />
              <input
                {...register("city")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Herstal-Vottem"
                disabled={props?.view ? true : false}
              />
            </div>
            <div className="col-4 mb-2 mt-1">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["country"]) ||
                  langKey.country}
              </label>
              <br />
              <div>
                <ReactCountryFlag
                  countryCode={country_name?.value ? country_name?.value : "BE"}
                  className="countryFlag"
                  svg
                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                  cdnSuffix="svg"
                  title={country_name?.value ? country_name?.value : "BE"}
                />
                {/* <input
                {...register("country")}
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Belgium"
                disabled={props?.view ? true : false}
              /> */}

                <div className="flagSearchDropdown">
                  <Select
                    placeholder={
                      (keywordTranslation && keywordTranslation["belgium"]) ||
                      langKey.belgium
                    }
                    // className="form-select traning-select"
                    isSearchable={true}
                    options={countryList().getData()}
                    // selectedValue={category_id}
                    value={country_name}
                    onChange={(value) => {
                      setValue("country_name", value);
                      setValue("phone_number_code", value.value?.toLowerCase());
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-6 mb-2 mt-1 pr-0">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["webSite"]) ||
                  langKey.webSite}
              </label>
              <br />
              <input
                {...register("website")}
                name="website"
                type="text"
                className="typetext mr-2 form-control"
                placeholder="www.company-name.com"
                onChange={(e) => validate(e.target.value)}
                disabled={props?.view ? true : false}
              />
              {websiteValidation && <ErrorViewer message={websiteValidation} />}
            </div>

            <div className="col-4 mb-2 mt-1">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["phoneNumber"]) ||
                  langKey.phoneNumber}
              </label>
              <br />
              <PhoneInput
                country={phone_number_code || "be"}
                placeholder={phone_number || phone_number_code || "yes"}
                // {...register("phone_number")}
                // className="typetext mr-2 form-control"
                value={phone_number}
                onChange={(value) => {
                  // setValue("phone_number", value)
                  setValue("phone_number", value);
                }}
              />
              {/* <div className="inputmaskRounded"> */}
              {/* <InputMasks
                  mask="99/99/9999"
                  value={phone || props.client?.phone_number}
                  onChange={handleInput}
                  disabled={props?.view ? true : false}
                >
                  <input
                    {...register("phone_number")}
                    type="number"
                    className="typetext mr-2 form-control"
                    placeholder="+32 0 000 00 00"
                    disabled={props?.view ? true : false}
                  />


                </InputMasks> */}

              {/* </div> */}
            </div>
            <div className="col-12">
              <div className="border-bottom mt-2"></div>
            </div>
          </div>

          <>
            <div className="row mt-2 mb-2">
              <div className="col-12 d-flex align-items-center">
                <p
                  onClick={openCp}
                  className="clients_title fs-13 d-flex align-items-center mb-0"
                >
                  <img
                    src={toggleAsset}
                    alt=""
                    width="18px"
                    height="18px"
                    className="mr-2"
                  />
                  {(keywordTranslation &&
                    keywordTranslation["contactPerson"]) ||
                    langKey.contactPerson}
                </p>
              </div>
            </div>

            {showContactPerson && (
              <div>
                <div className="row mb-2">
                  <div className="col-md-2">
                    <label className="modalLabel">
                      {(keywordTranslation &&
                        keywordTranslation["userImage"]) ||
                        langKey.userImage}
                    </label>
                    <div className="d-flex ml-3">
                      {user_image && (
                        <img
                          src={deleteBlankAsset}
                          alt=""
                          width="11px"
                          height="11px"
                          className="pointer"
                          onClick={handleDeleteUserPitcher}
                        />
                      )}
                      <ImageViewer
                        src={user_image || contactpersonAsset}
                        className="rounded-circle userImg"
                        alt=""
                        width="50px"
                        height="50px"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = contactpersonAsset;
                        }}
                      />
                      <div
                        className="d-flex align-items-end position-absolute"
                        style={{ marginLeft: "35px", marginTop: "36px" }}
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          className="cameraUpload"
                          name="user_image"
                          onInput={imageHandler}
                          disabled={props?.view ? true : false}
                        />
                        <div className="cameraDiv">
                          <img
                            src={cameraAsset}
                            alt=""
                            width="10px"
                            height="8px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-6 mb-2 pr-0">
                            <label className="modalLabel">
                              {(keywordTranslation &&
                                keywordTranslation["firstName"]) ||
                                langKey.firstName}
                            </label>
                            <br />
                            <input
                              {...register("user_first_name")}
                              type="text"
                              className="typetext mr-2 form-control"
                              placeholder="Blaise"
                              name="user_first_name"
                              disabled={props?.view ? true : false}
                            />
                            {errors.user_first_name && (
                              <ErrorViewer
                                message={errors.user_first_name.message}
                              />
                            )}
                          </div>
                          <div className="col-6 mb-2 pr-0">
                            <label className="modalLabel">
                              {(keywordTranslation &&
                                keywordTranslation["lastName"]) ||
                                langKey.lastName}
                            </label>
                            <br />
                            <input
                              {...register("user_last_name")}
                              type="text"
                              className="typetext mr-2 form-control"
                              placeholder="DEFLOO"
                              name="user_last_name"
                              disabled={props?.view ? true : false}
                            />
                            {errors.user_last_name && (
                              <ErrorViewer
                                message={errors.user_last_name.message}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-3 mb-2">
                        <label className="modalLabel">
                          {(keywordTranslation &&
                            keywordTranslation["acronym"]) ||
                            langKey.acronym}
                        </label>
                        <br />
                        <input
                          {...register("user_acronym")}
                          type="text"
                          className="typetext mr-2 form-control text-uppercase"
                          placeholder="NEE"
                          disabled={props?.view ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4 mt-3">
                    <div className="d-flex mb-1">
                      <label className="modalLabel">
                        {(keywordTranslation &&
                          keywordTranslation["birthday"]) ||
                          langKey.birthday}
                      </label>
                      <p className="fs-10 fw-400 gray ml-auto">
                        {(keywordTranslation &&
                          keywordTranslation["optional"]) ||
                          langKey.optional}
                      </p>
                    </div>
                    <input
                      {...register("user_birthday")}
                      type="date"
                      className="typetext mr-2 form-control futureDateRestrict"
                      onClick={validDate}
                      disabled={props?.view ? true : false}
                    />
                  </div>
                  <div className="col-4 mb-2 mt-3 p-0">
                    <label className="modalLabel">
                      {(keywordTranslation && keywordTranslation["email"]) ||
                        langKey.email}
                    </label>
                    <br />
                    <input
                      {...register("user_email")}
                      // {...(emailcond && { ...register("user_email") })}
                      type="text"
                      readOnly={props?.client?.super_admin?.email}
                      name="user_email"
                      className="typetext mr-2 form-control"
                      placeholder="Info@clientname.com"
                    />
                    {errors.user_email && (
                      <ErrorViewer message={errors.user_email.message} />
                    )}
                  </div>
                  <div className="col-4 mb-2 mt-3">
                    <label className="modalLabel">
                      {(keywordTranslation &&
                        keywordTranslation["phoneNumber"]) ||
                        langKey.phoneNumber}
                    </label>
                    <br />

                    <div className="inputmaskRounded">
                      {/* <InputMasks
                        mask="99/99/9999"
                        value={
                          phoneCp || props.client?.super_admin?.phone_number
                        }
                        onChange={handleInputCp}
                      >
                        <input
                          {...register("user_phone_number")}
                          type="number"
                          value={user_phone_number}
                          className="typetext mr-2 form-control"
                          placeholder="+32 0 000 00 00"
                          disabled={props?.view ? true : false}
                        />
                      </InputMasks> */}

                      <PhoneInput
                        country={phone_number_code || "be"}
                        // {...register("user_phone_number")}
                        // className="typetext mr-2 form-control"
                        value={user_phone_number}
                        onChange={(value) => {
                          setValue("user_phone_number", value);
                        }}
                        disabled={props?.view ? true : false}
                      />
                    </div>
                  </div>

                  <div className="col-4 mb-2">
                    <div className="statusDisplay d-flex gap-1 align-items-center mt-2">
                      <label className="modalLabel mt-2">
                        {(keywordTranslation && keywordTranslation["status"]) ||
                          langKey.status}
                      </label>
                      <br />
                      <ToggleSlide
                        className="Dark"
                        disabled={props?.view ? true : false}
                        checked={user_status}
                        // footer user status
                        onChangeHandler={(value) =>
                          setValue("user_status", value ? 1 : 0)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>

          <div className="d-flex align-items-center mt-2 justify-content-between">
            <div className="d-flex align-items-center">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["addPermissions"]) ||
                  langKey.addPermissions}
              </label>

              <p className="optional ml-2">
                {(keywordTranslation && keywordTranslation["optional"]) ||
                  langKey.optional}
              </p>
            </div>

            <div className="d-flex align-items-center">
              <p className="mb-0 mr-2 modalLabel">
                {(keywordTranslation && keywordTranslation["allPermissions"]) ||
                  langKey.allPermissions}
              </p>

              <div
                className="d-flex gap-2 align-items-center"
                style={{ marginTop: "-5px" }}
              >
                <ToggleSlide
                  className="Dark"
                  disabled={props?.view ? true : false}
                  name="All_permission"
                  checked={allPermissionStatus}
                  onChangeHandler={(value) => AllPermissionMethod(value)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <SearchBar
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["searchPermissions"]) ||
                  langKey.searchPermissions
                }
                searchClass="languageSearchBar"
                searchId="localSearchInput"
                value={searchInput}
                onChange={(e) => localSearchTableFunction(e.target.value)}
              />
            </div>
          </div>

          {permissionData.length ? (
            permissionData.map((permit, index) => (
              <div className="row mainGroup" key={index}>
                <div className="permission-lables mainGroupStyling d-flex justify-content-between">
                  {++index} - {permit?.main_group}
                  {/*
                      // Pending working on client demand
                      <ToggleSwitch
                        Class="Big"
                        main_group={permit?.main_group}
                        onChangeHandler={addGroupOfPermission}
                      /> */}
                </div>
                {permit.permission.map((item, index) => (
                  <div className="col-3" style={{ padding: "2px" }} key={index}>
                    <div className="mainGroupPermissionStyle">
                      <label className="permissionLabels text-capitalize">
                        {item.slug}
                      </label>
                      <div className="ml-auto" style={{ marginTop: "-5px" }}>
                        <ToggleSwitch
                          Class="Medium"
                          disabled={props?.view ? true : false}
                          itemid={item.id} //permission id
                          checked={IsPermissionAdded(item.id)}
                          main_group={permit?.main_group}
                          ref={(element) => addElement(element)}
                          onChangeHandler={() => permissionHandling(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <>
              <div className="text-center">
                <img src={loaderAsset} height="100px" width="100px" />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label="Cancel"
              buttonStyle="cancel mr-2"
              onClick={props.modelHandler}
            />
            <Button
              label={
                props.client?.super_admin?.first_name
                  ? (keywordTranslation &&
                      keywordTranslation["updateAndSave"]) ||
                    langKey.updateAndSave
                  : user_status
                  ? (keywordTranslation &&
                      keywordTranslation["createAndSendEmail"]) ||
                    langKey.createAndSendEmail
                  : (keywordTranslation &&
                      keywordTranslation["createAndSave"]) ||
                    langKey.createAndSave
              }
              // label={
              //   user_status && user_email && !props.client
              //     ? `${operation} And Send Email`
              //     : operation
              // }
              buttonStyle={props.client ? "updateBtn" : "createbtn"}
              onClick={handleSubmit(onSubmit)}
              loading={props.isLoading}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </form>
  );
};

export default AddClient;
