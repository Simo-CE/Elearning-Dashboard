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
  settingGreyAsset,
  deleteBlankAsset,
  editAsset,
} from "../../assets";
import funcDetailCardsData from "./FunctionCardData";
import "../../components/ResponsiveText.css";
import AddFunctionModal from "./AddFunctionModal";
import DetailCard from "../../components/detailCard/DetailCard";
import SaveButton from "../../components/Button/Button";
import AlertComponent from "../../components/alert/Alert";
import TableComponent from "../../components/table/Table";
import checkPermission from "../../utils/checkPermissions";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Model/DeleteModal";
import {
  useGetFunctionsQuery,
  useCreateFunctionMutation,
  useUpdateFunctionMutation,
  useDeleteFunctionMutation,
  useGetCompaniesListQuery,
  useUpdateFunctionAdvancedMutation,
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

const Function = () => {
  const [company_id, setCompanyId] = useState("");
  // const [search, setSearchQuery] = useState("");
  const [showAddFunctionModal, setShowAddFunctionModal] = useState(false);
  const [showDeleteFunctionModal, setShowDeleteFunctionModal] = useState(false);
  const [showEditFunctionModal, setShowEditFunctionModal] = useState(false);
  const [deletedData, setDeletedData] = useState({});
  const [pageUrl, setPageUrl] = useState("");
  const [range, setRange] = useState("");
  const [funcIds, setFuncIds] = useState([]);
  const [funcDelete, setFuncDelete] = useState();
  const [showInputValue, setShowInputValue] = useState();
  const [selectedFunction, setSelectedFunction] = useState("");

  const [hideField, setHideField] = useState();
  const search = useSelector((state) => state.search?.searchedValue);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showAllRecord, setShowAllRecord] = useState("");
  const theme = useSelector((state) => state.ui.theme);
  const userInfo = useSelector((state) => state.auth?.userDetail?.user);
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
        (keywordTranslation && keywordTranslation["function"]) ||
        langKey.function,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["numOfUsersInFunction"]) ||
        langKey.numOfUsersInFunction,
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

  const addAddFunctionHandler = () => {
    setShowAddFunctionModal((prev) => !prev);
  };

  const updateFunctionHandler = (data) => {
    setSelectedFunction(data);
    setShowEditFunctionModal((prev) => !prev);
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  const {
    data: functionLists,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetFunctionsQuery({
    pageUrl,
    params: {
      search,
      company_id,
      range,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const [
    createFunctions,
    {
      isLoading: createFunctionLoading,
      isError: createFunctionIsError,
      isSuccess: createFunctionSuccess,
      reset: createFunctionReset,
      error: createFunctionError,
    },
  ] = useCreateFunctionMutation();

  const [
    updateFunction,
    {
      isLoading: updateFunctionLoading,
      isError: updateFunctionIsError,
      isSuccess: updateFunctionSuccess,
      reset: updateFunctionReset,
      error: updateFunctionError,
    },
  ] = useUpdateFunctionMutation();

  const [
    updateFunctionAdvanced,
    {
      isLoading: updateFunctionAdvancedLoading,
      isError: updateFunctionAdvancedIsError,
      isSuccess: updateFunctionAdvancedSuccess,
      reset: updateFunctionAdvancedReset,
      error: updateFunctionAdvancedError,
    },
  ] = useUpdateFunctionAdvancedMutation();

  const [
    deleteFunction,
    {
      isLoading: deleteFunctionLoading,
      isError: deleteFunctionIsError,
      isSuccess: deleteFunctionSuccess,
      reset: deleteFunctionReset,
      error: deleteFunctionError,
    },
  ] = useDeleteFunctionMutation();

  const createFunctionsFunc = (data) => {
    createFunctions({ data })
      .unwrap()
      .then((payload) => {
        // toast.success(keywordTranslation && keywordTranslation["functionCreatedSuccess"] || successMsg.functionCreatedSuccess);
        let msg =
          (payload?.message == "created" &&
            keywordTranslation &&
            keywordTranslation["functionCreatedSuccess"]) ||
          successMsg.functionCreatedSuccess;
        toast.success(msg);
        if (payload.status) {
          setShowAddFunctionModal(false);
        }
      })
      .catch((error) => { });
  };

  const updateFunctionFunc = (data) => {
    updateFunction(data)
      .unwrap()
      .then((payload) => {
        // toast.success(keywordTranslation && keywordTranslation["functionUpdateSuccess"] || successMsg.functionUpdateSuccess);
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["functionUpdateSuccess"]) ||
          successMsg.functionUpdateSuccess;
        toast.success(msg);
        if (payload.status) {
          setShowEditFunctionModal(false);
        }
      })
      .catch((error) => { });
  };

  const deleteFunctionFunc = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (funcDelete) {
      data.ids = [funcDelete];
    } else {
      data.ids = [...funcIds];
    }
    if (data.ids.length) {
      deleteFunction(data).then((payload) => {
        // toast.success(keywordTranslation && keywordTranslation["functionDeleteSuccess"] || successMsg.functionDeleteSuccess);
        let msg =
          (payload?.data?.message == "deleted" &&
            keywordTranslation &&
            keywordTranslation["functionDeleteSuccess"]) ||
          successMsg.functionDeleteSuccess;
        toast.success(msg);
        funcIds.length && setFuncIds([]);
        deleteFunctionHandler(null);
      });
    }
  };

  const deleteFunctionHandler = (func) => {
    setFuncDelete(func);
    setShowDeleteFunctionModal((prev) => !prev);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = functionData?.map((data) => data.id);
      setFuncIds([...ids]);
    } else {
      setFuncIds([]);
    }
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = funcIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setFuncIds([...stateIds]);
  };

  const isIdAdded = (id) => {
    return funcIds.includes(JSON.parse(id));
  };

  const functionData = functionLists?.data?.function?.data;
  const pagination = functionLists?.data?.function?.links;
  const paginationCount = functionLists?.data?.function;
  const function_create = checkPermission("function_create");
  const function_delete = checkPermission("function_delete");
  const function_update = checkPermission("function_update");

  let cardData = [
    functionLists?.data?.total_function,
    functionLists?.data?.active_function,
    functionLists?.data?.empty_function,
  ];

  const dateRangeHandler = useCallback((value) => {
    setRange(value);
  }, []);

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
        (keywordTranslation && keywordTranslation["functionRequired"]) ||
        validationsKey.functionRequired
      );
    }

    formData.append("id", data?.id);

    formData.append("company_id", data?.company_id);

    updateFunctionAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        // toast.success(keywordTranslation && keywordTranslation["functionUpdateSuccess"] || successMsg.functionUpdateSuccess);
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["functionUpdateSuccess"]) ||
          successMsg.functionUpdateSuccess;
        toast.success(msg);
      })
      .catch((error) => {
        // toast.error(error.data.message);
      });
  };

  return (
    <>
      {/* <CompaniesRouter /> */}

      <div className="sideMargin">
        {deleteFunctionIsError && (
          <AlertComponent
            error={true}
            message={deleteFunctionError.data.message}
            closeHandler={deleteFunctionReset}
          />
        )}

        {/* <div className="row">
          {funcDetailCardsData.map((data, index) => (
            <DetailCard
              key={index}
              {...data}
              columns="col-4 mt-4"
              title={cardData[index]}
            />
          ))}
        </div> */}

        <div className="row mt-4">
          <div className="col-12">
            <p className="tableheading">
              {(keywordTranslation && keywordTranslation["manageFunction"]) ||
                langKey.manageFunction}
            </p>
          </div>
          {/* <div className="col-lg-3 col-md-4">
            <SearchBar
              placeholder={
                (keywordTranslation &&
                  keywordTranslation["searchByFunction"]) ||
                langKey.searchByFunction
              }
              value={search}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPageUrl("");
              }}
              searchClass="languageSearchBar"
            />
          </div> */}

          {/* <div className="col-xl-2 col-lg-3 col-md-2">
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
            {funcIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2 pointer"
                onClick={() => deleteFunctionHandler(null)}
              />
            ) : null}
          </div>

          <div className="col-xl-8 col-lg-8 col-md-8">
            {function_create && (
              <SaveButton
                label={
                  (keywordTranslation && keywordTranslation["addnewFunction"]) ||
                  langKey.addnewFunction
                }
                buttonStyle="create_btn float-right"
                onClick={addAddFunctionHandler}
              />
            )}
            {showAddFunctionModal && (
              <AddFunctionModal
                handleCloseAddFunctionModal={addAddFunctionHandler}
                action={createFunctionsFunc}
                loading={createFunctionLoading}
                data={userInfo}
              >
                {createFunctionError && (
                  <AlertComponent
                    error={true}
                    message={createFunctionError.data.message}
                    closeHandler={createFunctionReset}
                  />
                )}
              </AddFunctionModal>
            )}
          </div>
        </div>

        {showDeleteFunctionModal && (
          <DeleteModal
            id={deletedData.id}
            action={deleteFunctionFunc}
            deleteMessage={
              (keywordTranslation && keywordTranslation["delFunctionMsg"]) ||
              langKey.delFunctionMsg
            }
            targetName={
              funcDelete?.name ||
              (keywordTranslation && keywordTranslation["selected"]) ||
              langKey.selected
            }
            handleCloseDeleteModal={() => deleteFunctionHandler(null)}
            loading={deleteFunctionLoading}
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
                              functionData?.length &&
                              functionData.length === funcIds.length
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
            {functionData?.length ? (
              functionData.map((item, index) => {
                const date = moment(item.created_at).format("MMM DD, hh:mm");
                const funcAdded = isIdAdded(item.id);
                return (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td>
                        <input
                          type="checkbox"
                          id={index}
                          value={item.id}
                          onChange={checkBoxHandler}
                          checked={funcAdded}
                        />
                      </td>
                    )}

                    {tableTitle[1].status && (
                      <td>{index + functionLists?.data?.function?.from}</td>
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

                          {updateFunctionAdvancedLoading &&
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

                    {tableTitle[3].status && <td>{item?.user_count}</td>}
                    {tableTitle[4].status && <td>{date}</td>}

                    <td>
                      <div className="last-td">
                        {function_delete && (
                          <img
                            src={deleteBlankAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="pointer"
                            onClick={() => {
                              deleteFunctionHandler(item);
                            }}
                          />
                        )}
                        {function_update && (
                          <img
                            src={editAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="pointer"
                            onClick={() => updateFunctionHandler(item)}
                          />
                        )}
                      </div>
                      {/* {!funcAdded &&
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

                            {function_update && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={updateFunctionHandler}
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

                            {function_delete && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  deleteFunctionHandler(item);
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

                            {showEditFunctionModal && (
                              <AddFunctionModal
                                data={item}
                                handleCloseAddFunctionModal={
                                  updateFunctionHandler
                                }
                                action={updateFunctionFunc}
                                loading={updateFunctionLoading}
                                update={true}
                              >
                                {updateFunctionIsError && (
                                  <AlertComponent
                                    error={true}
                                    message={updateFunctionError.data.message}
                                    closeHandler={updateFunctionReset}
                                  />
                                )}
                              </AddFunctionModal>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      } */}
                      {showEditFunctionModal && (
                        <AddFunctionModal
                          data={selectedFunction}
                          handleCloseAddFunctionModal={updateFunctionHandler}
                          action={updateFunctionFunc}
                          loading={updateFunctionLoading}
                          update={true}
                        >
                          {updateFunctionIsError && (
                            <AlertComponent
                              error={true}
                              message={updateFunctionError.data.message}
                              closeHandler={updateFunctionReset}
                            />
                          )}
                        </AddFunctionModal>
                      )}
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

export default Function;
