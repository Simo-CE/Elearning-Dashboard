import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import SaveButton from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableComponent from "../../components/table/Table";
import "./CompetenceSetting.css";
import "../../components/Subnav.css";
import { Dropdown } from "react-bootstrap";
import DeleteModal from "../../components/Model/DeleteModal";
import AlertComponent from "../../components/alert/Alert";
import PaginationComponent from "../../components/Pagination/Pagination";
import {
  binAsset,
  settingAsset,
  sortAsset,
  editIconAsset,
  delIconAsset,
  actionAsset,
  notFoundAsset,
  editRedIconAsset,
  loaderAsset,
  settingGreyAsset,
  deleteBlankAsset,
  editAsset,
} from "../../assets";
import TopicsModal from "./TopicsModal";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import {
  useAddTopicsMutation,
  useGetTopicsQuery,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useCategoryCompetenceDropdownQuery,
  useGetCompaniesListQuery,
  useUpdateTopicAdvancedMutation,
} from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  COMPETENCE_SETTING_TOPICS_CREATE,
  COMPETENCE_SETTING_TOPICS_UPDATE,
  COMPETENCE_SETTING_TOPICS_DELETE,
  COMPETENCE_SETTING_TOPICS_VIEW,
} from "../../utils/constants";
import checkPermission from "../../utils/checkPermissions";
import ModalImage from "react-modal-image";
import CompetenceSettingRouter from "./CompetenceSettingRouter";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";

