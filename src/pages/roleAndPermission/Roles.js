import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import DetailCard from "../../components/detailCard/DetailCard";
import "../../components/table/Table.css";
import SaveButton from "../../components/Button/Button";
import TableComponent from "../../components/table/Table";
import "./RoleAndPermission.css";
import {
  sortAsset,
  actionAsset,
  editIconAsset,
  delIconAsset,
  binAsset,
  settingAsset,
  addIconAsset,
  loaderAsset,
  crossAsset,
  editRedIconAsset,
  bin2Asset,
  settingGreyAsset,
  editAsset,
  deleteBlankAsset,
} from "../../assets";
import DeleteModal from "../../components/Model/DeleteModal";
import AddRoleModal from "./AddRoleModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import DateRangeSelector from "../../components/dateRangeSelector/DateRangeSelector";
import roleDetailCardsData from "./RoleAndPermissionData";
import PaginationComponent from "../../components/Pagination/Pagination";
import validationsKey from "../../localization/validationsLocale.json";

import {
  useAddNewRoleMutation,
  useAddNewRoleNewMutation,
  useGetCompanyPermissionsMutation,
  useGetCompaniesListQuery,
  useUpdateRoleMutation,
  useGetRolesListQuery,
} from "../../services/api";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import checkPermission from "../../utils/checkPermissions";
import moment from "moment";
import AlertComponent from "../../components/alert/Alert";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import { toast } from "react-toastify";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import TableSettingMenu from "../../components/TableSetting";
import RoleAndPermissionRouter from "./RoleAndPermissionRouter";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";

