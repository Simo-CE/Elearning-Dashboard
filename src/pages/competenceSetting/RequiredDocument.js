import React, { useState, useEffect } from "react";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import SaveButton from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableComponent from "../../components/table/Table";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import "./CompetenceSetting.css";
import "../../components/Subnav.css";
import {
  binAsset,
  settingAsset,
  sortAsset,
  actionAsset,
  editIconAsset,
  delIconAsset,
  notFoundAsset,
  editRedIconAsset,
  loaderAsset,
  settingGreyAsset,
  deleteBlankAsset,
  editAsset,
} from "../../assets";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import RequiredDocumentModal from "./RequiredDocumentModal";
import DeleteModal from "../../components/Model/DeleteModal";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import PaginationComponent from "../../components/Pagination/Pagination";
import {
  useDeleteDocumentsMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation,
  useAddDocumentMutation,
  useUpdateStatusDocumentMutation,
  useRoleDropDownQuery,
  useGetCompaniesListQuery,
  useUpdateDocumentAdvancedMutation,
} from "../../services/api";
import AlertComponent from "../../components/alert/Alert";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import CompetenceSettingRouter from "./CompetenceSettingRouter";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const RequiredDocument = () => {
  const [search, setSearchQuery] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [data, setData] = useState(null);
  const [showEditModel, setShowEditModel] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [assign_to, setAssign_to] = useState("");
  const [company_id, setCompany_id] = useState();
  const [showAddRequiredDocumentModal, setShowAddRequiredDocumentModal] =
    useState(false);
  const [showDeleteRequiredDocumentModal, setShowDeleteRequiredDocumentModal] =
    useState(false);
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
  const [showAllRecord, setShowAllRecord] = useState("");


  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
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
        (keywordTranslation && keywordTranslation["document"]) ||
        langKey.document,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["assignTo"]) ||
        langKey.assignTo,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["required"]) ||
        langKey.required,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const role = useSelector((state) => state.auth.userDetail.user.role[0]);

  const addAddRequiredDocumentHandler = () => {
    setShowAddRequiredDocumentModal((prev) => !prev);
  };

  const addDeleteRequiredDocumentHandler = (data) => {
    setData(data);
    setShowDeleteRequiredDocumentModal((prev) => !prev);
  };

  const editModelHandler = (data) => {
    setData(data);
    setShowEditModel((prev) => !prev);
  };

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowInputValue(!showInputValue);
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

  const isIdAdded = (id) => {
    return categoryIds.includes(JSON.parse(id));
  };

  const {
    data: companyList,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  const [
    addDocument,
    {
      isSuccess: createSuccess,
      isLoading: createLoading,
      isFetching: createFetching,
      error: createError,
      reset: createReset,
    },
  ] = useAddDocumentMutation();

  const [
    updateDocument,
    {
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isFetching: updateFetching,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateDocumentMutation();

  const [
    updateDocumentAdvanced,
    {
      isSuccess: updateDocumentAdvancedSuccess,
      isLoading: updateDocumentAdvancedLoading,
      isFetching: updateDocumentAdvancedFetching,
      error: updateDocumentAdvancedError,
      reset: updateDocumentAdvancedReset,
    },
  ] = useUpdateDocumentAdvancedMutation();

  const editApiHandler = (data) => {
    updateDocument(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["docuUpdateSuccess"]) ||
          successMsg.docuUpdateSuccess,
          { toastId: "" }
        );
        editModelHandler(null);
      });
  };

  const createApiHandler = (data) => {
    addDocument(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["docuCreatedSuccess"]) ||
          successMsg.docuCreatedSuccess,
          { toastId: "" }
        );
        addAddRequiredDocumentHandler();
      });
  };

  const [
    deleteDocuments,
    {
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      isFetching: deleteFetching,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteDocumentsMutation();

  const deleteApiHandler = () => {
    let dataToDelete = {
      _method: "delete",
      ids: [],
    };
    if (data) {
      dataToDelete.ids = [data.id];
      deleteDocuments(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["docuDeleteSuccess"]) ||
            successMsg.docuDeleteSuccess,
            { toastId: "" }
          );
          addDeleteRequiredDocumentHandler(null);
        });
    } else {
      dataToDelete.ids = [...categoryIds];
      deleteDocuments(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["docuDeleteSuccess"]) ||
            successMsg.docuDeleteSuccess,
            { toastId: "" }
          );
          addDeleteRequiredDocumentHandler(null);
          setCategoryIds([]);
        });
    }
  };

  const [
    updateStatusDocument,
    {
      isSuccess: updateStatusSuccess,
      isLoading: updateStatusLoading,
      isFetching: updateStatusFetching,
      error: updateStatusError,
      reset: updateStatusReset,
    },
  ] = useUpdateStatusDocumentMutation();

  const {
    data: tableList,
    isLoading: tableListLoading,
    isFetching: tableListFetching,
    isError: tableListError,
    refetch,
  } = useGetDocumentsQuery({
    pageUrl,
    params: {
      search,
      company_id,
      assign_to,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  // useEffect(() => {
  //   if (companyList) {
  //     setCompany_id(companyList[0].value);
  //   }
  // }, [companyList]);

  //   useEffect(() => {
  //   if (company_id) {
  //     setAssign_to("")
  //   }
  // }, [company_id, assign_to]);

  const { data: roleDropDown } = useRoleDropDownQuery(company_id);

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = tableList?.data?.map((data) => data.id);
      setCategoryIds([...ids]);
    } else {
      setCategoryIds([]);
    }
  };

  const statusUpdateApiHandler = (id, status) => {
    // let data = {
    //   _method: "put",
    //   status,
    //   id,
    // };

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("status", status);
    if (categoryIds) {
      categoryIds?.map((ids, index) => {
        formData.append(`ids[${index}]`, ids);
      });
    }

    id && formData.append(`ids[${0}]`, id);

    updateStatusDocument(formData)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["docuUpdateSuccess"]) ||
          successMsg.docuUpdateSuccess,
          { toastId: "" }
        );
      });
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
  };

  const editApiHandlerText = (name, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (name) {
      formData.append("name", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["documentRequired"]) ||
        validationsKey.documentRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);

    formData.append("company_id", data?.company_id);

    updateDocumentAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        toast.success(
          (keywordTranslation && keywordTranslation["docuUpdateSuccess"]) ||
          successMsg.docuUpdateSuccess,
          { toastId: "" }
        );
      })
      .catch((error) => {
        toast.error(error.data.message, { toastId: "" });
      });
  };

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-5 align-items-center">
          <div className="col-xl-3 col-lg-12 col-md-12 mx-auto">
            <p className="tableheading mb-0">
              {(keywordTranslation &&
                keywordTranslation["ManagerequirDocuments"]) ||
                langKey.ManagerequirDocuments}
            </p>
          </div>

          <div className="col-xl-9 col-lg-12 col-md-12 mt-md-3 mt-lg-2">
            <div className="d-flex align-items-center gap-2 justify-content-end">
              {categoryIds.length ? (
                <div className="d-flex align-items-center gap-2">
                  <SaveButton
                    label={
                      (keywordTranslation &&
                        keywordTranslation["notRequired"]) ||
                      langKey.notRequired
                    }
                    buttonStyle="createOutlineBtn"
                    onClick={() => statusUpdateApiHandler(null, 0)}
                  />
                  <SaveButton
                    label={
                      (keywordTranslation && keywordTranslation["required"]) ||
                      langKey.required
                    }
                    buttonStyle="create_btn"
                    onClick={() => statusUpdateApiHandler(null, 1)}
                  />
                  <img
                    src={binAsset}
                    alt=""
                    className="pointer"
                    onClick={() => addDeleteRequiredDocumentHandler(null)}
                  />
                </div>
              ) : null}
              {/* {role === "super admin" && (
                <div className="h-29px userSelectableDropdown">
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["selectCompany"]) ||
                      langKey.selectCompany
                    }
                    selectedValue={company_id}
                    options={companyList}
                    changeHandler={(value) => {
                      setCompany_id(value);
                      setAssign_to("");
                    }}
                  />
                </div>
              )} */}

              <p className="fs-14 fw-500 gray">Filter by</p>
              <div className="h-29px userSelectableDropdown">
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["selectAssignTo"]) ||
                    langKey.selectAssignTo
                  }
                  selectedValue={assign_to}
                  options={roleDropDown}
                  changeHandler={(value) => setAssign_to(value)}
                  // disabled={company_id ? false : true}
                />
              </div>
              <SaveButton
                label={
                  (keywordTranslation && keywordTranslation["addDocument"]) ||
                  langKey.addDocument
                }
                buttonStyle="create_btn float-right"
                onClick={addAddRequiredDocumentHandler}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            {/* <div className="col-lg-3 col-md-5">
              <SearchBar
                value={search}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageUrl("")
                }}
                placeholder={(keywordTranslation && keywordTranslation["searchByDocument"]) || langKey.searchByDocument}
                searchClass="languageSearchBar"
              />
            </div> */}

            {/* <div className="col-lg-9 col-md-7">
              <div className="row">
                <div className="col-lg-1 col-md-1 ml-auto d-flex justify-content-end">
                  {categoryIds.length ? (
                    <img
                      src={binAsset}
                      alt=""
                      className=""
                      onClick={() => addDeleteRequiredDocumentHandler(null)}
                    />
                  ) : null}
                </div>

                {role === "super admin" &&
                  <div className="col-lg-3 col-md-5 pl-0">
                    <SearchableDropdown
                      placeholder={(keywordTranslation && keywordTranslation["selectCompany"]) || langKey.selectCompany}
                      selectedValue={company_id}
                      options={companyList}
                      changeHandler={(value) => { setCompany_id(value); setAssign_to('') }}
                    />
                  </div>
                }

                <div className="col-lg-3 col-md-5 pl-0">
                  <SearchableDropdown
                    placeholder={(keywordTranslation && keywordTranslation["selectAssignTo"]) || langKey.selectAssignTo}
                    selectedValue={assign_to}
                    options={roleDropDown}
                    changeHandler={(value) => setAssign_to(value)}
                  />
                </div>


              </div>
            </div> */}

            {showAddRequiredDocumentModal && (
              <RequiredDocumentModal
                action={createApiHandler}
                loading={createLoading}
                handleCloseAddRequiredDocumentModal={
                  addAddRequiredDocumentHandler
                }
              />
            )}

            {showEditModel && data && (
              <RequiredDocumentModal
                data={data}
                action={editApiHandler}
                loading={updateLoading}
                handleCloseAddRequiredDocumentModal={() =>
                  editModelHandler(null)
                }
              />
            )}

            {showDeleteRequiredDocumentModal && (
              <DeleteModal
                deleteMessage={
                  (keywordTranslation &&
                    keywordTranslation["documentDelMsg"]) ||
                  langKey.documentDelMsg
                }
                targetName={
                  data?.name ||
                  (keywordTranslation && keywordTranslation["selected"]) ||
                  langKey.selected
                }
                handleCloseDeleteModal={() =>
                  addDeleteRequiredDocumentHandler(null)
                }
                action={deleteApiHandler}
                loading={deleteLoading}
              />
            )}
          </div>
        </div>

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
                              tableList?.data?.length &&
                              tableList.data.length === categoryIds.length
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
            {tableList?.data?.length ? (
              tableList.data.map((data, index) => {
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

                    {tableTitle[1].status && <td>{index + tableList.from}</td>}

                    {tableTitle[2].status && (
                      <td>
                        <div className="d-flex align-items-center">
                          <ModalImage
                            small={data.document || notFoundAsset}
                            large={data.document || notFoundAsset}
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
                            <div>{data?.name}</div>
                          )}

                          {updateDocumentAdvancedLoading &&
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

                    {tableTitle[3].status && (
                      <td>
                        {data?.assign_to?.map((data, index) =>
                          index === 0 ? data?.name : " & " + data?.name
                        )}
                      </td>
                    )}

                    {tableTitle[4].status && (
                      <td>
                        <div style={{ marginTop: "-5px" }}>
                          <ToggleSlide
                            Class="Medium"
                            checked={data.status}
                            onChangeHandler={(value) =>
                              statusUpdateApiHandler(data.id, value, index)
                            }
                          />
                        </div>
                      </td>
                    )}
                    {tableTitle[5].status && (
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
                          onClick={() => addDeleteRequiredDocumentHandler(data)}
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
                      {/* {categoryAdded ? null : (
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
                                addDeleteRequiredDocumentHandler(data)
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
                {tableListLoading ? (
                  <Loader colSpan="7" />
                ) : (
                  <NoRecordFound colSpan="7" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {tableList?.links?.length && !search && (
        <PaginationComponent
          pagination={showAllRecord == false ? tableList.links : null}
          clickHandler={paginationClickHandler}
          from={tableList?.from}
          to={tableList?.to}
          total={tableList?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default RequiredDocument;