const Topics = () => {
  const cs_topic_add_permission = checkPermission(
    COMPETENCE_SETTING_TOPICS_CREATE
  );
  const cs_topic_edit_permission = checkPermission(
    COMPETENCE_SETTING_TOPICS_UPDATE
  );
  const cs_topic_delete_permission = checkPermission(
    COMPETENCE_SETTING_TOPICS_DELETE
  );
  const cs_topic_view_permission = checkPermission(
    COMPETENCE_SETTING_TOPICS_VIEW
  );

  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );


  const [showAddTopicsModal, setShowAddTopicsModal] = useState(false);
  const [showDeleteTopicsModal, setShowDeleteTopicsModal] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [search, setSearchQuery] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [data, setData] = useState(null);
  const [company_id, setCompany_id] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showInputValue, setShowInputValue] = useState();
  const [hideField, setHideField] = useState();
  const [showCatDropdown, setShowCatDropdown] = useState();
  const [showAllRecord, setShowAllRecord] = useState("");
  const role = useSelector((state) => state.auth.userDetail.user.role[0]);
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
      name: (keywordTranslation && keywordTranslation["dateCreation"]) || langKey.dateCreation,
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

  const {
    data: topicsList,
    isLoading: topicsListLoading,
    isFetching: topicsListFetching,
    isError: topicsListError,
    refetch,
  } = useGetTopicsQuery({
    pageUrl,
    params: {
      search,
      category_id,
      company_id,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const {
    data: companyList,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "",company_id: company_id } });

  const { data: categoryDropdown } = useCategoryCompetenceDropdownQuery({
    params: { company_id },
  });

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
      let ids = topicsList?.data?.map((data) => data.id);
      setCategoryIds([...ids]);
    } else {
      setCategoryIds([]);
    }
  };

  useEffect(() => {
    setCompany_id(companyId);
  }, []);

  const isIdAdded = (id) => {
    return categoryIds.includes(JSON.parse(id));
  };

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowInputValue(!showInputValue);
    setShowCatDropdown(!showCatDropdown);
  };

  const addAddTopicsHandler = () => {
    setShowAddTopicsModal((prev) => !prev);
  };

  const editHandler = (data) => {
    setData(data);
    setShowEditModel((prev) => !prev);
    // addAddTopicsHandler()
  };

  const addDeleteTopicsHandler = (data) => {
    setData(data);
    setShowDeleteTopicsModal((prev) => !prev);
  };

  const [
    addTopics,
    {
      isSuccess: addTopicsSuccess,
      isLoading: addTopicsLoading,
      isFetching: addTopicsFetching,
      error: addTopicsError,
      reset: addTopicsReset,
    },
  ] = useAddTopicsMutation();

  const [
    updateTopic,
    {
      isSuccess: updateTopicSuccess,
      isLoading: updateTopicLoading,
      isFetching: updateTopicFetching,
      error: updateTopicError,
      reset: updateTopicReset,
    },
  ] = useUpdateTopicMutation();

  const [
    updateTopicAdvanced,
    {
      isSuccess: updateTopicAdvancedSuccess,
      isLoading: updateTopicAdvancedLoading,
      isFetching: updateTopicAdvancedFetching,
      error: updateTopicAdvancedError,
      reset: updateTopicAdvancedReset,
    },
  ] = useUpdateTopicAdvancedMutation();

  const [
    deleteTopic,
    {
      isSuccess: deleteTopicSuccess,
      isLoading: deleteTopicLoading,
      isFetching: deleteTopicFetching,
      error: deleteTopicError,
      reset: deleteTopicReset,
    },
  ] = useDeleteTopicMutation();

  const addTopicsHandler = (data) => {
    // Add new Topic enPoint handlear
    addTopics(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["topicCreatedSuccess"]) ||
          successMsg.topicCreatedSuccess,
          { toastId: "" }
        );
        addAddTopicsHandler();
      }).catch((error) => {
        toast.error(data.error.message)
      });
  };

  const deleteCategoryHandler = () => {
    let dataToDelete = {
      _method: "delete",
      ids: [],
    };
    if (data) {
      dataToDelete.ids = [data.id];
      deleteTopic(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["topicDeleteSuccess"]) ||
            successMsg.topicDeleteSuccess,
            { toastId: "" }
          );
          addDeleteTopicsHandler(null);
        });
    } else {
      dataToDelete.ids = [...categoryIds];
      deleteTopic(dataToDelete)
        .unwrap()
        .then((payload) => {
          toast.success(
            (keywordTranslation && keywordTranslation["topicDeleteSuccess"]) ||
            successMsg.topicDeleteSuccess,
            { toastId: "" }
          );
          setCategoryIds([]);
          addDeleteTopicsHandler(null);
        });
    }
  };

  const updateApiHandler = (data) => {
    updateTopic(data)
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["topicUpdateSuccess"]) ||
          successMsg.topicUpdateSuccess,
          { toastId: "" }
        );
        editHandler(null);
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
    setShowCatDropdown(!showCatDropdown);
  };

  const editCatHandler = (index) => {
    setShowCatDropdown(index);
    setShowInputValue(!showInputValue);
  };

  const editApiHandlerText = (name, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (name) {
      formData.append("name[0]", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["topicRequired"]) ||
        validationsKey.topicRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);

    formData.append("company_id", data?.company_id);

    formData.append("category_id", data?.category_id);

    updateTopicAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        toast.success(
          (keywordTranslation && keywordTranslation["topicUpdateSuccess"]) ||
          successMsg.topicUpdateSuccess,
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
      formData.append("category_id", data?.category_id);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["nameRequired"]) ||
        validationsKey.nameRequired,
        { toastId: "" }
      );
    }

    formData.append("id", data?.id);
    formData.append("company_id", data?.company_id);

    if (value) {
      updateTopicAdvanced(formData)
        .unwrap()
        .then((payload) => {
          setShowCatDropdown(!showCatDropdown);
          toast.success(
            (keywordTranslation && keywordTranslation["topicUpdateSuccess"]) ||
            successMsg.topicUpdateSuccess
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
        <div className="row mt-5 align-items-center">
          <div className="col-lg-3 col-md-12 mx-auto">
            <p className="tableheading mb-0">
              {(keywordTranslation && keywordTranslation["manageTopics"]) ||
                langKey.manageTopics}
            </p>
          </div>
          <div className="col-lg-9 col-md-12">

            <div className="d-flex align-items-center justify-content-end gap-2 w-100">
              {categoryIds.length ? (
                <img
                  src={binAsset}
                  alt=""
                  className="pointer"
                  onClick={() => addDeleteTopicsHandler(null)}
                />
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
                    changeHandler={(value) => setCompany_id(value)}
                  />
                </div>
              )} */}
              <p className="fs-14 fw-500 grey">Filter by</p>
              <div className="h-29px userSelectableDropdown">
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["selectCategory"]) ||
                    langKey.selectCategory
                  }
                  options={categoryDropdown}
                  changeHandler={(value) => setCategory_id(value)}
                />
              </div>

              {cs_topic_add_permission && (
                <SaveButton
                  label={
                    (keywordTranslation && keywordTranslation["addNewTopic"]) ||
                    langKey.addNewTopic
                  }
                  buttonStyle="create_btn float-right"
                  onClick={addAddTopicsHandler}
                />
              )}
            </div>

          </div>
        </div>

        <div className="row">
          {/* <div className="col-4">
            <SearchBar
              value={search}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPageUrl("");
              }}
              placeholder={
                (keywordTranslation && keywordTranslation["searchByTopic"]) ||
                langKey.searchByTopic
              }
              searchClass="languageSearchBar"
            />
          </div> */}

          {/* New Topic Add */}
          {showAddTopicsModal && (
            <TopicsModal
              loading={addTopicsLoading}
              action={addTopicsHandler}
              handleCloseAddTopicsModal={addAddTopicsHandler}
            >
              {addTopicsError && (
                <AlertComponent
                  error={true}
                  message={addTopicsError.data.message}
                  closeHandler={addTopicsReset}
                />
              )}
            </TopicsModal>
          )}
          {/* Update previous topic */}
          {cs_topic_edit_permission && showEditModel && data && (
            <TopicsModal
              data={data}
              loading={updateTopicLoading}
              action={updateApiHandler}
              handleCloseAddTopicsModal={editHandler}
            >
              {updateTopicError && (
                <AlertComponent
                  error={true}
                  message={updateTopicError.data.message}
                  closeHandler={updateTopicReset}
                />
              )}
            </TopicsModal>
          )}

          {cs_topic_delete_permission && showDeleteTopicsModal && (
            <DeleteModal
              deleteMessage={
                (keywordTranslation && keywordTranslation["topicDelMsg"]) ||
                langKey.topicDelMsg
              }
              targetName={
                data?.name ||
                (keywordTranslation && keywordTranslation["selected"]) ||
                langKey.selected
              }
              handleCloseDeleteModal={() => addDeleteTopicsHandler(null)}
              action={deleteCategoryHandler}
              loading={deleteTopicLoading}
            />
          )}
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
                              topicsList?.data?.length &&
                              topicsList.data.length === categoryIds.length
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
                          <Dropdown.Toggle variant="" id="setting-dropdown" className="dropdownArrowRemove">
                            {icon && (
                              <img src={settingGreyAsset} className={elementStyle} />
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
            {topicsList?.data?.length ? (
              topicsList?.data.map((data, index) => {
                const categoryAdded = isIdAdded(data.id);
                return (
                  <tr key={data.id}>
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

                    {tableTitle[1].status && <td>{index + topicsList.from}</td>}



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
                                  placeholder="Select Category"
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

                          {updateTopicAdvancedLoading &&
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
                            small={data.image || notFoundAsset}
                            large={data.image || notFoundAsset}
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

                          {updateTopicAdvancedLoading &&
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
                    {tableTitle[4].status && (
                      <td>{moment(data.created_at).format("MMM DD, hh:mm")}</td>
                    )}
                    <td>
                      <div className="last-td">
                        <img
                          src={deleteBlankAsset}
                          alt=""
                          width="13.26px"
                          height="13.26px"
                          onClick={() => addDeleteTopicsHandler(data)}
                          className="pointer"
                        />
                        <img
                          src={editAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          onClick={() => editHandler(data)}
                          className="pointer"
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
                              {(keywordTranslation &&
                                keywordTranslation["action"]) ||
                                langKey.action}
                            </p>

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => editHandler(data)}
                            >
                              {" "}
                              <img
                                src={editIconAsset}
                                alt=""
                                width="12px"
                                height="12px"
                              />{" "}
                              &nbsp;&nbsp;
                              {(keywordTranslation &&
                                keywordTranslation["edit"]) ||
                                langKey.edit}
                            </Dropdown.Item>

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => addDeleteTopicsHandler(data)}
                            >
                              {" "}
                              <img
                                src={delIconAsset}
                                alt=""
                                width="10px"
                                height="9.99px"
                              />{" "}
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
                {topicsListLoading ? (
                  <Loader colSpan="6" />
                ) : (
                  <NoRecordFound colSpan="6" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {topicsList?.links?.length && !search && (
        <PaginationComponent
          pagination={showAllRecord == false ? topicsList.links : null}
          clickHandler={paginationClickHandler}
          from={topicsList?.from}
          to={topicsList?.to}
          total={topicsList?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default Topics;
