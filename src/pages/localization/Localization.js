import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";

import "./Localization.css";
import {
  sortAsset,
  settingAsset,
  settingiconAsset,
  actionAsset,
  editIconAsset,
  delIconAsset,
  notFoundAsset,
  binAsset,
  bin2Asset,
  crossAsset,
  addIconAsset,
  uploadAsset,
  loaderAsset,
  editRedIconAsset,
  settingGreyAsset,
  settingBrownAsset,
  editAsset,
  deleteBlankAsset,
} from "../../assets";
import AddLanguage from "./AddLanguage";
import "../../components/ResponsiveText.css";
import ManageLanguage from "./ManageLanguageModal";
import DeleteLanguage from "./DeleteLanguage";
import Button from "../../components/Button/Button";
import AlertComponent from "../../components/alert/Alert";
import TableComponent from "../../components/table/Table";
import SearchBar from "../../components/SearchBar/SearchBar";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import PaginationComponent from "../../components/Pagination/Pagination";
import {
  useGetLanguageQuery,
  useAddLanguageApiMutation,
  useAddLanguageApiAdvanceMutation,
  useDeleteLanguageApiMutation,
  useUpdateLanguageStatusApiMutation,
  useLanguageTranslationApiMutation,
  useUpdateKeywordsApiMutation,
  useUploadKeywordsFilesMutation,
  useSetAdminDefaultLanguageMutation,
  useUpdateLanguageApiAdvanceMutation,
} from "../../services/api";
import checkPermission from "../../utils/checkPermissions";
import Loader from "../../components/loader/Loader";
import UploadKeywordsModal from "./UploadKeywordsModal";
import { setNewDefaultLanguage } from "../../redux/localizationSlice";
import { toast } from "react-toastify";
import ImageViewer from "../../components/ImageViewer";
import LocalizationTabs from "./LocalizationTabs";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const Localization = () => {
  const dispatch = useDispatch();
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [language, setLanguage] = useState({});
  const [editLanguage, setEditLanguage] = useState(false);
  const [showDeleteLanguage, setShowDeleteLanguage] = useState(false);
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [showUploadKeywordsModal, setShowUploadKeywordsModal] = useState(false);
  const [showManageLanguage, setShowManageLanguage] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [searchquery, setSearchQuery] = useState("");
  const [langIds, setLangIds] = useState([]);
  const [langDelete, setLangDelete] = useState();
  const [inputFields, setInputFields] = useState([]);
  const [addImage, setAddImage] = useState();
  const [addAbbr, setAddAbbr] = useState();
  const [hideName, setHideName] = useState();
  const [showName, setShowName] = useState();
  const [showAbbrName, setShowAbbrName] = useState();
  const [hideAbbrName, setHideAbbrName] = useState();
  const [toggleStatus, setToggleStatus] = useState("");
  const [showAllRecord, setShowAllRecord] = useState("");

  const [tableTitle, setTableTitle] = useState([
    {
      id: 1,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["selectionBox"]) ||
        langKey.selectionBox,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 2,
      status: true,
      name: (keywordTranslation && keywordTranslation["nº"]) || langKey.nº,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 3,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["createdAt"]) ||
        langKey.createdAt,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["language"]) ||
        langKey.language,
      elementStyle: "",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const [
    addLanguageApi,
    {
      isLoading: loadingAdd,
      isError: languageIsError,
      isSuccess: addingSucess,
      error: addingError,
      reset: addingReset,
    },
  ] = useAddLanguageApiMutation();

  const [
    addLanguageApiAdvance,
    {
      isLoading: addLanguageApiAdvanceLoading,
      isError: addLanguageApiAdvanceIsError,
      isSuccess: addLanguageApiAdvanceSuccess,
      error: addLanguageApiAdvanceError,
      reset: addLanguageApiAdvanceReset,
    },
  ] = useAddLanguageApiAdvanceMutation();

  const [
    updateLanguageApiAdvance,
    {
      isLoading: updateLanguageApiAdvanceLoading,
      isError: updateLanguageApiAdvanceIsError,
      isSuccess: updateLanguageApiAdvanceSuccess,
      error: updateLanguageApiAdvanceError,
      reset: updateLanguageApiAdvanceReset,
    },
  ] = useUpdateLanguageApiAdvanceMutation();

  const [
    setAdminDefaultLanguage,
    {
      isLoading: adminDefaultLanguageLoading,
      isError: adminDefaultLanguageIsError,
      isSuccess: adminDefaultLanguageSucess,
      error: adminDefaultLanguageError,
      reset: adminDefaultLanguageReset,
    },
  ] = useSetAdminDefaultLanguageMutation();

  const [
    uploadKeywordsFiles,
    {
      data: uploadingData,
      isLoading: uploadingLoading,
      isError: uploadingIsError,
      isSuccess: uploadingSucess,
      error: uploadingError,
      reset: uploadingReset,
    },
  ] = useUploadKeywordsFilesMutation();

  const [
    deleteLanguageApi,
    {
      isLoading: loadingDelete,
      isSuccess: deletingSuccess,
      error: deletingError,
      reset: deletingReset,
    },
  ] = useDeleteLanguageApiMutation();

  const [
    updateKeywordsApi,
    {
      isLoading: keywordLoading,
      error: keywordError,
      reset: keywordReset,
      isSuccess: keywordSuccess,
    },
  ] = useUpdateKeywordsApiMutation();

  const [
    languageTranslationApi,
    {
      isLoading: translationLoading,
      error: translationError,
      reset: translationReset,
    },
  ] = useLanguageTranslationApiMutation();

  const [
    updateLanguageStatusApi,
    {
      isLoading: statusLoading,
      error: statusError,
      reset: statusReset,
      isSuccess: statusSuccess,
    },
  ] = useUpdateLanguageStatusApiMutation();

  const addLanguageTrigger = (formData, id) => {
    addLanguageApi({ formData, id })
      .unwrap()
      .then((payload) => {
        if (id) {
          editLanguageHandler();
        } else {
          addLanguageModelHandler();
        }
        toast.success(
          (keywordTranslation && keywordTranslation["langCreatedSuccess"]) ||
          successMsg.langCreatedSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error?.data?.message, { toastId: "" });
      });
  };

  const addLanguageModelHandler = () => {
    setShowAddLanguage((prev) => !prev);
  };

  const deleteLanguageModelHandler = (lang) => {
    setLanguage(lang);
    setLangDelete(lang);
    setShowDeleteLanguage((prev) => !prev);
  };



  const deleteLanguageTrigger = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (langDelete) {
      data.ids = [langDelete.id];
    } else {
      data.ids = [...langIds];
    }
    if (data.ids.length) {
      deleteLanguageApi(data).then((payload) => {
        langIds.length && setLangIds([]);
        if (payload.error) {
          toast.error(
            (keywordTranslation && keywordTranslation["YouCantDeleteLang"]) ||
            validationsKey.YouCantDeleteLang,
            { toastId: "" }
          );
        } else {
          toast.success(
            (keywordTranslation && keywordTranslation["langDeleteSuccess"]) ||
            successMsg.langDeleteSuccess,
            { toastId: "" }
          );
        }
        deleteLanguageModelHandler(null);
      });
    }
  };

  const clickOnDropdown = () => {
    setShowAbbrName(!showAbbrName);
    setShowName(!showName);
  };



  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = languages?.data?.data?.map((data) => data.id);
      setLangIds([...ids]);
    } else {
      setLangIds([]);
    }

    let allCheckedToggle = languages?.data?.data?.filter((status) => {
      return status.status === 0;
    });

    setToggleStatus(allCheckedToggle?.length ? false : true);
  };

  const checkBoxHandler = (e, data) => {
    setToggleStatus(data?.status);
    let id = JSON.parse(e.target.value);
    let stateIds = langIds;

    setShowAbbrName(!showAbbrName);
    setShowName(!showName);

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setLangIds([...stateIds]);
  };

  const isIdAdded = (id) => {
    return langIds.includes(JSON.parse(id));
  };

  const uploadKeywordsModalHandler = () => {
    setShowUploadKeywordsModal((prev) => !prev);
  };

  const manageLanguageModelHandler = useCallback((id) => {
    if (id) {
      languageTranslationApi(id)
        .unwrap()
        .then(({ data }) => {
          setLanguage(data);
        });
    } else {
      setLanguage({});
    }
    setShowManageLanguage((prev) => !prev);
  }, []);

  const editLanguageHandler = (language = {}) => {
    if (language) {
      setLanguage(language);
    }
    setEditLanguage((prev) => !prev);
  };

  const updateStatus = (status, language_id) => {
    const formData = new FormData();
    formData.append("status", status);
    if (langIds) {
      langIds?.map((ids, index) => {
        formData.append(`language_ids[${index}]`, ids);
      });
    }
    language_id && formData.append(`language_ids[${0}]`, language_id);

    updateLanguageStatusApi(formData)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["langUpdateSuccess"]) ||
          successMsg.langUpdateSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error.data.message, { toastId: "" });
      });
  };

  const updateKeywords = (id, data) => {
    updateKeywordsApi({ id, data })
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["keywordUpdateSuccess"]) ||
          successMsg.keywordUpdateSuccess,
          { toastId: "" }
        );
        manageLanguageModelHandler();
      });
  };

  const {
    data: languages,
    isLoading,
    isFetching,
    isError,
    refetch: languagesRefetch,
  } = useGetLanguageQuery({
    newUrl: pageUrl,
    params: {
      search: searchquery,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    languagesRefetch();
  }, []);

  const paginationClickHandler = (url) => {
    if (url) {
      setPageUrl(url);
    }
    setShowAbbrName(!showAbbrName);
    setShowName(!showName);
  };

  const uploadKeywordsHandler = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    uploadKeywordsFiles(formData).then((payload) => {
      toast.success(
        (keywordTranslation && keywordTranslation["keywordCreateSucsess"]) ||
        successMsg.keywordCreateSucsess,
        { toastId: "" }
      );
      uploadKeywordsModalHandler();
    });
  };

  const updateAdminDefaultLanguage = (id) => {
    setAdminDefaultLanguage({ language_id: id }).then((payload) => {
      if (payload.error) {
        toast.error(
          (keywordTranslation && keywordTranslation["langAlreadySetDefault"]) ||
          validationsKey.langAlreadySetDefault,
          { toastId: "" }
        );
      } else {
        toast.success(
          (keywordTranslation && keywordTranslation["defaultLangSucsess"]) ||
          successMsg.defaultLangSucsess,
          { toastId: "" }
        );
      }
      dispatch(setNewDefaultLanguage(id));
    });
  };

  const isDefaultLanguage = (id) => {
    let [defaultStyles, isDefault, textForDefault] = [
      "set_as_default",
      false,
      (keywordTranslation && keywordTranslation["setAsDefault"]) ||
      langKey.setAsDefault,
    ];
    if (
      languages?.data?.data?.some(
        (data) => data.id === id && data.default_language
      )
    ) {
      [defaultStyles, isDefault, textForDefault] = [
        "default_lang",
        false,
        (keywordTranslation && keywordTranslation["defaultLanguage"]) ||
        langKey.defaultLanguage,
      ];
    }
    return { defaultStyles, isDefault, textForDefault };
  };

  const language_create = checkPermission("language_create");
  const language_delete = checkPermission("language_delete");
  const language_update = checkPermission("language_update");

  const addInputField = () => {
    setAddImage(!addImage);
    setAddAbbr(!addAbbr);
    setInputFields([inputFields]);
  };

  const removeInputFields = (index) => {
    let rows = [...inputFields];
    rows = rows.filter((data, dataIndex) => { });
    setInputFields([...rows]);
  };

  const handleChangeAddAbbr = (e) => {
    let abbr = e.target.value;
    setAddAbbr(abbr);
  };

  const imageRemoveHandler = (index) => {
    const list = [...inputFields];
    list[index]["image"] = null;
    setInputFields(list);
  };

  const imageUploadHandler = (e, index) => {
    let { files } = e.target;
    const list = [...inputFields];
    list[index]["image"] = files[0];
    setInputFields(list);
    setAddImage(files[0]);
  };

  const onBlurAddHandler = (name) => {
    onSubmit(name, addAbbr, addImage);
  };

  const onBlurAddAbbrHandler = (name) => {
    onSubmitAbbr(addAbbr, name);
  };

  const handleChangeAdd = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const keyPressAddHandler = (name) => {
    onSubmit(name, addAbbr, addImage);
  };

  const keyPressAddAbbrHandler = (name) => {
    onSubmitAbbr(addAbbr, name);
  };

  const onSubmit = (name, addAbbr) => {
    let formData = new FormData();

    formData.append("_method", "post");

    if (name) {
      formData.append("name", name);
    }

    if (addAbbr == true || addAbbr == false) {
      toast.error(
        (keywordTranslation && keywordTranslation["abbrevationRequired"]) ||
        validationsKey.abbrevationRequired,
        { toastId: "" }
      );
      return false;
    } else {
      formData.append("abbrevation", addAbbr);
    }

    formData.append("lang_status", 1);

    addLanguageApiAdvance(formData)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["langCreatedSuccess"]) ||
          successMsg.langCreatedSuccess,
          { toastId: "" }
        );
        removeInputFields();
      })
      .catch((error) => {
        toast.error(error?.data?.message, { toastId: "" });
      });
  };

  const onSubmitAbbr = (addAbbr, name) => {
    let formData = new FormData();

    formData.append("_method", "post");

    if (name == true || name == false || name == undefined) {
      toast.error(
        (keywordTranslation && keywordTranslation["langNameRequired"]) ||
        validationsKey.langNameRequired,
        { toastId: "" }
      );
      return false;
    } else if (addAbbr == true || addAbbr == false) {
      toast.error(
        (keywordTranslation && keywordTranslation["abbrevationRequired"]) ||
        validationsKey.abbrevationRequired,
        { toastId: "" }
      );
      return false;
    } else {
      formData.append("abbrevation", addAbbr);
      formData.append("name", name);
    }

    formData.append("lang_status", 1);

    addLanguageApiAdvance(formData)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["langCreatedSuccess"]) ||
          successMsg.langCreatedSuccess,
          { toastId: "" }
        );
        removeInputFields();
      })
      .catch((error) => {
        toast.error(error?.data?.message, { toastId: "" });
      });
  };

  const editNameHandler = (data, index) => {
    setShowName(index);
    setHideName(data?.name);
    setShowAbbrName(!showAbbrName);
  };

  const editAbbrHandler = (data, index) => {
    setShowAbbrName(index);
    setHideAbbrName(data?.abbrevation);
    setShowName(!showName);
  };

  const keyPressEditNameHandler = (e, data) => {
    let name = e.target.value;
    editApiHandlerName(name, data);
  };

  const onBlurEditHandler = (e, data) => {
    let name = e.target.value;
    editApiHandlerName(name, data);
  };

  const keyPressEditAbbrHandler = (e, data) => {
    let abbr = e.target.value;
    editApiHandlerAbbr(abbr, data);
  };

  const onBlurEditAbbrHandler = (e, data) => {
    let abbr = e.target.value;
    editApiHandlerAbbr(abbr, data);
  };

  const editApiHandlerName = (name, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (name) {
      formData.append("name", name);
    }

    formData.append("abbrevation", data?.abbrevation);

    formData.append("lang_status", 1);

    updateLanguageApiAdvance({ formData, id: data?.id })
      .unwrap()
      .then((payload) => {
        setShowName(!showName);
        toast.success(
          (keywordTranslation && keywordTranslation["langUpdateSuccess"]) ||
          successMsg.langUpdateSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error?.data?.message, { toastId: "" });
      });
  };

  const editApiHandlerAbbr = (abbr, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (abbr) {
      formData.append("abbrevation", abbr);
    }

    formData.append("name", data?.name);

    formData.append("lang_status", 1);

    updateLanguageApiAdvance({ formData, id: data?.id })
      .unwrap()
      .then((payload) => {
        setShowAbbrName(!showAbbrName);
        toast.success(
          (keywordTranslation && keywordTranslation["langUpdateSuccess"]) ||
          successMsg.langUpdateSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error?.data?.message, { toastId: "" });
      });
  };

  return (
    <>
      <LocalizationTabs />

      <div className="sideMargin">
        {statusError && (
          <AlertComponent
            error={true}
            message={statusError.data.message}
            closeHandler={statusReset}
          />
        )}

        <div className="row mt-4">
          <div className="col-lg-5 col-md-3">
            <h5 className="table_heading fs-16 mb-0">
              {(keywordTranslation && keywordTranslation["languagesInfo"]) ||
                langKey.languagesInfo}
            </h5>
          </div>

          <div className="col-lg-7 col-md-9">
            <div className="ml-auto d-flex justify-content-end gap-2">
              {langIds.length ? (
                <div>
                  <img
                    src={binAsset}
                    alt=""
                    className="mr-2 pointer"
                    onClick={() => deleteLanguageModelHandler(null)}
                  />
                  <ToggleSlide
                    Class="Medium"
                    defaultChecked={toggleStatus}
                    onChangeHandler={(status) =>
                      updateStatus(status)
                    }
                  />
                </div>
              ) : null}

              {/* <div className="mr-2 search_col w-50">
                  <SearchBar
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["searchByLanguage"]) ||
                      langKey.searchByLanguage
                    }
                    searchClass="languageSearchBar"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPageUrl("");
                    }}
                  />
                </div> */}

              <Button
                label={
                  (keywordTranslation &&
                    keywordTranslation["uploadKeywords"]) ||
                  langKey.uploadKeywords
                }
                buttonStyle="create_btn mr-2"
                onClick={uploadKeywordsModalHandler}
              />

              {/* {language_create && ( */}
              <Button
                label={
                  (keywordTranslation &&
                    keywordTranslation["addNewLanguage"]) ||
                  langKey.addNewLanguage
                }
                buttonStyle="create_btn"
                onClick={addLanguageModelHandler}
              />
              {/* )} */}
            </div>
          </div>
        </div>

        {showUploadKeywordsModal && (
          <UploadKeywordsModal
            closeUploadKeywordsModalHandler={uploadKeywordsModalHandler}
            action={uploadKeywordsHandler}
            error={uploadingIsError}
            loading={uploadingLoading}
          />
        )}

        {showAddLanguage && (
          <AddLanguage
            title={
              (keywordTranslation && keywordTranslation["Add Language"]) ||
              "Add Language"
            }
            loading={loadingAdd}
            error={addingError}
            languageModelHandler={addLanguageModelHandler}
            action={addLanguageTrigger}
          >
            {addingError && (
              <AlertComponent
                error={addingError}
                message={addingError?.error}
                closeHandler={addingReset}
              />
            )}
          </AddLanguage>
        )}

        {editLanguage && (
          <AddLanguage
            loading={loadingAdd}
            error={addingError}
            title={
              (keywordTranslation && keywordTranslation["Edit Language"]) ||
              "Edit Language"
            }
            data={language}
            languageModelHandler={editLanguageHandler}
            action={addLanguageTrigger}
          >
            {addingError && (
              <AlertComponent
                error={addingError}
                message={addingError.data.message}
                closeHandler={addingReset}
              />
            )}
          </AddLanguage>
        )}

        {showDeleteLanguage && (
          <DeleteLanguage
            action={deleteLanguageTrigger}
            modelHandler={() => deleteLanguageModelHandler(null)}
            langName={langDelete?.name || "Selected"}
            loading={loadingDelete}
          >
            {deletingError && (
              <AlertComponent
                error={deletingError}
                message={deletingError.data.message}
                closeHandler={deletingReset}
              />
            )}
          </DeleteLanguage>
        )}

        {language && showManageLanguage && (
          <ManageLanguage
            data={language}
            modelHandler={manageLanguageModelHandler}
            action={updateKeywords}
            loading={keywordLoading}
          />
        )}

        <div className="customScrollbar smTableOverflow">
          <TableComponent showAllRecord={showAllRecord}>
            <thead>
              <tr>
                {tableTitle?.map(({ id, name, status, icon, elementStyle }) => (
                  <>
                    {name === langKey.selectionBox ? (
                      status && (
                        <th key={id}>
                          <input
                            type="checkbox"
                            style={{ marginTop: "5px" }}
                            onChange={allCheckboxHandler}
                            checked={
                              languages?.data?.data?.length &&
                              languages.data.data.length === langIds.length
                            }
                          />
                        </th>
                      )
                    ) : name === langKey.setting ? (
                      <th scope="col" key={id}>
                        <div className="last-th">
                          <p className="fs-12" style={{ marginRight: "40px" }}>Action</p>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="setting-dropdown"
                              className="dropdownArrowRemove"
                            >
                              {icon && (
                                <img
                                  src={settingGreyAsset}
                                  className={elementStyle}
                                />
                              )}
                            </Dropdown.Toggle>
                            <TableSettingMenu
                              data={tableTitle}
                              setTableTitle={setTableTitle}
                            />
                          </Dropdown>
                        </div>
                      </th>
                    ) : (
                      status && (
                        <th scope="col" key={id}>
                          <div className="d-flex align-items-center justify-content-start">
                            {(keywordTranslation && keywordTranslation[name]) ||
                              name}
                            {icon && (
                              <img src={icon} className={elementStyle} />
                            )}
                          </div>
                        </th>
                      )
                    )}
                  </>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5}></td>
                <td>
                  <div className="d-flex justify-content-end">
                    <img
                      src={addIconAsset}
                      width="25px"
                      height="25px"
                      className="cursor mr-1"
                      onClick={addInputField}
                    />
                  </div>
                </td>
              </tr>

              {/* Dynamically adding fields */}
              {inputFields?.map((data, index) => {
                let { name, abbrevation, image } = data;
                return (
                  <>
                    <tr key={index}>
                      <td></td>
                      <td>0</td>
                      <td>{moment().format("MMM DD, YYYY, hh:mm A")}</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex mr-2">
                            <div className="csvfile_div p-2 advanceViewFileUpload">
                              <div className="d-flex">
                                {image && (
                                  <>
                                    <ImageViewer
                                      src={image || null}
                                      className="mr-2"
                                      width="100%"
                                      height="65px"
                                    />

                                    <img
                                      src={bin2Asset}
                                      className=" mr-0 pointer"
                                      onClick={() => imageRemoveHandler(index)}
                                    />
                                  </>
                                )}

                                {!image && (
                                  <>
                                    <img
                                      src={uploadAsset}
                                      alt=""
                                      className="adavancedViewUploadIcon"
                                    />

                                    <input
                                      type="file"
                                      name="image"
                                      className="TbmFileUpload"
                                      style={{ top: "0px" }}
                                      accept="image/png, image/jpg, image/jpeg"
                                      onChange={(e) =>
                                        imageUploadHandler(e, index)
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={name}
                            style={{ width: "115px" }}
                            name="name"
                            className="typetext mr-2 ml-3 form-control"
                            placeholder="French"
                            onChange={(evnt) => handleChangeAdd(index, evnt)}
                            onBlur={() => onBlurAddHandler(name)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && keyPressAddHandler(name)
                            }
                          />

                          <input
                            type="text"
                            value={abbrevation}
                            style={{ width: "100px" }}
                            name="name"
                            className="typetext mr-2 form-control"
                            placeholder="FR"
                            onChange={(e) => handleChangeAddAbbr(e)}
                            onBlur={() => onBlurAddAbbrHandler(name)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && keyPressAddAbbrHandler(name)
                            }
                          />

                          {addLanguageApiAdvanceLoading && (
                            <img src={loaderAsset} width="35px" height="35px" />
                          )}
                        </div>
                      </td>

                      <td> </td>

                      <td>
                        <img
                          src={crossAsset}
                          width="12px"
                          alt=""
                          height="12.5px"
                          className="cursor float-right mr-2"
                          onClick={() => removeInputFields(index)}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}

              {/* Getting data from API */}
              {languages?.data?.data?.length ? (
                languages?.data?.data?.map((item, index) => {
                  let { defaultStyles, isDefault, textForDefault } =
                    isDefaultLanguage(item.id);
                  const langAdded = isIdAdded(item.id);
                  return (
                    <tr key={index}>
                      {tableTitle[0].status && (
                        <td>
                          <input
                            type="checkbox"
                            id={index}
                            value={item.id}
                            onChange={(e) => checkBoxHandler(e, item)}
                            checked={langAdded}
                          />
                        </td>
                      )}

                      {tableTitle[1].status && (
                        <td>{index + languages?.data?.from}</td>
                      )}

                      {tableTitle[2].status && (
                        <td>
                          {moment(item.created_at).format("MMM DD, hh:mm")}
                        </td>
                      )}

                      {tableTitle[3].status && (
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item?.flag_icon || notFoundAsset}
                              alt=""
                              width="22px"
                              height="22px"
                              className="mr-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFoundAsset;
                              }}
                            />

                            {showName === index ? (
                              <input
                                type="text"
                                value={hideName}
                                style={{ width: "115px" }}
                                name="fname"
                                className="typetext ml-1 form-control"
                                placeholder="Blaise"
                                onChange={(e) => setHideName(e.target.value)}
                                onBlur={(e) => onBlurEditHandler(e, item)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  keyPressEditNameHandler(e, item)
                                }
                              />
                            ) : (
                              <span>{item?.name}</span>
                            )}

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editNameHandler(item, index)}
                            />

                            {showAbbrName === index ? (
                              <input
                                type="text"
                                value={hideAbbrName}
                                style={{ width: "115px" }}
                                name="fname"
                                className="typetext ml-1 form-control text-uppercase"
                                placeholder="Blaise"
                                onChange={(e) =>
                                  setHideAbbrName(e.target.value)
                                }
                                onBlur={(e) => onBlurEditAbbrHandler(e, item)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  keyPressEditAbbrHandler(e, item)
                                }
                              />
                            ) : (
                              <p className="mb-0 ml-1">
                                (
                                {item?.abbrevation &&
                                  item.abbrevation.toUpperCase()}
                                )
                              </p>
                            )}

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editAbbrHandler(item, index)}
                            />

                            {updateLanguageApiAdvanceLoading &&
                              showName === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}

                            {updateLanguageApiAdvanceLoading &&
                              showAbbrName === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}
                          </div>
                        </td>
                      )}

                      {tableTitle[4].status && (
                        <td>
                          <div className="d-flex align-items-center">
                            <div style={{ marginTop: "-5px" }}>
                              <ToggleSlide
                                Class="Medium"
                                checked={item?.status}
                                onChangeHandler={(status) =>
                                  updateStatus(status, item.id)
                                }
                              />
                            </div>

                            {/* <div className="ml-3">
                                {(item?.status && (
                                  <>
                                    {isDefault ? (
                                      <p className={`${defaultStyles} m-0`}>
                                        {(keywordTranslation &&
                                          keywordTranslation[textForDefault]) ||
                                          textForDefault}
                                      </p>
                                    ) : (
                                      <button
                                        className={`${defaultStyles} m-0 fs-14`}
                                        onClick={() =>
                                          updateAdminDefaultLanguage(item.id)
                                        }
                                      >
                                        {(keywordTranslation &&
                                          keywordTranslation[textForDefault]) ||
                                          textForDefault}
                                      </button>
                                    )}
                                  </>
                                )) ||
                                  null}
                              </div> */}
                          </div>
                        </td>
                      )}

                      <td>
                        <div className="last-td">
                          <div>
                            {(item?.status && (
                              <>
                                {isDefault ? (
                                  <p className={`${defaultStyles} m-0`}>
                                    {(keywordTranslation &&
                                      keywordTranslation[textForDefault]) ||
                                      textForDefault}
                                  </p>
                                ) : (
                                  <button
                                    className={`${defaultStyles} m-0 fs-14`}
                                    onClick={() =>
                                      updateAdminDefaultLanguage(item.id)
                                    }
                                  >
                                    {(keywordTranslation &&
                                      keywordTranslation[textForDefault]) ||
                                      textForDefault}
                                  </button>
                                )}
                              </>
                            )) ||
                              null}
                          </div>
                          <div className="d-flex laign-items-center gap-2">
                            <img
                              src={deleteBlankAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              className="pointer"
                              onClick={() => deleteLanguageModelHandler(item)}
                            />
                            <img
                              src={editAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              className="pointer"
                              onClick={() => editLanguageHandler(item)}
                            />
                            <img
                              src={settingBrownAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              className="pointer"
                              onClick={() =>
                                manageLanguageModelHandler(item.id)
                              }
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td>
                          {!langAdded && (
                            <Dropdown>
                              <Dropdown.Toggle
                                variant=""
                                id="dropdown-basic"
                                className="float-right"
                              >
                                <img
                                  src={actionAsset}
                                  alt=""
                                  width="2.5px"
                                  height="12.5px"
                                />
                              </Dropdown.Toggle>
                              <Dropdown.Menu
                                className="action-dropdown"
                                onClick={clickOnDropdown}
                              >
                                <p className="action">
                                  {(keywordTranslation &&
                                    keywordTranslation["action"]) ||
                                    langKey.action}
                                </p>
                                <Dropdown.Item
                                  className="dropdown_items"
                                  onClick={() =>
                                    manageLanguageModelHandler(item.id)
                                  }
                                >
                                  <img
                                    src={settingiconAsset}
                                    alt=""
                                    width="13px"
                                    height="13px"
                                    className="mr-2"
                                  />
                                  {(keywordTranslation &&
                                    keywordTranslation["manage"]) ||
                                    langKey.manage}
                                </Dropdown.Item>
                                {language_update && (
                                  <Dropdown.Item
                                    className="dropdown_items"
                                    onClick={() => editLanguageHandler(item)}
                                  >
                                    <img
                                      src={editIconAsset}
                                      alt=""
                                      width="13px"
                                      height="13px"
                                      className="mr-2"
                                    />
                                    {(keywordTranslation &&
                                      keywordTranslation["edit"]) ||
                                      langKey.edit}
                                  </Dropdown.Item>
                                )}
                                {language_delete && (
                                  <Dropdown.Item
                                    className="dropdown_items"
                                    onClick={() =>
                                      deleteLanguageModelHandler(item)
                                    }
                                  >
                                    <img
                                      src={delIconAsset}
                                      alt=""
                                      width="13px"
                                      height="13px"
                                      className="mr-2"
                                    />
                                    {(keywordTranslation &&
                                      keywordTranslation["delete"]) ||
                                      langKey.delete}
                                  </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </td> */}
                    </tr>
                  );
                })
              ) : (
                <>
                  {isLoading ? (
                    <Loader colSpan="7" />
                  ) : (
                    <NoRecordFound colSpan="7" />
                  )}
                </>
              )}
            </tbody>
          </TableComponent>
        </div>
      </div>
      {languages?.data?.links?.length && !searchquery && (
        <PaginationComponent
          pagination={showAllRecord == false ? languages.data.links : null}
          clickHandler={paginationClickHandler}
          from={languages?.data?.from}
          to={languages?.data?.to}
          total={languages?.data?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default Localization;
