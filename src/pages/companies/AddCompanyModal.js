import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  langlogoAsset,
  emptyImageAsset,
  uploadAsset,
  companyiconAsset,
  downarrowAsset,
  multidropdownAsset,
  loaderAsset,
} from "../../assets";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import ImageViewer from "../../components/ImageViewer";
import ModelComponent from "../../components/Model/Model";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import {
  useGetCompanyPermissionsMutation,
  useLanguageDropDownQuery,
  useGetCompaniesListQuery,
  usePermissionListingQuery,
} from "../../services/api";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import { MultiSelect } from "react-multi-select-component";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/loader/Loader";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const AddCompanyModal = (props) => {
  const currentUser = useSelector((state) => state.auth?.userDetail?.user);
  const userPermissions = useSelector((state) => state.auth?.userPermissions);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const companyData = props?.data;
  const [validationError, setValidationError] = useState(false);
  const [companyPermissionList, setCompanyPermissionList] = useState([]);
  const [chooseLanguage, setChooseLanguage] = useState("");
  const [permission_id, setPermission_id] = useState([]);
  const [pc_id, setpc_id] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [otherLanguages, setOtherLanguages] = useState([]);
  const { data: permissions } = usePermissionListingQuery();
  const [allPermissionStatus, setAllPermissionStatus] = useState(false);
  const [userLang, setUserLang] = useState([]);
  const permissionData = permissions?.data?.getPermission?.data ?? [];
  const {
    setValue,
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields },
  } = useForm();
  let { logo, company_id } = watch();

  const { data: languages } = useLanguageDropDownQuery();



  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id } });

  const [
    getCompanyPermissions,
    {
      isLoading: companyPermissionLoading,
      isFetching: companyPermissionFetching,
      isError: companyPermissionError,
    },
  ] = useGetCompanyPermissionsMutation();

  const langGenerate = (userLang) => {
    return userLang.map((data) => data.value);
  };

  const companyFunc = () => {
    const formData = new FormData();
    // const data = {
    //   role_and_permission_type: permission_id ? 1 : 0,
    //   name: companyName,
    //   lanuages_ids: userLang,
    //   description,
    //   permission_id,
    // };
    if (props?.data) {
      formData.append("_method", "put");
    }

    formData.append("role_and_permission_type", permission_id ? 1 : 0);
    companyName && formData.append("name", companyName);
    description && formData.append("description", description);
    // formData.append("permission_id", permission_id);
    props?.data?.status && formData.append("status", props?.data?.status);

    pc_id && formData.append("pc_id", pc_id);

    userLang &&
      userLang?.map((lang, index) => {
        formData.append(`lanuages_ids[${index}]`, lang?.value);
      });

    permission_id &&
      permission_id.map((permission, permissionIndex) =>
        formData.append(`permission_id[${permissionIndex}]`, permission)
      );

    // if (companyData) data.status = props?.data?.status;

    if (typeof logo == "object") {
      logo && formData.append("logo", logo);
    }

    // if (pc_id) {
    //   data.pc_id = pc_id;
    // }

    // props.action(data);
    props.action(formData);
  };

  const validationsHandler = () => {
    if (!companyName) {
      setValidationError((prev) => !prev);
    } else {
      companyFunc();
      setValidationError((prev) => !prev);
    }
  };

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

  const IsPermissionAdded = (id) => {
    return permission_id.includes(id);
  };

  useEffect(() => {
    if (companyData) {
      let { logo } = companyData;
      reset({ logo });
      setCompanyName(companyData?.name || "");
      setDescription(companyData?.description || "");
      let companyDefaultLanguage = companyData.languages?.length
        ? companyData.languages.find((data) => data.default_lang)
        : null;
      if (companyDefaultLanguage) {
        setChooseLanguage(companyDefaultLanguage.id);
      }
      let permisssionsAssigned = companyData.company_has_permission.map(
        (data) => data.permission_id
      );
      setPermission_id([...permisssionsAssigned]);

      if (
        permisssionsAssigned?.length ===
        companyData?.company_has_permission?.length
      ) {
        setAllPermissionStatus(true);
      } else {
        setAllPermissionStatus(false);
      }

      let userLanggg = companyData?.languages;

      let userLangg =
        typeof userLanggg == "undefined"
          ? []
          : userLanggg?.map(({ name, id }) => {
              return {
                label: name,
                value: id,
              };
            });

      setValue("userLang", userLanggg);

      setUserLang([...userLangg]);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.company_id) {
      setValue("company_id", currentUser?.company_id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (company_id) {
      getPermissions(company_id);
    }
  }, [company_id]);

  const getPermissions = (companyId) => {
    const data = { companyId };
    // if (permissions?.data?.data?.length === 0) {
    //   setCompanyPermissionList(userPermissions);
    // } else {
    getCompanyPermissions(data)
      .unwrap()
      .then((payload) => {
        setCompanyPermissionList(payload?.data?.getPermission?.data);
      })
      .catch((error) => {});
    // }
  };

  const companyImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
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

  const userLangHandler = (value) => {
    setValue("userLang", value);
    setUserLang([...value]);
  };

  function localSearchTableFunction() {
    var input = document.getElementById("localSearchInput");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName("mainGroup");

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "flex";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }

  return (
    <>
      <ModelComponent
        size="lg"
        show={true}
        handleClose={props.toggleModal}
        title={
          (keywordTranslation &&
            keywordTranslation[props?.title ? "editCompany" : "addCompany"]) ||
          (props?.title ? langKey.editCompany : langKey.addCompany)
        }
        // icon={companyiconAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="row">
            <p className="modalLabel mb-0">
              {(keywordTranslation && keywordTranslation["logo"]) ||
                langKey.logo}
            </p>
            <div className="col-md-4 d-flex justify-content-center pr-0">
              <div>
                <ImageViewer
                  src={logo || emptyImageAsset}
                  width="150px"
                  height="125px"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="csvfile_div ">
                <center>
                  <img src={uploadAsset} alt="" className="upload_csv" />
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="logo"
                    className="csvfile"
                    onInput={companyImageUploadHandler}
                  />
                  <p className="csvtext">
                    {(keywordTranslation &&
                      keywordTranslation["dragDropImg"]) ||
                      langKey.dragDropImg}{" "}
                    <br />
                    {(keywordTranslation && keywordTranslation["or"]) ||
                      langKey.or}{" "}
                    <span className="browse_file">
                      {" "}
                      {(keywordTranslation &&
                        keywordTranslation["browseFiles"]) ||
                        langKey.browseFiles}
                    </span>
                  </p>
                </center>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["company"]) ||
                  langKey.company}
              </label>
              <br />
              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                selectedValue={props?.data?.company_parent?.id}
                options={companies}
                changeHandler={(value) => setpc_id(value)}
              />
            </div>

            <div className="col-6 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["subCompany"]) ||
                  langKey.subCompany}
              </label>
              <br />
              <input
                type="text"
                className="typetext mr-2 form-control"
                placeholder="Newelec"
                value={companyName}
                onChange={(name) => setCompanyName(name.target.value)}
              />
              {validationError && !companyName && (
                <ErrorViewer
                  message={
                    (keywordTranslation &&
                      keywordTranslation["subCompanyRequired"]) ||
                    validationsKey.subCompanyRequired
                  }
                />
              )}
            </div>

            <div className="col-6 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["language"]) ||
                  langKey.language}
              </label>
              <br />

              <MultiSelect
                options={
                  typeof languages == "undefined"
                    ? []
                    : languages.map(({ name, id }) => {
                        return {
                          label: name,
                          value: id,
                        };
                      })
                }
                value={userLang}
                onChange={userLangHandler}
                ArrowRenderer={ArrowRenderer}
                overrideStrings={reNameStrings}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["description"]) ||
                  langKey.description}
              </label>
              <br />
              <input
                type="text"
                className="typetext mr-2 form-control"
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["briefDescription"]) ||
                  langKey.briefDescription
                }
                value={description}
                onChange={(des) => setDescription(des.target.value)}
              />
            </div>
          </div>

          {props?.data?.id !== currentUser?.company?.id && (
            <>
              <div className="d-flex align-items-center mt-2 justify-content-between">
                <label className="modalLabel">
                  {(keywordTranslation &&
                    keywordTranslation["addPermissions"]) ||
                    langKey.addPermissions}
                </label>
                {/* <p className="optional ml-auto">
              {keywordTranslation ? keywordTranslation["Optional"] : "Optional"}
            </p> */}

                <div
                  className="d-flex gap-2 align-items-center"
                  style={{ marginTop: "-5px" }}
                >
                  <ToggleSlide
                    className="Dark"
                    name="All_permission"
                    checked={allPermissionStatus}
                    onChangeHandler={(value) => AllPermissionMethod(value)}
                  />
                </div>
              </div>

              <div className="row mt-2 m-0">
                <div className="col-6 p-0">
                  <SearchBar
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["searchPermissions"]) ||
                      langKey.searchPermissions
                    }
                    searchClass="languageSearchBar"
                    searchId="localSearchInput"
                    onChange={localSearchTableFunction}
                  />
                </div>
              </div>

              {companyPermissionList?.length ? (
                companyPermissionList?.map((permit, index) => (
                  <div className="row mainGroup m-0" key={index}>
                    <div className="permission-lables mainGroupStyling">
                      {++index} - {permit?.main_group}
                    </div>
                    {permit.permission.map((item, index) => {
                      return (
                        <div className="col-3 p-0" key={index}>
                          <div className="mainGroupPermissionStyle">
                            <label className="modalLabel slug">
                              {item.slug}
                            </label>
                            <div
                              className="ml-auto"
                              style={{ marginTop: "-5px" }}
                            >
                              <ToggleSlide
                                Class="Medium"
                                checked={IsPermissionAdded(item.id)}
                                onChangeHandler={() =>
                                  permissionHandling(item.id)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <>
                  <div className="text-center">
                    <img src={loaderAsset} height="100px" width="100px" />
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={
                (keywordTranslation && keywordTranslation["cancel"]) ||
                langKey.cancel
              }
              buttonStyle="cancel mr-2"
              onClick={props.toggleModal}
            />
            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props?.title ? "updatebtn" : "create"]) ||
                (props?.title ? langKey.updatebtn : langKey.create)
              }
              buttonStyle={props?.title ? "updateBtn" : "createbtn"}
              onClick={validationsHandler}
              loading={props.loading}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default AddCompanyModal;