const Roles = () => {
  const searchquery = useSelector((state) => state.search?.searchedValue);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roleIds, setRoleIds] = useState([]);
  const userInfo = useSelector((state) => state.auth?.userDetail?.user);
  const [editRole, setEditRole] = useState("");
  const [roleSearchs, setRoleSearchs] = useState({});
  const [showPermissionRole, setShowPermissionRole] = useState(true);
  const [companyPermissionList, setCompanyPermissionList] = useState([]);
  const [pageUrl, setPageUrl] = useState("");
  const [data, setData] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [addCompany, setAddCompany] = useState();
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
  const [statusValue, setStatusValue] = useState("active");
  const [showAllRecord, setShowAllRecord] = useState("");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState();
  const [toggleChecked, setToggleChecked] = useState(false);

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
      name: (keywordTranslation && keywordTranslation["Company"]) || "Company",
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name: (keywordTranslation && keywordTranslation["Role"]) || "Role",
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 6,
      status: true,
      name: (keywordTranslation && keywordTranslation["Status"]) || "Status",
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

  const showDeleteRoleModalHandler = (data) => {
    let showModal = data ? true : false;
    setData(data);
    setShowDeleteRoleModal(showModal);
  };

  const deleteAllModalHandler = () => {
    setShowDeleteRoleModal((prev) => !prev);
  };

  const showAddRoleModalHandler = () => {
    setShowAddRoleModal((prev) => !prev);
  };

  const dateRangeHandler = useCallback((value) => {
    setRoleSearchs((pre) => ({ ...pre, range: value }));
  }, []);

  // New Role Add
  const [
    addNewRoleNew,
    {
      isLoading: loadingAddRole,
      isError: loadingAddRoleError,
      isSuccess: loadingAddSuccess,
      reset: loadingAddRoleReset,
      error,
    },
  ] = useAddNewRoleNewMutation();

  // Add Role
  const [addNewRole, { isLoading: loadingDelRole }] = useAddNewRoleMutation();

  const createApiHandler = (data) => {
    addNewRoleNew(data)
      .unwrap()
      .then((payload) => {
        if (payload.data === "error") {
          showAddRoleModalHandler();
          toast.error(
            (keywordTranslation && keywordTranslation["roleNameExits"]) ||
            validationsKey.roleNameExits
          );
        } else {
          showAddRoleModalHandler();
          toast.success(
            (keywordTranslation && keywordTranslation["roleCreatedSuccess"]) ||
            successMsg.roleCreatedSuccess
          );
        }
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  const [
    updateRole,
    {
      isLoading: updateRoleLoading,
      isError: updateRoleIsError,
      isSuccess: updateRoleSuccess,
      reset: updateRoleReset,
      error: updateRoleError,
    },
  ] = useUpdateRoleMutation();

  const editApiHandler = (formData) => {
    updateRole({ formData, id: editRole })
      .unwrap()
      .then((payload) => {
        editModalHandler(null);
        toast.success(
          (keywordTranslation && keywordTranslation["roleUpdateSuccess"]) ||
          successMsg.roleUpdateSuccess
        );
      });
  };

  const updateStatus = (id, formData) => {
    updateRole({ formData, id: id })
      .unwrap()
      .then((payload) => {
        editModalHandler(null);
        toast.success(
          (keywordTranslation && keywordTranslation["roleUpdateSuccess"]) ||
          successMsg.roleUpdateSuccess,
          {
            toastId: "",
          }
        );
      });
  };

  const toggleHandler = (data) => {
    let { company_id, id, name, status } = data;

    const formData = {
      status: status === "active" ? "inactive" : "active",
      _method: "put",
      name,
      company_id,
    };
    updateStatus(id, formData);
  };

  const editModalHandler = (data) => {
    let showModal = data ? true : false;
    setEditRole();
    setData(data);
    setEditRole(data?.id);
    setShowEditModal(showModal);
  };

  const deleteApiHandler = () => {
    let dataToDelete = {
      _method: "delete",
    };
    if (data) {
      dataToDelete.roleids = [data.id];
      addNewRole(dataToDelete)
        .unwrap()
        .then((payload) => {
          showDeleteRoleModalHandler(null);
          toast.success(
            (keywordTranslation && keywordTranslation["roleDeleteSuccess"]) ||
            successMsg.roleDeleteSuccess
          );
        })
        .catch((error) => {
          console.error("error is here", error);
        });
    } else {
      dataToDelete.roleids = [...roleIds];
      addNewRole(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["roleDeleteSuccess"]) ||
            successMsg.roleDeleteSuccess
          );
          deleteAllModalHandler(null);
          setRoleIds([]);
        });
    }
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = roleIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setRoleIds([...stateIds]);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = rolesInfo?.role?.data?.map((data) => data.id);
      setRoleIds([...ids]);
    } else {
      setRoleIds([]);
    }
  };

  const isIdAdded = (id) => {
    return roleIds.includes(JSON.parse(id));
  };

  // get Role list and search role
  const {
    data: rolePermissionList,
    isLoading: rolePermissionLoading,
    isFetching: rolePermissionFetching,
    isError: rolePermissionError,
  } = useGetRolesListQuery({
    pageUrl,
    params: {
      ...roleSearchs,
      search: searchquery,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  const rolesInfo = rolePermissionList?.data;

  const [
    getCompanyPermissions,
    {
      isLoading: companyPermissionLoading,
      isFetching: companyPermissionFetching,
      isError: companyPermissionError,
    },
  ] = useGetCompanyPermissionsMutation();

  const {
    data: companyList,
    isLoading: companyListLoading,
    isFetching: companyListFetching,
    isError: companyListError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  const getPermissions = (companyId) => {
    getCompanyPermissions(companyId)
      .unwrap()
      .then((payload) => {
        setCompanyPermissionList(payload?.data?.data);
      })
      .catch((error) => { });
  };

  const paginationClickHandler = (url) => {
    if (url) {
      setPageUrl(url);
    }
    setShowInputValue(!showInputValue);
    setShowCompanyDropdown(!showCompanyDropdown);
  };

  const searchHandlear = (e) => {
    setRoleSearchs((pre) => ({ ...pre, search: e.target.value }));
  };

  const searchDropdownHandlear = (value) => {
    setShowPermissionRole(true);
    setRoleSearchs((pre) => ({ ...pre, company_id: value }));
    getPermissions(parseInt(value));
  };

  let cardData = [
    rolesInfo?.total_role,
    rolesInfo?.active,
    rolesInfo?.inactive,
    rolesInfo?.top_use_role[0]?.name,
  ];

  const addInputField = () => {
    setShowInputValue(!showInputValue);
    setInputFields([inputFields]);
  };

  const removeInputFields = (index) => {
    let rows = [...inputFields];
    rows = rows.filter((data, dataIndex) => { });
    setInputFields([...rows]);
  };

  const handleChangeAdd = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const companyChangeAddHandler = (value) => {
    setAddCompany(value);
  };

  const editFieldHandler = (data, index) => {
    setShowInputValue(index);
    setShowCompanyDropdown(!showCompanyDropdown);
    setHideField(data?.name);
  };

  const editCompanyHandler = (index) => {
    setShowCompanyDropdown(index);
    setShowInputValue(!showInputValue);
  };

  const onBlurHandler = (name) => {
    onSubmit(name, addCompany);
  };

  const keyPressAddHandler = (name) => {
    onSubmit(name, addCompany);
  };

  const addCompanyHandler = (value, name) => {
    onSubmitCompany(value, name, statusValue);
  };

  const onBlurHandlerEdit = (e, tableData) => {
    let text = e.target.value;
    editApiHandlerText(text, tableData, addCompany);
  };

  const keyPressEditHandler = (e, tableData) => {
    let text = e.target.value;
    editApiHandlerText(text, tableData, addCompany);
  };

  const onSubmit = (name, company) => {
    let formData = new FormData();

    formData.append("_method", "post");

    if (name) {
      formData.append("name", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["roleRequired"]) ||
        validationsKey.roleRequired
      );
      return false;
    }

    if (statusValue) {
      formData.append("status", statusValue);
    } else {
      formData.append("status", "active");
    }

    if (company) {
      formData.append("company_id", company);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["companyRequired"]) ||
        validationsKey.companyRequired
      );
      return false;
    }

    addNewRoleNew(formData)
      .unwrap()
      .then((payload) => {
        if (payload.data === "error") {
          toast.error(
            (keywordTranslation && keywordTranslation["roleNameExits"]) ||
            validationsKey.roleNameExits
          );
        } else {
          removeInputFields();
          toast.success(
            (keywordTranslation && keywordTranslation["roleCreatedSuccess"]) ||
            successMsg.roleCreatedSuccess
          );
        }
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  const onSubmitCompany = (value, name, statusValue) => {
    setAddCompany(value);

    let formData = new FormData();

    formData.append("_method", "post");

    if (name !== undefined) {
      formData.append("name", name);
      formData.append("company_id", value);
    } else {
      // toast.error(keywordTranslation && keywordTranslation["roleRequired"] || validationsKey.roleRequired);
      return false;
    }

    if (statusValue) {
      formData.append("status", statusValue);
    } else {
      formData.append("status", "active");
    }

    addNewRoleNew(formData)
      .unwrap()
      .then((payload) => {
        removeInputFields();
        toast.success(
          (keywordTranslation && keywordTranslation["roleCreatedSuccess"]) ||
          successMsg.roleCreatedSuccess
        );
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  const editApiHandlerText = (name, tableData, company) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (name) {
      formData.append("name", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["roleRequired"]) ||
        validationsKey.roleRequired
      );
    }

    formData.append("status", "active");

    formData.append("id", tableData?.id);

    if (company) {
      formData.append("company_id", company);
    } else {
      formData.append("company_id", tableData?.company_id);
    }

    updateRole({ formData, id: tableData?.id })
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        removeInputFields();
        toast.success(
          (keywordTranslation && keywordTranslation["roleUpdateSuccess"]) ||
          successMsg.roleUpdateSuccess
        );
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  const editCompanyApiHandler = (value, tableData) => {
    setAddCompany(value);

    let formData = new FormData();

    formData.append("_method", "put");

    if (tableData?.name) {
      formData.append("name", tableData?.name);
      formData.append("company_id", value);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["roleRequired"]) ||
        validationsKey.roleRequired
      );
    }

    formData.append("status", "active");

    formData.append("id", tableData?.id);

    updateRole({ formData, id: tableData?.id })
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        setShowCompanyDropdown(!showCompanyDropdown);
        toast.success(
          (keywordTranslation && keywordTranslation["roleUpdateSuccess"]) ||
          successMsg.roleUpdateSuccess
        );
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  return (
    <>
      <div className="sideMargin mt-4">
        {loadingAddRoleError && (
          <AlertComponent
            error={true}
            message={error.data.message}
            closeHandler={loadingAddRoleReset}
          />
        )}

        <div className="row align-items-center">
          <div className="col-6">
            <p className="tableheading mb-0">
              {(keywordTranslation && keywordTranslation["rolesInfo"]) ||
                langKey.rolesInfo}
            </p>
          </div>

          <div className="col-6 d-flex justify-content-end">
            <SaveButton
              label={
                (keywordTranslation && keywordTranslation["newRole"]) ||
                langKey.newRole
              }
              buttonStyle="create_btn"
              onClick={showAddRoleModalHandler}
            />
          </div>

          {showAddRoleModal && (
            <AddRoleModal
              handleCloseAddroleModal={showAddRoleModalHandler}
              action={createApiHandler}
              loading={loadingAddRole}
            />
          )}

          {showEditModal && data && (
            <AddRoleModal
              handleCloseAddroleModal={() => editModalHandler(null)}
              action={editApiHandler}
              data={data}
              loading={loadingAddRole || updateRoleLoading}
            ></AddRoleModal>
          )}

          {showDeleteRoleModal && (
            <DeleteModal
              deleteMessage="You are going to delete the role"
              targetName={data?.name || "Selected"}
              action={deleteApiHandler}
              handleCloseDeleteModal={showDeleteRoleModalHandler}
              loading={loadingDelRole}
            />
          )}
        </div>

        {/* <div className="row">
          {roleDetailCardsData.map((data, index) => (
            <DetailCard
              key={index}
              {...data}
              columns="col-md-4 col-lg-3 mx-auto mt-4"
              title={cardData[index]}
            />
          ))}
        </div> */}

        <div className="row mt-4">
          {/* <div className="col-lg-3 col-md-4 pr-0">
            <SearchBar
              placeholder={
                (keywordTranslation && keywordTranslation["searchByRole"]) ||
                langKey.searchByRole
              }
              searchClass="languageSearchBar"
              selectedValue={roleSearchs?.search}
              onChange={searchHandlear}
            />
          </div> */}

          <div className="col-lg-2 col-md-3">
            <div className="h-29px userSelectableDropdown">
              <SearchableDropdown
                selectedValue={roleSearchs?.company_id}
                placeholder={
                  // userInfo?.company
                  //   ? userInfo?.company?.name
                  //   :
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companyList}
                changeHandler={(value) => {
                  searchDropdownHandlear(value);
                }}
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-1 pl-0">
            {roleIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2"
                onClick={deleteAllModalHandler}
              />
            ) : null}
          </div>

          <div className="col-lg-8 col-md-8">
            <div className="float-right" style={{ width: "163px" }}>
              <DateRangeSelector
                className="w-100"
                selectedValue={roleSearchs.range}
                onCallback={dateRangeHandler}
              />
            </div>
          </div>
        </div>

        <div>
          <TableComponent showAllRecord ={showAllRecord}>
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
                                rolesInfo?.role?.data?.length &&
                                rolesInfo.role.data.length === roleIds.length
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
                            {/* {name} */}
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
              <tr className="bg-white">
              <td colSpan={6}></td>
                <td>
                  <div className="d-flex justify-content-end  mr-3">
                    <img
                      src={addIconAsset}
                      width="25px"
                      height="25px"
                      className="cursor"
                      onClick={addInputField}
                    />
                  </div>
                </td>
              </tr>

              {/* Dynamically adding fields */}
              {inputFields.map((data, index) => {
                let { name } = data;
                return (
                  <>
                    <tr key={index}>
                      <td></td>
                      <td>0</td>
                      <td>{moment().format("MMM DD, YYYY, hh:mm A")}</td>

                      <td>
                        <SearchableDropdown
                          placeholder={
                            //   userInfo?.company?.name
                            //     ? userInfo?.company?.name
                            //     :
                            (keywordTranslation &&
                              keywordTranslation["selectCompany"]) ||
                            langKey.selectCompany
                          }
                          options={companyList}
                          changeHandler={(value) =>
                            addCompanyHandler(value, name)
                          }
                        />
                      </td>

                      <td>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            value={name}
                            style={{ width: "250px" }}
                            name="name"
                            className="typetext mr-2 form-control"
                            placeholder={
                              (keywordTranslation &&
                                keywordTranslation["role"]) ||
                              langKey.role
                            }
                            onChange={(evnt) => handleChangeAdd(index, evnt)}
                            onBlur={() => onBlurHandler(name)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && keyPressAddHandler(name)
                            }
                          />

                          {loadingAddRole && (
                            <img src={loaderAsset} width="35px" height="35px" />
                          )}
                        </div>
                      </td>

                      <td>
                        <select
                          className="selectclient fontsize-12 form-select rounded"
                          onChange={(e) => setStatusValue(e.target.value)}
                        >
                          <option value="active">
                            {(keywordTranslation &&
                              keywordTranslation["Active"]) ||
                              "Active"}
                          </option>
                          <option value="inactive">
                            {(keywordTranslation &&
                              keywordTranslation["InActive"]) ||
                              "InActive"}
                          </option>
                        </select>
                      </td>

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
              {rolesInfo?.role?.data?.length ? (
                rolesInfo.role.data.map((data, index) => {
                  const roleAdded = isIdAdded(data.id);
                  let { company_id, created_at, id, name, status } = data;
                  return (
                    <tr>
                      {tableTitle[0].status && (
                        <td>
                          <input
                            type="checkbox"
                            id={index}
                            value={id}
                            onChange={checkBoxHandler}
                            checked={roleAdded}
                          />
                        </td>
                      )}

                      {tableTitle[1].status && (
                        <td>{index + rolesInfo.role.from}</td>
                      )}

                      {tableTitle[2].status && (
                        <td style={{ width: "20%" }}>
                          <div className="d-flex align-items-center">
                            <div>
                              {data?.company_name}

                              {/* {showCompanyDropdown === index &&
                                                            <div className="advanceViewDropDown">
                                                                <SearchableDropdown
                                                                    placeholder={(keywordTranslation && keywordTranslation["selectCompany"]) || langKey.selectCompany}
                                                                    options={companyList}
                                                                    selectedValue={data ? data?.company_id : company_id}
                                                                    changeHandler={(value) => editCompanyApiHandler(value, data)}
                                                                />
                                                            </div>
                                                        } */}
                            </div>

                            {updateRoleLoading &&
                              showCompanyDropdown === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}

                            {/* <img
                                                        src={editRedIconAsset}
                                                        className="cursor ml-1" width="12px" height="12px"
                                                        onClick={() => editCompanyHandler(index)}
                                                    /> */}
                          </div>
                        </td>
                      )}

                      {tableTitle[3].status && (
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
                                placeholder={
                                  (keywordTranslation &&
                                    keywordTranslation["role"]) ||
                                  langKey.role
                                }
                                onChange={(e) => setHideField(e.target.value)}
                                onBlur={(e) => onBlurHandlerEdit(e, data)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  keyPressEditHandler(e, data)
                                }
                              />
                            ) : (
                              <p className="mb-0">{name}</p>
                            )}

                            {updateRoleLoading && showInputValue === index && (
                              <img src={loaderAsset} width="35px" height="35px" />
                            )}

                            <img
                              src={editRedIconAsset}
                              className="cursor"
                              width="12px"
                              height="12px"
                              onClick={() => editFieldHandler(data, index)}
                            />

                            {/* <img
                            src={bin2Asset}
                            className="cursor"
                            width="12px"
                            height="13px"
                            onClick={() => showDeleteRoleModalHandler(data)}
                          /> */}
                          </div>
                        </td>
                      )}

                      {tableTitle[4].status && (
                        <td>{moment(created_at).format("MMM DD, hh:mm")}</td>
                      )}
                      {tableTitle[5].status && (
                        <td>
                          <ToggleSlide
                            Class="Medium"
                            onChangeHandler={() => toggleHandler(data)}
                            checked={status === "active" ? true : false}
                          />
                        </td>
                      )}
                      <td>
                        {!roleAdded && (
                          <div className="last-td">
                            <img
                              src={editAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              className="pointer"
                              onClick={() => editModalHandler(data)}
                            />
                            <img
                              src={deleteBlankAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              onClick={() => showDeleteRoleModalHandler(data)}
                              className="pointer"
                            />
                          </div>
                        )}
                        {/* {!roleAdded && (
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

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => editModalHandler(data)}
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

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => showDeleteRoleModalHandler(data)}
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
                          </Dropdown.Menu>
                        </Dropdown>
                      )} */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>
                  {rolePermissionLoading ? (
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
      {rolesInfo?.role?.links?.length && (
        <PaginationComponent
          pagination={showAllRecord == false ? rolesInfo.role.links : null}
          clickHandler={paginationClickHandler}
          from={rolesInfo?.role?.from}
          to={rolesInfo?.role?.to}
          total={rolesInfo?.role?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default Roles;
