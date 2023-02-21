import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  binAsset,
  settingAsset,
  sortAsset,
  actionAsset,
  delIconAsset,
  editIconAsset,
  notFoundAsset,
  editRedIconAsset,
  loaderAsset,
  editAsset,
  deleteBlankAsset,
  settingGreyAsset,
} from "../../assets";
import SaveButton from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableComponent from "../../components/table/Table";
import AlertComponent from "../../components/alert/Alert";
import CategoryModal from "./CategoryModal";
import { Dropdown } from "react-bootstrap";
import DeleteModal from "../../components/Model/DeleteModal";
import PaginationComponent from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import {
  useAddCategoryCompetenceMutation,
  useGetCategoryCompetenceQuery,
  useUpdateCategoryCompetenceMutation,
  useDeleteCategoryCompetenceMutation,
  useGetCompaniesListQuery,
  useUpdateCategoryCompetenceAdvancedMutation,
} from "../../services/api";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import {
  COMPETENCE_SETTING_CATEGORY_CREATE,
  COMPETENCE_SETTING_CATEGORY_UPDATE,
  COMPETENCE_SETTING_CATEGORY_DELETE,
  COMPETENCE_SETTING_CATEGORY_VIEW,
} from "../../utils/constants";
import checkPermission from "../../utils/checkPermissions";
import SearchableDropdown from "./../../components/searchDropdown/SearchableDropdown";
// import CompetenceSettingTabs from "./CompetenceSettingTabs";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";
import "./CompetenceSetting.css";

