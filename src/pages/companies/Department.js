import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { useSelector } from "react-redux";
import "./companies.css";
import {
  sortAsset,
  actionAsset,
  delIconAsset,
  editIconAsset,
  settingAsset,
  binAsset,
  editRedIconAsset,
  loaderAsset,
  editAsset,
  deleteBlankAsset,
  settingGreyAsset,
} from "../../assets";
import deptDetailCardsData from "./DepartmentCardData";
import DetailCard from "../../components/detailCard/DetailCard";
import AddDepartmentModal from "./AddDepartmentModal";
import SaveButton from "../../components/Button/Button";
import AlertComponent from "../../components/alert/Alert";
import TableComponent from "../../components/table/Table";
import checkPermission from "../../utils/checkPermissions";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Model/DeleteModal";
import {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetCompaniesListQuery,
  useUpdateDepartmentAdvancedMutation,
} from "../../services/api";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import PaginationComponent from "../../components/Pagination/Pagination";
import DateRangeSelector from "../../components/dateRangeSelector/DateRangeSelector";
import { toast } from "react-toastify";
import CompaniesRouter from "./CompaniesRouter";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const Department = () => {
  // const [search, setSearchQuery] = useState("");
  const search = useSelector((state) => state.search?.searchedValue);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const userInfo = useSelector((state) => state.auth?.userDetail?.user);
  const theme = useSelector((state) => state.ui.theme);
  const [company_id, setCompanyId] = useState("");
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [range, setRange] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showDeleteDepartmentModal, setShowDeleteDepartmentModal] =
    useState(false);
  const [deletedData, setDeletedData] = useState({});
  const [deptIds, setDeptIds] = useState([]);
  const [deptDelete, setDeptDelete] = useState();
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
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
        (keywordTranslation && keywordTranslation["department"]) ||
        langKey.department,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["numOfUsersInDepartment"]) ||
        langKey.numOfUsersInDepartment,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
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

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowInputValue(!showInputValue);
  };


  const addAddDepartmentHandler = () => {
    setShowAddDepartmentModal((prev) => !prev);
  };

  const updateDepartmentHandler = (data) => {
    setSelectedDepartment(data);
    setShowEditDepartmentModal((prev) => !prev);
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id: company_id } });

  const {
    data: departmentLists,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDepartmentsQuery({
    pageUrl,
    params: {
      range,
      search,
      company_id,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const [
    createDepartment,
    {
      isLoading: createDepartmentLoading,
      isError: createDepartmentIsError,
      isSuccess: createDepartmentSuccess,
      reset: createDepartmentReset,
      error: createDepartmentError,
    },
  ] = useCreateDepartmentMutation();

  const [
    updateDepartment,
    {
      isLoading: updateDepartmentLoading,
      isError: updateDepartmentIsError,
      isSuccess: updateDepartmentSuccess,
      reset: updateDepartmentReset,
      error: updateDepartmentError,
    },
  ] = useUpdateDepartmentMutation();

  const [
    updateDepartmentAdvanced,
    {
      isLoading: updateDepartmentAdvancedLoading,
      isError: updateDepartmentAdvancedIsError,
      isSuccess: updateDepartmentAdvancedSuccess,
      reset: updateDepartmentAdvancedReset,
      error: updateDepartmentAdvancedError,
    },
  ] = useUpdateDepartmentAdvancedMutation();

  const [
    deleteDepartment,
    {
      isLoading: deleteDepartmentLoading,
      isError: deleteDepartmentIsError,
      isSuccess: deleteDepartmentSuccess,
      reset: deleteDepartmentReset,
      error: deleteDepartmentError,
    },
  ] = useDeleteDepartmentMutation();

  const createDepartmentFunc = (data) => {
    createDepartment({ data })
      .unwrap()
      .then((payload) => {
        // const msg = `${"client" + keywordTranslation && keywordTranslation["createdSuccessfully"] || successMsg.createdSuccessfully}`;

        // toast.success(msg);


        // toast.success(keywordTranslation && keywordTranslation["departCreatedSuccess"] || successMsg.departCreatedSuccess);
        let msg =
          (payload?.message == "created" &&
            keywordTranslation &&
            keywordTranslation["departCreatedSuccess"]) ||
          successMsg.departCreatedSuccess;
        toast.success(msg);
        if (payload.status) {
          setShowAddDepartmentModal(false);
        }
      })
      .catch((error) => { });
  };

  // action performed on updation
  const updateDepartmentFunc = (data) => {
    updateDepartment(data)
      .unwrap()
      .then((payload) => {
        // toast.success(keywordTranslation && keywordTranslation["departUpdateSuccess"] || successMsg.departUpdateSuccess);
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["departUpdateSuccess"]) ||
          successMsg.departUpdateSuccess;
        toast.success(msg);
        if (payload.status) {
          setShowEditDepartmentModal(false);
        }
      })
      .catch((error) => { });
  };

  const deleteDepartmentFunc = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (deptDelete) {
      data.ids = [deptDelete.id];
    } else {
      data.ids = [...deptIds];
    }
    if (data.ids.length) {
      deleteDepartment(data).then((payload) => {
        // toast.success(keywordTranslation && keywordTranslation["departDeleteSuccess"] || successMsg.departDeleteSuccess);
        let msg =
          (payload?.data?.message == "deleted" &&
            keywordTranslation &&
            keywordTranslation["departDeleteSuccess"]) ||
          successMsg.departDeleteSuccess;
        toast.success(msg);
        deptIds.length && setDeptIds([]);
        deleteDepartmentHandler(null);
      });
    }
  };

  const deleteDepartmentHandler = (dept) => {
    setDeptDelete(dept);
    setShowDeleteDepartmentModal((prev) => !prev);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = departmentData?.map((data) => data.id);
      setDeptIds([...ids]);
    } else {
      setDeptIds([]);
    }
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = deptIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setDeptIds([...stateIds]);
  };

  const isIdAdded = (id) => {
    return deptIds.includes(JSON.parse(id));
  };

  const dateRangeHandler = useCallback((value) => {
    setRange(value);
  }, []);

  const departmentData = departmentLists?.data?.department?.data;
  const pagination = departmentLists?.data?.department?.links;
  const paginationCount = departmentLists?.data?.department;
  const department_create = checkPermission("department_create");
  const department_delete = checkPermission("department_delete");
  const department_update = checkPermission("department_update");

  let cardData = [
    departmentLists?.data?.total_department,
    departmentLists?.data?.active_department,
    departmentLists?.data?.empty_department,
  ];

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
      formData.append("name[0]", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["departmentRequired"]) ||
        validationsKey.departmentRequired
      );
    }

    formData.append("id", data?.id);

    formData.append("company_id", data?.company_id);

    updateDepartmentAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        // toast.success(keywordTranslation && keywordTranslation["departUpdateSuccess"] || successMsg.departUpdateSuccess);
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["departUpdateSuccess"]) ||
          successMsg.departUpdateSuccess;
        toast.success(msg);
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };


  const company_Id = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  useEffect(() => {
    setCompanyId(company_Id);
  }, []);

  return (
    <>
      {/* <CompaniesRouter /> */}

      <div className="sideMargin">
        {/* {deleteDepartmentIsError && (
          <AlertComponent
            error={true}
            message={deleteDepartmentError.data.message}
            closeHandler={deleteDepartmentReset}
          />
        )} */}

        {/* <div className="row">
          {deptDetailCardsData.map((data, index) => (
            <DetailCard
              key={index}
              {...data}
              columns="col-lg-4 col-md-6 mx-auto mt-4"
              title={cardData[index]}
            />
          ))}
        </div> */}

        <div className="row mt-4">
          <div className="col-12">
            <p className="tableheading">
              {(keywordTranslation && keywordTranslation["manageDepartment"]) ||
                langKey.manageDepartment}
            </p>
          </div>
          {/* <div className="col-lg-3 col-md-3">
            <SearchBar
              placeholder={
                (keywordTranslation &&
                  keywordTranslation["searchByDepartment"]) ||
                langKey.searchByDepartment
              }
              value={search}
              onChange={(e) => {
                // setSearchQuery(e.target.value);
                setPageUrl("");
              }}
              searchClass="languageSearchBar"
            />
          </div> */}

          {/* <div className="col-xl-2 col-lg-3 col-md-3">
            <DateRangeSelector onCallback={dateRangeHandler} />
          </div> */}

          <div className="col-xl-2 col-lg-3 col-md-3">
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
            {deptIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2 pointer"
                onClick={() => deleteDepartmentHandler(null)}
              />
            ) : null}
          </div>

          {showAddDepartmentModal && (
            <AddDepartmentModal
              handleCloseAddDepartmentModal={addAddDepartmentHandler}
              action={createDepartmentFunc}
              loading={createDepartmentLoading}
              data={userInfo}
            >
              {createDepartmentIsError && (
                <AlertComponent
                  error={true}
                  message={createDepartmentError.data.message}
                  closeHandler={createDepartmentReset}
                />
              )}
            </AddDepartmentModal>
          )}

          {showDeleteDepartmentModal && (
            <DeleteModal
              deleteMessage={
                (keywordTranslation &&
                  keywordTranslation["delDepartmentMsg"]) ||
                langKey.delDepartmentMsg
              }
              targetName={
                deptDelete?.name ||
                (keywordTranslation && keywordTranslation["selected"]) ||
                langKey.selected
              }
              action={deleteDepartmentFunc}
              handleCloseDeleteModal={() => deleteDepartmentHandler(null)}
              loading={deleteDepartmentLoading}
            />
          )}

          <div className="col-xl-8 col-lg-8 col-md-8">
            {department_create && (
              <SaveButton
                label={
                  (keywordTranslation && keywordTranslation["addnewDepartment"]) ||
                  langKey.addnewDepartment
                }
                buttonStyle="create_btn float-right"
                onClick={addAddDepartmentHandler}
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
                              departmentData?.length &&
                              departmentData.length === deptIds.length
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
            {departmentData?.length ? (
              departmentData.map((item, index) => {
                const date = moment(item.created_at).format("MMM DD, hh:mm");
                const deptAdded = isIdAdded(item.id);
                return (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td>
                        <input
                          type="checkbox"
                          id={index}
                          value={item.id}
                          onChange={checkBoxHandler}
                          checked={deptAdded}
                        />
                      </td>
                    )}

                    {tableTitle[1].status && (
                      <td>{index + departmentLists?.data?.department.from}</td>
                    )}

                    {tableTitle[2].status && (
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
                              placeholder="Department"
                              onChange={(e) => setHideField(e.target.value)}
                              onBlur={(e) => onBlurHandlerEdit(e, item)}
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                keyPressEditHandler(e, item)
                              }
                            />
                          ) : (
                            <p className="mb-0">{item?.name}</p>
                          )}

                          {updateDepartmentAdvancedLoading &&
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
                            onClick={() => editFieldHandler(item, index)}
                          />
                        </div>
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>{item?.user_in_department_count || 0}</td>
                    )}
                    {tableTitle[4].status && <td>{date}</td>}
                    <td>
                      {!deptAdded && (
                        <>
                          <div className="last-td">
                            {department_delete && (
                              <img
                                src={deleteBlankAsset}
                                alt=""
                                width="13px"
                                height="13px"
                                className="pointer"
                                onClick={() => {
                                  deleteDepartmentHandler(item);
                                }}
                              />
                            )}
                            {department_update && (
                              <img
                                src={editAsset}
                                alt=""
                                width="13px"
                                height="13px"
                                className="pointer"
                                onClick={() => updateDepartmentHandler(item)}
                              />
                            )}
                            {showEditDepartmentModal && (
                              <AddDepartmentModal
                                data={selectedDepartment}
                                action={updateDepartmentFunc}
                                handleCloseAddDepartmentModal={
                                  updateDepartmentHandler
                                }
                                loading={updateDepartmentLoading}
                                update={true}
                              >
                                {updateDepartmentIsError && (
                                  <AlertComponent
                                    error={true}
                                    message={updateDepartmentError.data.message}
                                    closeHandler={updateDepartmentReset}
                                  />
                                )}
                              </AddDepartmentModal>
                            )}
                          </div>
                        </>
                      )}
                      {/* {!deptAdded &&
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

                            {department_update && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={updateDepartmentHandler}
                              >
                                <img
                                  src={editIconAsset}
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                &nbsp;&nbsp;
                                {(keywordTranslation && keywordTranslation["edit"]) || langKey.edit}
                              </Dropdown.Item>
                            )}

                            {department_delete && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  deleteDepartmentHandler(item);
                                }}
                              >
                                <img
                                  src={delIconAsset}
                                  alt=""
                                  width="10px"
                                  height="9.99px"
                                />
                                &nbsp;&nbsp;
                                {(keywordTranslation && keywordTranslation["delete"]) || langKey.delete}
                              </Dropdown.Item>
                            )}


                            {showEditDepartmentModal && (
                              <AddDepartmentModal
                                data={item}
                                action={updateDepartmentFunc}
                                handleCloseAddDepartmentModal={
                                  updateDepartmentHandler
                                }
                                loading={updateDepartmentLoading}
                                update={true}
                              >
                                {updateDepartmentIsError && (
                                  <AlertComponent
                                    error={true}
                                    message={updateDepartmentError.data.message}
                                    closeHandler={updateDepartmentReset}
                                  />
                                )}
                              </AddDepartmentModal>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      } */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                {isLoading ? (
                  <Loader colSpan="6" />
                ) : (
                  <NoRecordFound colSpan="6" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {pagination?.length && !search && (
        <PaginationComponent
          pagination={showAllRecord == false ? pagination : null}
          clickHandler={paginationClickHandler}
          from={paginationCount?.from}
          to={paginationCount?.to}
          total={paginationCount?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}

    </>
  );
};

export default Department;
