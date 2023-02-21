import React, { useEffect, useState } from "react";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import "./companies.css";
import {
  sortAsset,
  settingAsset,
  actionAsset,
  delIconAsset,
  editIconAsset,
  notFoundAsset,
  binAsset,
  editRedIconAsset,
  loaderAsset,
  uploadAsset,
  settingGreyAsset,
  deleteBlankAsset,
  editAsset,
} from "../../assets";
import CompanyModal from "./AddCompanyModal";
import Button from "../../components/Button/Button";
import {
  useCreateCompanyMutation,
  useManagementCompanyListQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesListQuery,
  useUpdateAdvanceCompanyMutation,
  useCreateCompanySuperMutation,
} from "../../services/api";
import TableComponent from "../../components/table/Table";
import AlertComponent from "../../components/alert/Alert";
import checkPermission from "../../utils/checkPermissions";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Model/DeleteModal";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import PaginationComponent from "../../components/Pagination/Pagination";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import ImageViewer from "../../components/ImageViewer";
import CompaniesTabs from "./CompaniesTabs";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const Companies = () => {
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);
  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [companyId, setCompanyId] = useState();
  // const [search, setSearchQuery] = useState("");
  const [deletedData, setDeletedData] = useState({});
  const [pageUrl, setPageUrl] = useState("");
  const [compIds, setCompIds] = useState([]);
  const [compDelete, setCompDelete] = useState();
  const [showCompanyDropdown, setShowCompanyDropdown] = useState();
  const [addCompany, setAddCompany] = useState();
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
  const [showImageLoader, setShowImageLoader] = useState();
  const [toggleImage, setToggleImage] = useState(false);
  const search = useSelector((state) => state.search?.searchedValue);

  const company_Id = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
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
        (keywordTranslation && keywordTranslation["company"]) ||
        langKey.company,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name: (keywordTranslation && keywordTranslation["logo"]) || langKey.logo,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name: (keywordTranslation && keywordTranslation["site"]) || langKey.site,
      icon: "",
      elementStyle: "ml-1 data-icon",
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

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowCompanyDropdown(!showCompanyDropdown);
    setShowInputValue(!showInputValue);
    setToggleImage(!toggleImage);
  };

  const addAddCompanyHandler = () => {
    setShowAddCompanyModal((prev) => !prev);
  };

  const editCompanyHandler = () => {
    setEditCompanyModal((prev) => !prev);
  };

  const {
    data: managementCompanyList,
    isLoading: managementCompanyLoading,
    isFetching: managementCompanyFetching,
    isError: managementCompanyError,
    refetch,
  } = useManagementCompanyListQuery({
    url: pageUrl,
    params: {
      search_company: search,
      company_id: companyId,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
    setCompanyId(company_Id);
  }, []);

  const [
    createCompanySuper,
    {
      isLoading: createCompanyLoading,
      isFetching: createCompanyFetching,
      isError: createCompanyIsError,
      isSuccess: createCompanySuccess,
      reset: createCompanyReset,
      error: createCompanyError,
    },
  ] = useCreateCompanySuperMutation();

  const [
    updateCompany,
    {
      isLoading: updateCompanyLoading,
      isError: updateCompanyError,
      isSuccess: updateCompanySuccess,
      reset: updateCompanyReset,
      error: updateCompanyErrorMessage,
    },
  ] = useUpdateCompanyMutation();

  const [
    updateAdvanceCompany,
    {
      isLoading: updateAdvanceCompanyLoading,
      isError: updateAdvanceCompanyIsError,
      isSuccess: updateAdvanceCompanySuccess,
      reset: updateAdvanceCompanyReset,
      error: updateAdvanceCompanyError,
    },
  ] = useUpdateAdvanceCompanyMutation();

  const [
    deleteCompany,
    {
      isLoading: deleteCompanyLoading,
      isError: deleteCompanyError,
      isSuccess: deleteCompanySuccess,
      reset: deleteCompanyReset,
    },
  ] = useDeleteCompanyMutation();

  const updateCompanyFunc = (formData) => {
    updateCompany({ formData, id: editData.id })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          // toast.success(
          //   (keywordTranslation &&
          //     keywordTranslation["companyUpdateSuccess"]) ||
          //     successMsg.companyUpdateSuccess
          // );
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["companyUpdateSuccess"]) ||
            successMsg.companyUpdateSuccess;
          toast.success(msg);
          // setAlertMessage(payload.message);
          setEditCompanyModal(false);
        }
      })
      .catch((error) => {});
  };

  const deleteCompanyFunc = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (compDelete) {
      data.ids = [compDelete];
    } else {
      data.ids = [...compIds];
    }
    if (data.ids.length) {
      deleteCompany(data).then((payload) => {
        // toast.success(
        //   (keywordTranslation && keywordTranslation["companyDeleteSuccess"]) ||
        //   successMsg.companyDeleteSuccess
        // );
        let msg =
          (payload?.data?.message == "deleted" &&
            keywordTranslation &&
            keywordTranslation["companyDeleteSuccess"]) ||
          successMsg.companyDeleteSuccess;
        toast.success(msg);
        compIds.length && setCompIds([]);
        deleteModalHandler(null);
      });
    }
  };

  const deleteModalHandler = (company) => {
    setCompDelete(company);
    setShowDeleteModal((prev) => !prev);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = managementCompanyData?.map((data) => data.id);
      setCompIds([...ids]);
    } else {
      setCompIds([]);
    }
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = compIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setCompIds([...stateIds]);
  };

  const isIdAdded = (id) => {
    return compIds.includes(JSON.parse(id));
  };

  const createCompanyFunc = (data) => {
    createCompanySuper(data)
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          // toast.success(
          //   (keywordTranslation &&
          //     keywordTranslation["companyCreatedSuccess"]) ||
          //   successMsg.companyCreatedSuccess
          // );
          let msg =
            (payload?.message == "created" &&
              keywordTranslation &&
              keywordTranslation["companyCreatedSuccess"]) ||
            successMsg.companyCreatedSuccess;
          toast.success(msg);
          // setAlertMessage(payload.message);
          setShowAddCompanyModal(false);
        }
      })
      .catch((error) => {});
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({
    url: "",
    params: { search: "", company_id: companyId },
  });

  const managementCompanyData = managementCompanyList?.data?.data;

  const company_create = checkPermission("company_create");
  const company_delete = checkPermission("company_delete");
  const company_update = checkPermission("company_update");

  const editCompanyAdvancedHandler = (index) => {
    setShowCompanyDropdown(index);
    setShowInputValue(!showInputValue);
    setToggleImage(!toggleImage);
  };

  const onBlurHandlerEdit = (e, data) => {
    let text = e.target.value;
    editApiHandlerText(text, data);
  };

  const keyPressEditHandler = (e, data) => {
    let text = e.target.value;
    editApiHandlerText(text, data);
  };

  const editFieldHandler = (data, index) => {
    setShowInputValue(index);
    setHideField(data?.name);
    setShowCompanyDropdown(!showCompanyDropdown);
    setToggleImage(!toggleImage);
  };

  const imageUploadHandlerEdit = (e, data, index) => {
    setShowImageLoader(index);
    let image = e.target.files[0];
    editApiHandlerImage(image, data);
  };

  const imageRemoveEditHandler = (data, index) => {
    setToggleImage(index);
    setShowCompanyDropdown(!showCompanyDropdown);
    setShowInputValue(!showInputValue);
  };

  const editCompanyApiHandler = (value, data) => {
    setAddCompany(value);
    let formData = new FormData();

    formData.append("_method", "put");

    if (data?.name) {
      formData.append("name", data?.name);
      formData.append("pc_id", value);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["nameRequired"]) ||
          validationsKey.nameRequired
      );
    }

    if (value) {
      updateAdvanceCompany({ formData, id: data.id })
        .unwrap()
        .then((payload) => {
          setShowCompanyDropdown(!showCompanyDropdown);
          // toast.success(
          //   (keywordTranslation &&
          //     keywordTranslation["companyUpdateSuccess"]) ||
          //   successMsg.companyUpdateSuccess
          // );
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["companyUpdateSuccess"]) ||
            successMsg.companyUpdateSuccess;
          toast.success(msg);
        })
        .catch((error) => {
          // toast.error(error.data.message);
        });
    }
  };

  const editApiHandlerText = (text, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (data?.company_parent?.id) {
      formData.append("name", text);
      formData.append("pc_id", data?.company_parent?.id);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["companyRequired"]) ||
          validationsKey.companyRequired
      );
    }

    updateAdvanceCompany({ formData, id: data.id })
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        // toast.success(
        //   (keywordTranslation && keywordTranslation["companyUpdateSuccess"]) ||
        //   successMsg.companyUpdateSuccess
        // );
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg);
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  const editApiHandlerImage = (image, data) => {
    let formData = new FormData();
    formData.append("_method", "put");

    if (data?.company_parent?.id && data?.name) {
      formData.append("name", data?.name);
      formData.append("pc_id", data?.company_parent?.id);
      formData.append("logo", image);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["companyNameRequired"]) ||
          validationsKey.companyNameRequired
      );
    }

    updateAdvanceCompany({ formData, id: data.id })
      .unwrap()
      .then((payload) => {
        setToggleImage(!toggleImage);
        // toast.success(
        //   (keywordTranslation && keywordTranslation["companyUpdateSuccess"]) ||
        //   successMsg.companyUpdateSuccess
        // );
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg);
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-4">
          <div className="col-12">
            <p className="tableheading">
              {(keywordTranslation && keywordTranslation["manageCompanies"]) ||
                langKey.manageCompanies}
            </p>
          </div>

          {/* <div className="col-lg-4 col-md-4">
            <SearchBar
              placeholder={
                (keywordTranslation && keywordTranslation["searchBySite"]) ||
                langKey.searchBySite
              }
              searchClass="languageSearchBar"
              value={search}
              onChange={(e) => {
                // setSearchQuery(e.target.value);
                setPageUrl("");
              }}
            />
          </div> */}

          <div className="col-xl-2 col-lg-3 col-md-4">
            <div className="h-29px userSelectableDropdown">
              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companies}
                changeHandler={(value) => setCompanyId(value)}
              />
            </div>
          </div>

          <div className="col-xl-2 col-lg-1 col-md-1 pl-0">
            {compIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2 pointer"
                onClick={() => deleteModalHandler(null)}
              />
            ) : null}
          </div>

          <div className="col-lg-8 col-md-7">
            {company_create && (
              <Button
                label={
                  (keywordTranslation && keywordTranslation["addnewCompany"]) ||
                  langKey.addnewCompany
                }
                buttonStyle="create_btn float-right"
                onClick={addAddCompanyHandler}
              />
            )}
            {/* Add new company */}
            {showAddCompanyModal && (
              <CompanyModal
                toggleModal={addAddCompanyHandler}
                action={createCompanyFunc}
                loading={createCompanyLoading}
                error={createCompanyIsError}
              >
                {createCompanyIsError && (
                  <AlertComponent
                    error={true}
                    message={createCompanyError.data.message}
                    closeHandler={createCompanyReset}
                  />
                )}
              </CompanyModal>
            )}
            {/* edit company  model */}
            {editCompanyModal && (
              <CompanyModal
                toggleModal={editCompanyHandler}
                action={updateCompanyFunc}
                data={editData}
                loading={updateCompanyLoading}
                title={
                  (keywordTranslation &&
                    keywordTranslation["Update Company"]) ||
                  "Update Company"
                }
              >
                {updateCompanyError && (
                  <AlertComponent
                    error={true}
                    message={updateCompanyErrorMessage.data.message}
                    closeHandler={updateCompanyReset}
                  />
                )}
              </CompanyModal>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <DeleteModal
            action={deleteCompanyFunc}
            id={deletedData.id}
            deleteMessage={
              (keywordTranslation && keywordTranslation["delCompanyMsg"]) ||
              langKey.delCompanyMsg
            }
            targetName={
              compDelete?.name ||
              (keywordTranslation && keywordTranslation["selected"]) ||
              langKey.selected
            }
            handleCloseDeleteModal={() => deleteModalHandler(null)}
            loading={deleteCompanyLoading}
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
                              managementCompanyData?.length &&
                              managementCompanyData.length === compIds.length
                            }
                          />
                        </div>
                      </th>
                    )
                  ) : name === langKey.setting ? (
                    <th scope="col" key={id}>
                      <div className="last-th">
                        <p className="fs-12">Action</p>
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
            {managementCompanyData?.length ? (
              managementCompanyData.map((data, index) => {
                const compAdded = isIdAdded(data.id);
                const date = moment(data.created_at).format("MMM DD, hh:mm");
                return (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td>
                        <input
                          type="checkbox"
                          id={index}
                          value={data.id}
                          onChange={checkBoxHandler}
                          checked={compAdded}
                        />
                      </td>
                    )}

                    {tableTitle[1].status && (
                      <td>{index + managementCompanyList.data.from}</td>
                    )}

                    {tableTitle[2].status && (
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            {showCompanyDropdown === index ? (
                              <div className="advanceViewDropDown">
                                <SearchableDropdown
                                  placeholder={
                                    (keywordTranslation &&
                                      keywordTranslation["selectCompany"]) ||
                                    langKey.selectCompany
                                  }
                                  options={companies}
                                  selectedValue={data?.company_parent?.id}
                                  changeHandler={(value) =>
                                    editCompanyApiHandler(value, data)
                                  }
                                />
                              </div>
                            ) : (
                              <div>{data?.company_parent?.name}</div>
                            )}
                          </div>

                          {updateAdvanceCompanyLoading &&
                            showCompanyDropdown === index && (
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
                            onClick={() => editCompanyAdvancedHandler(index)}
                          />
                        </div>
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>
                        {data?.logo ? (
                          <>
                            {toggleImage !== index ? (
                              <ImageViewer
                                src={data?.logo}
                                className="mr-2"
                                width="80px"
                                height="35px"
                                name="image"
                              />
                            ) : (
                              <div
                                className="csvfile_div p-2 advanceViewFileUpload"
                                style={{ height: "40px", width: "40px" }}
                              >
                                {updateAdvanceCompanyLoading &&
                                  showImageLoader === index && (
                                    <img
                                      src={loaderAsset}
                                      width="60px"
                                      height="60px"
                                      className="advanceViewLoader"
                                    />
                                  )}
                                <center>
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
                                        imageUploadHandlerEdit(e, data, index)
                                      }
                                    />
                                  </>
                                </center>
                              </div>
                            )}

                            {toggleImage !== index && (
                              <img
                                src={editRedIconAsset}
                                className="cursor advanceViewDelIconn"
                                width="12px"
                                height="12px"
                                onClick={() =>
                                  imageRemoveEditHandler(data, index)
                                }
                              />
                            )}
                          </>
                        ) : (
                          <div
                            className="csvfile_div p-2 advanceViewFileUpload"
                            style={{ height: "40px", width: "40px" }}
                          >
                            {updateAdvanceCompanyLoading &&
                              showImageLoader === index && (
                                <img
                                  src={loaderAsset}
                                  width="100px"
                                  height="100px"
                                  className="advanceViewLoader"
                                />
                              )}

                            <center>
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
                                    imageUploadHandlerEdit(e, data, index)
                                  }
                                />
                              </>
                            </center>
                          </div>
                        )}
                      </td>
                    )}

                    {tableTitle[4].status && (
                      <td>
                        <div
                          className="d-flex align-items-center justify-content-start"
                          style={{ gap: "10px" }}
                        >
                          {showInputValue === index ? (
                            <input
                              type="text"
                              name="name"
                              style={{ width: "150px" }}
                              value={hideField}
                              className="typetext mr-2 form-control"
                              placeholder="ROLE"
                              onChange={(e) => setHideField(e.target.value)}
                              onBlur={(e) => onBlurHandlerEdit(e, data)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                keyPressEditHandler(e, data)
                              }
                            />
                          ) : (
                            <p className="mb-0">{data?.name}</p>
                          )}

                          {updateAdvanceCompanyLoading &&
                            showInputValue === index && (
                              <img
                                src={loaderAsset}
                                width="35px"
                                height="35px"
                              />
                            )}

                          <img
                            src={editRedIconAsset}
                            className="cursor"
                            width="12px"
                            height="12px"
                            onClick={() => editFieldHandler(data, index)}
                          />
                        </div>
                      </td>
                    )}
                    {tableTitle[5].status && <td>{date || "—"}</td>}
                    <td>
                      <div className="last-td">
                        {company_delete && (
                          <img
                            src={deleteBlankAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="pointer"
                            onClick={() => {
                              deleteModalHandler(data);
                            }}
                          />
                        )}
                        {company_update && (
                          <img
                            src={editAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="pointer"
                            onClick={() => {
                              setEditData(data);
                              editCompanyHandler();
                            }}
                          />
                        )}
                      </div>
                      {/* {!compAdded && (
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
                              {(keywordTranslation &&
                                keywordTranslation["action"]) ||
                                langKey.action}
                            </p>

                            {company_update && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  setEditData(data);
                                  editCompanyHandler();
                                }}
                              >
                                <img
                                  src={editIconAsset}
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                &nbsp;&nbsp;
                                {(keywordTranslation &&
                                  keywordTranslation["edit"]) ||
                                  langKey.edit}
                              </Dropdown.Item>
                            )}

                            {company_delete && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  deleteModalHandler(data);
                                }}
                              >
                                <img
                                  src={delIconAsset}
                                  alt=""
                                  width="10px"
                                  height="9.99px"
                                />
                                &nbsp;&nbsp;
                                {(keywordTranslation &&
                                  keywordTranslation["delete"]) ||
                                  langKey.delete}
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      )} */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                {managementCompanyLoading ? (
                  <Loader colSpan="8" />
                ) : (
                  <NoRecordFound colSpan="8" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {managementCompanyList?.data?.links?.length && !search && (
        <PaginationComponent
          pagination={
            showAllRecord == false ? managementCompanyList?.data?.links : null
          }
          clickHandler={paginationClickHandler}
          from={managementCompanyList?.data?.from}
          to={managementCompanyList?.data?.to}
          total={managementCompanyList?.data?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default Companies;