const Categories = () => {
  const cs_category_add_permission = checkPermission(
    COMPETENCE_SETTING_CATEGORY_CREATE
  );
  const cs_category_edit_permission = checkPermission(
    COMPETENCE_SETTING_CATEGORY_UPDATE
  );
  const cs_category_delete_permission = checkPermission(
    COMPETENCE_SETTING_CATEGORY_DELETE
  );
  const cs_category_view_permission = checkPermission(
    COMPETENCE_SETTING_CATEGORY_VIEW
  );

  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const [search, setSearchQuery] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [company_id, setCompany_id] = useState();
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
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
        (keywordTranslation && keywordTranslation["category"]) ||
        langKey.category,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      elementStyle: "ml-1",
      icon: "",
    },
    // {
    //   id: 5,
    //   status: true,
    //   name: (keywordTranslation && keywordTranslation["action"]) || langKey.action,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },

    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const role = useSelector((state) => state.auth.userDetail.user.role[0]);

  const {
    data: companyList,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id: company_id } });


  const {
    data: CategoryCompetenceList,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch,
  } = useGetCategoryCompetenceQuery({
    pageUrl,
    params: {
      search,
      company_id,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  }); //Add company search

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setCompany_id(companyId);
  }, []);

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

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = CategoryCompetenceList?.data?.map((data) => data.id);
      setCategoryIds([...ids]);
    } else {
      setCategoryIds([]);
    }
  };

  const isIdAdded = (id) => {
    return categoryIds.includes(JSON.parse(id));
  };

  const [
    updateCategoryCompetence,
    {
      isSuccess: updateCategoryCompetenceSuccess,
      isLoading: updateCategoryCompetenceLoading,
      isFetching: updateCategoryCompetenceFetching,
      error: updateCategoryCompetenceError,
      reset: updateCategoryCompetenceReset,
    },
  ] = useUpdateCategoryCompetenceMutation();

  const [
    updateCategoryCompetenceAdvanced,
    {
      isSuccess: updateCategoryCompetenceAdvancedSuccess,
      isLoading: updateCategoryCompetenceAdvancedLoading,
      isFetching: updateCategoryCompetenceAdvancedFetching,
      error: updateCategoryCompetenceAdvancedError,
      reset: updateCategoryCompetenceAdvancedReset,
    },
  ] = useUpdateCategoryCompetenceAdvancedMutation();

  const [
    addCategoryCompetence,
    {
      isSuccess: addCategoryCompetenceSuccess,
      isLoading: addCategoryCompetenceLoading,
      isFetching: addCategoryCompetenceFetching,
      error: addCategoryCompetenceError,
      reset: addCategoryCompetenceReset,
    },
  ] = useAddCategoryCompetenceMutation();

  const [
    deleteCategoryCompetence,
    {
      isSuccess: deleteCategoryCompetenceSuccess,
      isLoading: deleteCategoryCompetenceLoading,
      isFetching: deleteCategoryCompetenceFetching,
      error: deleteCategoryCompetenceError,
      reset: deleteCategoryCompetenceReset,
    },
  ] = useDeleteCategoryCompetenceMutation();

  // Add new Category
  const addCategoryCompetenceHandler = (data) => {
    addCategoryCompetence(data)
      .unwrap()
      .then((payload) => {
        setShowAddCategoryModal((prev) => !prev);
        toast.success(
          (keywordTranslation &&
            keywordTranslation["categoryCreatedSuccess"]) ||
            successMsg.categoryCreatedSuccess
        );
      });
  };

  const editCategoryHandler = (data) => {
    // update data compantiency
    updateCategoryCompetence(data)
      .unwrap()
      .then((payload) => {
        editCategoryModelHandler(null);
        toast.success(
          (keywordTranslation && keywordTranslation["categoryUpdateSuccess"]) ||
            successMsg.categoryUpdateSuccess
        );
      });
  };

  const addAddCategoryHandler = () => {
    setShowAddCategoryModal((prev) => !prev);
  };

  // handel when click on edit button
  const editCategoryModelHandler = (category) => {
    // data is coming on edit feild
    setSelectedCategory(category);
    addAddCategoryHandler();
  };

  const deleteCategoryHandler = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (categoryToDelete) {
      data.ids = [categoryToDelete.id];
    } else {
      data.ids = [...categoryIds];
    }
    if (data.ids.length) {
      deleteCategoryCompetence(data).then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["categoryDeleteSuccess"]) ||
            successMsg.categoryDeleteSuccess
        );
        categoryIds.length && setCategoryIds([]);
        addDeleteCategoryHandler(null);
      });
    }
  };

  const addDeleteCategoryHandler = (category) => {
    setCategoryToDelete(category);
    setShowDeleteCategoryModal((prev) => !prev);
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
      formData.append("name[0]", name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["categoryRequired"]) ||
          validationsKey.categoryRequired
      );
    }

    formData.append("id[0]", data?.id);

    formData.append("company_id", data?.company_id);

    updateCategoryCompetenceAdvanced(formData)
      .unwrap()
      .then((payload) => {
        setShowInputValue(!showInputValue);
        toast.success(
          (keywordTranslation && keywordTranslation["categoryUpdateSuccess"]) ||
            successMsg.categoryUpdateSuccess
        );
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <div className="sideMargin">
        {deleteCategoryCompetenceError && (
          <AlertComponent
            message={deleteCategoryCompetenceError.data.message}
            closeHandler={deleteCategoryCompetenceReset}
          />
        )}

        <div className="row mt-5 align-items-center">
          <div className="col-lg-5 col-md-6 mx-auto">
            <p className="tableheading">
              {(keywordTranslation && keywordTranslation["manageCategories"]) ||
                langKey.manageCategories}
            </p>
          </div>

          <div className="col-lg-7 col-md-6 mt-md-3 mt-lg-0">
            <div className="d-flex align-items-center gap-2 justify-content-end">
              <div>
                {categoryIds.length ? (
                  <img
                    src={binAsset}
                    alt=""
                    className="pointer"
                    onClick={() => addDeleteCategoryHandler(null)}
                  />
                ) : null}
              </div>
              {cs_category_add_permission && (
                <SaveButton
                  label={
                    (keywordTranslation &&
                      keywordTranslation["addNewCategory"]) ||
                    langKey.addNewCategory
                  }
                  buttonStyle="create_btn float-right"
                  onClick={addAddCategoryHandler}
                />
              )}
            </div>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-lg-4 col-md-5">
            <SearchBar
              value={search}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPageUrl("");
              }}
              placeholder={
                (keywordTranslation &&
                  keywordTranslation["searchByCategory"]) ||
                langKey.searchByCategory
              }
              searchClass="languageSearchBar"
            />
          </div>

          {/* Add new input */}
          {showAddCategoryModal && (
            <CategoryModal
              loading={addCategoryCompetenceLoading}
              action={addCategoryCompetenceHandler}
              handleCloseAddCategoryModal={addAddCategoryHandler}
            >
              {addCategoryCompetenceError && (
                <AlertComponent
                  error={true}
                  message={addCategoryCompetenceError.data.message}
                  closeHandler={addCategoryCompetenceReset}
                />
              )}
            </CategoryModal>
          )}
          {/* update model */}
          {selectedCategory && showAddCategoryModal && (
            <CategoryModal
              data={selectedCategory}
              loading={updateCategoryCompetenceLoading}
              action={editCategoryHandler}
              handleCloseAddCategoryModal={editCategoryModelHandler}
            >
              {updateCategoryCompetenceError && (
                <AlertComponent
                  error={true}
                  message={updateCategoryCompetenceError.data.message}
                  closeHandler={updateCategoryCompetenceReset}
                />
              )}
            </CategoryModal>
          )}

          {showDeleteCategoryModal && (
            <DeleteModal
              deleteMessage={
                (keywordTranslation && keywordTranslation["catDelMsg"]) ||
                langKey.catDelMsg
              }
              targetName={
                categoryToDelete?.name ||
                (keywordTranslation && keywordTranslation["selected"]) ||
                langKey.selected
              }
              handleCloseDeleteModal={() => addDeleteCategoryHandler(null)}
              action={deleteCategoryHandler}
              loading={deleteCategoryCompetenceLoading}
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
                              CategoryCompetenceList?.data?.length &&
                              CategoryCompetenceList.data.length ===
                                categoryIds.length
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
            {cs_category_view_permission &&
            CategoryCompetenceList?.data?.length ? (
              CategoryCompetenceList?.data.map((data, index) => {
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

                    {tableTitle[1].status && (
                      <td>{index + CategoryCompetenceList.from}</td>
                    )}
                    {tableTitle[2].status && (
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

                          {updateCategoryCompetenceAdvancedLoading &&
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
                      <td>{moment(data.created_at).format("MMM DD, hh:mm")}</td>
                    )}
                    <td>
                      <div className="last-td">
                        {cs_category_delete_permission && (
                          <img
                            src={deleteBlankAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="pointer"
                            onClick={() => addDeleteCategoryHandler(data)}
                          />
                        )}
                        {cs_category_edit_permission && (
                          <img
                            src={editAsset}
                            alt=""
                            width="13.26px"
                            height="13.26px"
                            className="pointer"
                            onClick={() => editCategoryModelHandler(data)}
                          />
                        )}
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

                            {cs_category_edit_permission && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => editCategoryModelHandler(data)}
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
                            )}

                            {cs_category_delete_permission && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => addDeleteCategoryHandler(data)}
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
                {CategoryCompetenceLoading ? (
                  <Loader colSpan="5" />
                ) : (
                  <NoRecordFound
                    colSpan="5"
                    msg={
                      cs_category_view_permission
                        ? "No record found"
                        : "No permission to view"
                    }
                  />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {CategoryCompetenceList?.links?.length && !search && (
        <PaginationComponent
          pagination={
            showAllRecord == false ? CategoryCompetenceList.links : null
          }
          clickHandler={paginationClickHandler}
          from={CategoryCompetenceList?.from}
          to={CategoryCompetenceList?.to}
          total={CategoryCompetenceList?.total}
          changeHandler={(value, url) => {
            setShowAllRecord(value);
            setPageUrl(url, "");
          }}
        />
      )}
    </>
  );
};

export default Categories;
