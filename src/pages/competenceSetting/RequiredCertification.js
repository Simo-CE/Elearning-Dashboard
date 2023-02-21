import React, { useState, useEffect } from "react";
import moment from "moment";
import SaveButton from "../../components/Button/Button";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableComponent from "../../components/table/Table";
import "./CompetenceSetting.css";
import "../../components/Subnav.css";
import { Dropdown } from "react-bootstrap";
import DeleteModal from "../../components/Model/DeleteModal";
import {
  binAsset,
  settingAsset,
  sortAsset,
  securityAsset,
  iconAsset,
  actionAsset,
  editIconAsset,
  delIconAsset,
  notFoundAsset,
  loaderAsset,
  editRedIconAsset,
  settingBrownAsset,
  settingGreyAsset,
  editAsset,
  deleteBlankAsset,
} from "../../assets";
import RequiredCertificationModal from "./RequiredCertificationModal";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import PaginationComponent from "../../components/Pagination/Pagination";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import {
  useGetCertificatesQuery,
  useDeleteCertificateMutation,
  useUpdateCertificateMutation,
  useAddCertificateMutation,
  useCategoryCompetenceDropdownQuery,
  useTopicDropdownQuery,
  useUpdateStatusCertificateMutation,
  useGetCompaniesListQuery,
  useUpdateCertificateAdvancedMutation,
} from "../../services/api";
import AlertComponent from "../../components/alert/Alert";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import CompetenceSettingRouter from "./CompetenceSettingRouter";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const RequiredCertification = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const role = useSelector((state) => state.auth.userDetail.user.role[0]);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showAddrequiredcertificateModal, setShowAddrequiredcertificateModal] =
    useState(false);
  const [
    showDeleterequiredcertificateModal,
    setShowDeleterequiredcertificateModal,
  ] = useState(false);
  const [search, setSearchQuery] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [data, setData] = useState(null);
  const [category_id, setCategory_id] = useState("");
  const [topic_id, setTopic_id] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [company_id, setCompany_id] = useState();
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
  const [showCatDropdown, setShowCatDropdown] = useState();
  const [showTopicDropdown, setShowTopicDropdown] = useState();
  const [topicValue, setTopicValue] = useState();
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
      name: (keywordTranslation && keywordTranslation["id"]) || langKey.id,
      elementStyle: "ml-1",
      icon: "",
    },

    {
      id: 3,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["category"]) ||
        langKey.category,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["topic"]) || langKey.topic,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["traning"]) ||
        langKey.traning,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["required"]) ||
        langKey.required,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const {
    data: certificateList,
    isLoading: certificateListLoading,
    isFetching: certificateListFetching,
    isError: certificateListError,
    refetch,
  } = useGetCertificatesQuery({
    pageUrl,
    params: {
      search,
      company_id,
      category_id,
      topic_id,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  // const {
  //   data: companyList,
  //   isLoading: companyLoading,
  //   isFetching: companyFetching,
  //   isError: companyError,
  // } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  useEffect(() => {
    refetch();
  }, []);

  // useEffect(() => {
  //   if (companyList) {
  //     setCompany_id(companyList[0].value);
  //   }
  // }, [companyList]);

  const { data: categoryDropdown } = useCategoryCompetenceDropdownQuery({
    params: { company_id },
  });

  const { data: topicDropdown } = useTopicDropdownQuery({
    category_id,
    company_id,
  });

  const { data: topicDropdownAdvanced } = useTopicDropdownQuery({
    category_id: topicValue,
  });

  const [
    deleteCertificate,
    {
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      isFetching: deleteFetching,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteCertificateMutation();

  const [
    updateStatusCertificate,
    {
      isSuccess: updateStatusSuccess,
      isLoading: updateStatusLoading,
      isFetching: updateStatusFetching,
      error: updateStatusError,
      reset: updateStatusReset,
    },
  ] = useUpdateStatusCertificateMutation();

  const [
    addCertificate,
    {
      isSuccess: createSuccess,
      isLoading: createLoading,
      isFetching: createFetching,
      error: createError,
      reset: createReset,
    },
  ] = useAddCertificateMutation();

  const createApiHandler = (data) => {
    addCertificate(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["certiCreatedSuccess"]) ||
            successMsg.certiCreatedSuccess,
          { toastId: "" }
        );
        addAddrequiredcertificateHandler();
      });
  };

  const deleteApiHandler = () => {
    let dataToDelete = {
      _method: "delete",
      ids: [],
    };
    if (data) {
      dataToDelete.ids = [data.id];
      deleteCertificate(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["certiDeleteSuccess"]) ||
              successMsg.certiDeleteSuccess,
            { toastId: "" }
          );
          addDeleterequiredcertificateHandler(null);
          setData(null);
        });
    } else {
      dataToDelete.ids = [...categoryIds];
      deleteCertificate(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["certiDeleteSuccess"]) ||
              successMsg.certiDeleteSuccess,
            { toastId: "" }
          );
          addDeleterequiredcertificateHandler(null);
          setCategoryIds([]);
        });
    }
  };

  const [
    updateCertificate,
    {
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isFetching: updateFetching,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateCertificateMutation();

  const [
    updateCertificateAdvanced,
    {
      isSuccess: updateCertificateAdvancedSuccess,
      isLoading: updateCertificateAdvancedLoading,
      isFetching: updateCertificateAdvancedFetching,
      error: updateCertificateAdvancedError,
      reset: updateCertificateAdvancedReset,
    },
  ] = useUpdateCertificateAdvancedMutation();

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowInputValue(!showInputValue);
    setShowCatDropdown(!showCatDropdown);
    setShowTopicDropdown(!showTopicDropdown);
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = categoryIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setCategoryIds([...stateIds]);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = certificateList?.certificate?.data?.map((data) => data.id);
      setCategoryIds([...ids]);
    } else {
      setCategoryIds([]);
    }
  };

  const isIdAdded = (id) => {
    return categoryIds.includes(JSON.parse(id));
  };

  const addAddrequiredcertificateHandler = () => {
    setShowAddrequiredcertificateModal((prev) => !prev);
  };

  const editModelHandler = (data) => {
    setData(data);
    setShowEditModel((prev) => !prev);
  };

  const editApiHandler = (data) => {
    updateCertificate(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["certiUpdateSuccess"]) ||
            successMsg.certiUpdateSuccess,
          { toastId: "" }
        );
        editModelHandler(null);
      })
      .catch((error) => {
        toast.error(error.data.message, { toastId: "" });
      });
  };

  const statusUpdateApiHandler = (id, status_change) => {
    // let data = {
    //   _method: "put",
    //   status_change,
    //   id[0],
    // };

    const formData = new FormData();
    formData.append("_method", "put");
    status_change && formData.append("status", status_change);
    formData.append("ids[0]", id);

    updateStatusCertificate(formData)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["certiUpdateSuccess"]) ||
            successMsg.certiUpdateSuccess,
          { toastId: "" }
        );
      });
  };

  const addDeleterequiredcertificateHandler = (data) => {
    setData(data);
    setShowDeleterequiredcertificateModal((prev) => !prev);
  };

  const onBlurHandlerEdit = (e, data) => {
    let name = e.target.value;
    editApiHandlerText(name, data);
  };

  const keyPressEditHandler = (e, data) => {
    let name = e.target.value;
    editApiHandlerText(name, data);
  };

  const editFieldHandler = (data, index) => {
    setShowInputValue(index);
    setHideField(data?.name);
    setShowCatDropdown(!showCatDropdown);
    setShowTopicDropdown(!showTopicDropdown);
  };

  const editCatHandler = (index) => {
    setShowCatDropdown(index);
    setShowInputValue(!showInputValue);
    setShowTopicDropdown(!showTopicDropdown);
  };

  const editTopicHandler = (index, data) => {
    setShowTopicDropdown(index);
    setShowCatDropdown(!showCatDropdown);
    setShowInputValue(!showInputValue);
    setTopicValue(data?.category_id);
  };

  const editApiHandlerText = (name, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (name) {
      formData.append("name[0]", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["certificateRequired"]) ||
          validationsKey.certificateRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);

    formData.append("company_id", data?.company_id);
    formData.append("category_id", data?.category_id);
    formData.append("topic_id", data?.topic_id);

    updateCertificateAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        toast.success(
          (keywordTranslation && keywordTranslation["certiUpdateSuccess"]) ||
            successMsg.certiUpdateSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error.data.message, { toastId: "" });
      });
  };

  const editCategoryApiHandler = (value, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (data?.name) {
      formData.append("name[0]", data?.name);
      formData.append("category_id", value);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["nameRequired"]) ||
          validationsKey.nameRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);
    formData.append("company_id", data?.company_id);
    formData.append("topic_id", data?.topic_id);

    if (value) {
      updateCertificateAdvanced(formData)
        .unwrap()
        .then((payload) => {
          setShowCatDropdown(!showCatDropdown);
          toast.success(
            (keywordTranslation && keywordTranslation["certiUpdateSuccess"]) ||
              successMsg.certiUpdateSuccess
          );
        })
        .catch((error) => {
          toast.error(error.data.message, { toastId: "" });
        });
    }
  };

  const editTopicApiHandler = (value, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (data?.name) {
      formData.append("name[0]", data?.name);
      formData.append("topic_id", value);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["nameRequired"]) ||
          validationsKey.nameRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);
    formData.append("company_id", data?.company_id);
    formData.append("category_id", data?.category_id);

    if (value) {
      updateCertificateAdvanced(formData)
        .unwrap()
        .then((payload) => {
          setShowTopicDropdown(!showTopicDropdown);
          toast.success(
            (keywordTranslation && keywordTranslation["certiUpdateSuccess"]) ||
              successMsg.certiUpdateSuccess,
            { toastId: "" }
          );
        })
        .catch((error) => {
          toast.error(error.data.message, { toastId: "" });
        });
    }
  };

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-5  align-items-center">
          <div className="col-xl-3 col-lg-12 col-md-12 mx-auto">
            <p className="tableheading mb-0">
              {(keywordTranslation && keywordTranslation["externalTranings"]) ||
                langKey.externalTranings}
            </p>
          </div>

          <div className="col-xl-9 col-lg-12 col-md-12 mt-md-3 mt-lg-0 mt-lg-2">
            <div className="d-flex align-items-center justify-content-end gap-2">
              {categoryIds.length ? (
                <img
                  src={binAsset}
                  className="pointer"
                  alt=""
                  onClick={() => addDeleterequiredcertificateHandler(null)}
                />
              ) : null}
              {/* <SearchableDropdown
                placeholder={(keywordTranslation && keywordTranslation["selectCompany"]) || langKey.selectCompany}
                selectedValue={company_id}
                options={companyList}
                changeHandler={(value) => { setCompany_id(value); setCategory_id(''); setTopic_id('') }}
              /> */}
              <p className="fs-14 fw-550 gray">
                {" "}
                {(keywordTranslation && keywordTranslation["filterBy"]) ||
                  langKey.filterBy}
              </p>
              <div className="h-29px userSelectableDropdown">
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["selectCategory"]) ||
                    langKey.selectCategory
                  }
                  selectedValue={company_id && category_id}
                  options={categoryDropdown}
                  changeHandler={(value) => setCategory_id(value)}
                />
              </div>
              <p className="fs-14 fw-550 gray">
                {" "}
                {(keywordTranslation && keywordTranslation["filterBy"]) ||
                  langKey.filterBy}
              </p>
              <div className="h-29px userSelectableDropdown">
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation && keywordTranslation["selectTopic"]) ||
                    langKey.selectTopic
                  }
                  options={topicDropdown}
                  selectedValue={category_id && topic_id}
                  changeHandler={(value) => setTopic_id(value)}
                />
              </div>
              <SaveButton
                label={
                  (keywordTranslation &&
                    keywordTranslation["addExternalTraining"]) ||
                  langKey.addExternalTraining
                }
                buttonStyle="create_btn float-right"
                onClick={addAddrequiredcertificateHandler}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            {/* <div className="col-lg-3 col-md-7">
              <SearchBar
                value={search}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageUrl("")
                }}
                placeholder={(keywordTranslation && keywordTranslation["searchByCertificate"]) || langKey.searchByCertificate}
                searchClass="languageSearchBar"
              />
            </div> */}

            {showAddrequiredcertificateModal && (
              <RequiredCertificationModal
                action={createApiHandler}
                loading={createLoading}
                handleCloseAddrequiredcertificateModal={
                  addAddrequiredcertificateHandler
                }
              >
                {createError && (
                  <AlertComponent
                    error={true}
                    message={createError.data.message}
                    closeHandler={createReset}
                  />
                )}
              </RequiredCertificationModal>
            )}
            {showEditModel && data && (
              <RequiredCertificationModal
                data={data}
                action={editApiHandler}
                loading={updateLoading}
                handleCloseAddrequiredcertificateModal={() =>
                  editModelHandler(null)
                }
              />
            )}
          </div>
        </div>

        {showDeleterequiredcertificateModal && (
          <DeleteModal
            deleteMessage={
              (keywordTranslation && keywordTranslation["certificateDelMsg"]) ||
              langKey.certificateDelMsg
            }
            targetName={
              data?.name ||
              (keywordTranslation && keywordTranslation["selected"]) ||
              langKey.selected
            }
            handleCloseDeleteModal={() =>
              addDeleterequiredcertificateHandler(null)
            }
            action={() => deleteApiHandler()}
            loading={deleteLoading}
          />
        )}

        <TableComponent showAllRecord={showAllRecord}>
          <thead>
            <tr>
              {tableTitle.map(({ id, name, status, icon, elementStyle }) => (
                <>
                  {name === langKey.selectionBox ? (
                    status && (
                      <th scope="col" key={id}>
                        <div div className="d-flex align-items-center ">
                          <input
                            type="checkbox"
                            onChange={allCheckboxHandler}
                            checked={
                              certificateList?.certificate?.data?.length &&
                              certificateList.certificate.data.length ===
                                categoryIds.length
                            }
                          />
                        </div>
                      </th>
                    )
                  ) : name === langKey.setting ? (
                    <th scope="col" key={id}>
                      <div className="last-th">
                        Action
                        <div className="float-right">
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
                      </div>
                    </th>
                  ) : (
                    status && (
                      <th scope="col" key={id}>
                        <div className="d-flex align-items-center justify-content-start">
                          {(keywordTranslation && keywordTranslation[name]) ||
                            name}
                          {icon && <img src={icon} className={elementStyle} />}
                        </div>
                      </th>
                    )
                  )}
                </>
              ))}
            </tr>
          </thead>

          <tbody>
            {certificateList?.certificate?.data?.length ? (
              certificateList.certificate.data.map((data, index) => {
                const categoryAdded = isIdAdded(data.id);
                return (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td>
                        <input
                          type="checkbox"
                          id={index}
                          value={data.id}
                          onChange={checkBoxHandler}
                          checked={categoryAdded}
                        />
                      </td>
                    )}

                    {tableTitle[1].status && (
                      <td>{index + certificateList.certificate.from}</td>
                    )}

                    {tableTitle[2].status && (
                      <td>
                        <div className="d-flex align-items-center">
                          <ModalImage
                            small={data.category.image || notFoundAsset}
                            large={data.category.image || notFoundAsset}
                            alt=""
                            hideDownload="true"
                            hideZoom="true"
                            className="setImgSizeTableUser mr-2"
                            imageBackgroundColor="transparent"
                          />
                          <div>
                            {showCatDropdown === index ? (
                              <div className="advanceViewDropDown">
                                <SearchableDropdown
                                  placeholder={
                                    (keywordTranslation &&
                                      keywordTranslation["selectCategory"]) ||
                                    langKey.selectCategory
                                  }
                                  options={categoryDropdown}
                                  selectedValue={data?.category?.id}
                                  changeHandler={(value) =>
                                    editCategoryApiHandler(value, data)
                                  }
                                />
                              </div>
                            ) : (
                              <div>{data?.category?.name}</div>
                            )}
                          </div>

                          <img
                            src={editRedIconAsset}
                            className="cursor ml-1"
                            width="12px"
                            height="12px"
                            onClick={() => editCatHandler(index)}
                          />

                          {updateCertificateAdvancedLoading &&
                            showCatDropdown === index && (
                              <img
                                src={loaderAsset}
                                width="35px"
                                height="35px"
                              />
                            )}
                        </div>
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>
                        <div className="d-flex align-items-center">
                          <ModalImage
                            small={data?.topic.image || notFoundAsset}
                            large={data?.topic.image || notFoundAsset}
                            alt=""
                            hideDownload="true"
                            hideZoom="true"
                            className="setImgSizeTableUser mr-2"
                            imageBackgroundColor="transparent"
                          />

                          <div>
                            {showTopicDropdown === index ? (
                              <div className="advanceViewDropDown">
                                <SearchableDropdown
                                  placeholder={
                                    (keywordTranslation &&
                                      keywordTranslation["selectTopic"]) ||
                                    langKey.selectTopic
                                  }
                                  options={topicDropdownAdvanced}
                                  selectedValue={data?.topic?.id}
                                  changeHandler={(value) =>
                                    editTopicApiHandler(value, data)
                                  }
                                />
                              </div>
                            ) : (
                              <div>{data?.topic?.name}</div>
                            )}
                          </div>

                          <img
                            src={editRedIconAsset}
                            className="cursor ml-1"
                            width="12px"
                            height="12px"
                            onClick={() => editTopicHandler(index, data)}
                          />

                          {updateCertificateAdvancedLoading &&
                            showTopicDropdown === index && (
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
                          <ModalImage
                            small={data?.image || notFoundAsset}
                            large={data?.image || notFoundAsset}
                            alt=""
                            hideDownload="true"
                            hideZoom="true"
                            className="setImgSizeTableUser mr-2"
                            imageBackgroundColor="transparent"
                          />

                          {showInputValue === index ? (
                            <input
                              type="text"
                              name="name"
                              style={{ width: "150px" }}
                              value={hideField}
                              className="typetext mr-2 form-control"
                              placeholder="Department"
                              onChange={(e) => setHideField(e.target.value)}
                              onBlur={(e) => onBlurHandlerEdit(e, data)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                keyPressEditHandler(e, data)
                              }
                            />
                          ) : (
                            <div> {data?.name}</div>
                          )}

                          {updateCertificateAdvancedLoading &&
                            showInputValue === index && (
                              <img
                                src={loaderAsset}
                                width="35px"
                                height="35px"
                              />
                            )}

                          <img
                            src={editRedIconAsset}
                            className="cursor ml-1"
                            width="12px"
                            height="12px"
                            onClick={() => editFieldHandler(data, index)}
                          />
                        </div>
                      </td>
                    )}
                    {tableTitle[5].status && (
                      <td>
                        <div style={{ marginTop: "-5px" }}>
                          <ToggleSlide
                            Class="Medium"
                            checked={data.status}
                            onChangeHandler={(value) =>
                              statusUpdateApiHandler(data.id, value)
                            }
                          />
                        </div>
                      </td>
                    )}

                    {tableTitle[6].status && (
                      <td>{moment(data.created_at).format("MMM DD, hh:mm")}</td>
                    )}

                    <td>
                      <div className="last-td">
                        <img
                          src={deleteBlankAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          className="pointer"
                          onClick={() =>
                            addDeleterequiredcertificateHandler(data)
                          }
                        />
                        <img
                          src={editAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          className="pointer"
                          onClick={() => editModelHandler(data)}
                        />
                      </div>
                      {/* {!categoryAdded && (
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

                          <Dropdown.Menu className="action-dropdown">
                            <p className="action">
                              {(keywordTranslation && keywordTranslation["action"]) || langKey.action}
                            </p>

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => editModelHandler(data)}
                            >
                              {" "}
                              <img
                                src={editIconAsset}
                                alt=""
                                width="12px"
                                height="12px"
                              />{" "}
                              &nbsp;&nbsp;
                              {(keywordTranslation && keywordTranslation["edit"]) || langKey.edit}
                            </Dropdown.Item>

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() =>
                                addDeleterequiredcertificateHandler(data)
                              }
                            >
                              {" "}
                              <img
                                src={delIconAsset}
                                alt=""
                                width="10px"
                                height="9.99px"
                              />{" "}
                              &nbsp;&nbsp;
                              {(keywordTranslation && keywordTranslation["delete"]) || langKey.delete}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )} */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                {certificateListLoading ? (
                  <Loader colSpan="8" />
                ) : (
                  <NoRecordFound colSpan="8" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {certificateList?.certificate?.links?.length && !search && (
        <PaginationComponent
          pagination={
            showAllRecord == false ? certificateList.certificate.links : null
          }
          clickHandler={paginationClickHandler}
          from={certificateList?.certificate?.from}
          to={certificateList?.certificate?.to}
          total={certificateList?.certificate?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default RequiredCertification;
