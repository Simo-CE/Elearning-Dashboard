import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableComponent from "../../components/table/Table";
import "../../components/ResponsiveText.css";
import "./Clients.css";
import { toast } from "react-toastify";
import successMsg from "../../localization/successMsgLocale.json";

import {
  contactpersonAsset,
  settingAsset,
  actionAsset,
  delIconAsset,
  editIconAsset,
  sortAsset,
  notFoundAsset,
  flagAsset,
  settingiconAsset,
  exportAsset,
  priceAsset,
  downloadAsset,
  binAsset,
  crossAsset,
  loaderAsset,
  bin2Asset,
  uploadAsset,
  addIconAsset,
  editRedIconAsset,
  udAsset,
  editAsset,
  deleteBlankAsset,
  settingBrownAsset,
  purpleDownloadAsset,
  settingGreyAsset,
  downloadgreenAsset,
  viewblueAsset,
} from "../../assets";
import Button from "../../components/Button/Button";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import AlertComponent from "../../components/alert/Alert";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import AddClientsModal from "./AddClientsModal";
import ClientPrefrenceModal from "../../pages/localization/ClientPrefrenceModal";
import SubNavBar from "../../components/navbar/SubNavBar";
import PaginationComponent from "../../components/Pagination/Pagination";
import DeleteTrainingModal from "../adminArea/tranings/DeleteTrainingModal";
import {
  useCreateCompanyMutation,
  useManagementCompanyListQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateStatusCompanyMutation,
  useUpdateClientPreferencesMutation,
  useUpdateAdvanceCompanyMutation,
  useWorkerBadgeSettingsMutation,
  useUpdateMasterCompanyMutation,
} from "../../services/api";
import { USER_VIEW } from "../../utils/constants";
import checkPermission from "../../utils/checkPermissions";
import Loader from "../../components/loader/Loader";
import DeleteModal from "../../components/Model/DeleteModal";
import TableSettingMenu from "../../components/TableSetting";
import ImageViewer from "../../components/ImageViewer";
import InputMasks from "../../components/inputMask/InputMask";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";
import ManageWorkerBadge from "./ManageWorkerBadgeModal";
import PhoneInput from "react-phone-input-2";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";

const Clients = () => {
  const searchquery = useSelector((state) => state.search?.searchedValue);

  const [pageUrl, setPageUrl] = useState();
  const [activeStatus, setActiveStatus] = useState();
  const [showClientsMangModal, setShowClientsMangModal] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [Ids, setCompaniesIds] = useState([]);
  const [client, setClient] = useState({});
  const [showClientPrefModal, setShowClientPrefModal] = useState(false);

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
        (keywordTranslation && keywordTranslation["client"]) || langKey.client,
      elementStyle: "",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["contactPerson"]) ||
        langKey.contactPerson,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["phone"]) || langKey.phone,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["email"]) || langKey.email,
      elementStyle: "",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["country"]) ||
        langKey.country,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 10,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon ",
    },
  ]);
  const [delClient, setDelClient] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState();
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState();
  const [hideFirstName, setHideFirstName] = useState();
  const [showFirstName, setShowFirstName] = useState();
  const [showLastName, setShowLastName] = useState();
  const [hideLastName, setHideLastName] = useState();
  const [showImageLoader, setShowImageLoader] = useState();
  const [toggleImage, setToggleImage] = useState(false);
  const [showAllRecord, setShowAllRecord] = useState("");
  const [showBadgeModal, setShowBadgeModal] = useState("");
  const [showBadgeModalData, setShowBadgeModalData] = useState("");
  const [toggleStatus, setToggleStatus] = useState("");

  const prefModelHandler = (client) => {
    setClient(client || {});
    setShowClientPrefModal((prev) => !prev);
  };
  const manageWorkerModalHandler = (data) => {
    setShowBadgeModalData(data);
    setShowBadgeModal((prev) => !prev);
  };

  const clientsModelHandler = useCallback(() => {
    setShowClientsMangModal((prev) => !prev);
  }, []);

  const [
    workerBadgeSettings,
    {
      isSuccess: workerBadgeSettingsSuccess,
      isLoading: workerBadgeSettingsLoading,
      isError: workerBadgeSettingsIsError,
      error: workerBadgeSettingsError,
      reset: workerBadgeSettingsReset,
    },
  ] = useWorkerBadgeSettingsMutation();

  const [
    updateClientPreferences,
    {
      isSuccess: clientPreferenceSuccess,
      isLoading: clientPreferenceLoading,
      isError: clientPreferenceIsError,
      error: clientPreferenceError,
      reset: clientPreferenceReset,
    },
  ] = useUpdateClientPreferencesMutation();

  const [
    updateMasterCompany,
    {
      isLoading: updateMasterCompanyLoading,
      isError: updateMasterCompanyIsError,
      isSuccess: updateMasterCompanySuccess,
      reset: updateMasterCompanyReset,
      error: updateMasterCompanyError,
    },
  ] = useUpdateMasterCompanyMutation();

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
    updateStatusCompany,
    {
      isLoading: comapnyStatusLoading,
      isError: comapnyStatusError,
      isSuccess: comapnyStatusSuccess,
      reset: comapnyStatusReset,
    },
  ] = useUpdateStatusCompanyMutation();

  const [
    deleteCompany,
    {
      isLoading: deleteCompanyLoading,
      isError: deleteCompanyError,
      isSuccess: deleteCompanySuccess,
      reset: deleteCompanyReset,
    },
  ] = useDeleteCompanyMutation();

  const {
    data: managementCompanyList,
    isLoading: managementCompanyLoading,
    isFetching: managementCompanyFetching,
    isError: managementCompanyError,
  } = useManagementCompanyListQuery({
    url: pageUrl,
    params: {
      search: searchquery,
      status: activeStatus,
      per_page: showAllRecord == true ? "1000" : "10",
    }, //search query
  });

  const companies = managementCompanyList?.data?.data;
  const pagination = managementCompanyList?.data?.links;
  const paginationCount = managementCompanyList?.data;

  const [
    createCompany,
    {
      isLoading: createCompanyLoading,
      isFetching: createCompanyFetching,
      isError: createCompanyIsError,
      isSuccess: createCompanySuccess,
      reset: createCompanyReset,
      error: createCompanyError,
    },
  ] = useCreateCompanyMutation();

  const workerBadgeSettingsHandler = (data) => {
    workerBadgeSettings(data)
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "created" &&
            keywordTranslation &&
            keywordTranslation["badgeSetting"]) ||
          successMsg.badgeSetting;
        toast.success(msg);
        manageWorkerModalHandler();
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const createCompanyHandler = useCallback((data) => {
    createCompany({ data })
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "created" &&
            keywordTranslation &&
            keywordTranslation["companyCreatedSuccess"]) ||
          successMsg.companyCreatedSuccess;
        toast.success(msg);
        clientsModelHandler();
      });
  }, []);

  const checkBoxHandler = (e, data) => {
    setToggleStatus(data?.status);
    let id = JSON.parse(e.target.value);
    let stateIds = Ids;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setCompaniesIds([...stateIds]);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = companies.map((data) => data.id);
      setCompaniesIds([...ids]);
    } else {
      setCompaniesIds([]);
    }
    let allCheckedToggle = companies?.filter((status) => {
      return status.status === 0;
    });

    setToggleStatus(allCheckedToggle?.length ? false : true);
  };

  const isIdAdded = (id) => {
    return Ids.includes(JSON.parse(id));
  };

  const delClientModalHandler = (category) => {
    setCompanyToDelete(category);
    setDelClient((prev) => !prev);
  };

  const deleteCompanyHandler = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (companyToDelete) {
      data.ids = [companyToDelete.id];
    } else {
      data.ids = [...Ids];
    }
    if (data.ids.length) {
      deleteCompany(data).then((payload) => {
        let msg =
          (payload?.data?.message === "deleted" &&
            keywordTranslation &&
            keywordTranslation["companyDeleteSuccess"]) ||
          successMsg.companyDeleteSuccess;
        toast.success(msg);
        Ids.length && setCompaniesIds([]);
        delClientModalHandler(null);
      });
    }
  };

  const user_view = checkPermission(USER_VIEW);
  const company_or_client_create = checkPermission("company_or_client_create");
  const company_or_client_delete = checkPermission("company_or_client_delete");
  const company_or_client_update = checkPermission("company_or_client_update");

  const statusChangeHandler = (status, id) => {
    let formData = new FormData();
    formData.append("_method", "put");
    formData.append("status", status ? 1 : 0);
    if (id) {
      formData.append(`ids[0]`, id);
    } else {
      Ids.map((id, index) => formData.append(`ids[${index}]`, id));
    }
    updateStatusCompany(formData).then((payload) => {
      let msg =
        (payload?.message === "updated" &&
          keywordTranslation &&
          keywordTranslation["companyUpdateSuccess"]) ||
        successMsg.companyUpdateSuccess;
      toast.success(msg);
      setCompaniesIds([]);
    });
  };

  const paginationClickHandler = (url) => {
    setPageUrl(url);
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowPhone(!showPhone);
  };

  const editClientHandler = (client) => {
    if (client) {
      setClient(client);
    } else {
      setClient({});
    }
    setEditClient((prev) => !prev);
  };

  const editApiTrigger = (data) => {
    updateMasterCompany({ data, id: data.id }).then((payload) => {
      let msg =
        (payload?.message === "updated" &&
          keywordTranslation &&
          keywordTranslation["companyUpdateSuccess"]) ||
        successMsg.companyUpdateSuccess;
      toast.success(msg);
      editClientHandler();
    });
  };

  const preferenceUpdateHandler = (data) => {
    updateClientPreferences({ id: client.id, data: data }).then((payload) => {
      let msg =
        (payload?.message === "updated" &&
          keywordTranslation &&
          keywordTranslation["prefrenUpdateSuccess"]) ||
        successMsg.prefrenUpdateSuccess;
      toast.success(msg);
      prefModelHandler();
    });
  };

  const navigate = useNavigate();

  const main_admin = useSelector(
    (state) => state.auth?.userDetail?.user?.role[0]
  );

  const editFirstNameHandler = (data, index) => {
    setShowFirstName(index);
    setHideFirstName(data?.super_admin?.first_name);
    setShowLastName(!showLastName);
    setShowPhone(!showPhone);
  };

  const editLastNameHandler = (data, index) => {
    setShowLastName(index);
    setHideLastName(data?.super_admin?.last_name);
    setShowFirstName(!showFirstName);
    setShowPhone(!showPhone);
  };

  const editPhoneHandler = (index, data) => {
    if (data.super_admin.first_name) {
      setShowPhone(index);
    } else {
      toast.info("Please add proper details of contact person", {
        toastId: "",
      });
    }
    setPhone(data?.super_admin?.phone_number);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
  };

  const keyPressEditFnameHandler = (e, data) => {
    let fname = e.target.value;
    editApiHandlerFname(fname, data);
  };

  const onBlurFnameHandler = (e, data) => {
    let fname = e.target.value;
    editApiHandlerFname(fname, data);
  };

  const keyPressEditLnameHandler = (e, data) => {
    let lname = e.target.value;
    editApiHandlerLname(lname, data);
  };

  const onBlurLnameHandler = (e, data) => {
    let lname = e.target.value;
    editApiHandlerLname(lname, data);
  };

  const keyPressEditPhoneHandler = (phoneNum, info, data) => {
    // let validation = info?.format.length
    setPhone(phoneNum);
    if (11 < phoneNum.length) {
      editApiHandlerPhone(phoneNum, data);
    }
  };

  const imageUploadHandlerEdit = (e, data, index) => {
    setShowImageLoader(index);
    let image = e.target.files[0];
    editApiHandlerImage(image, data);
  };

  const imageRemoveEditHandler = (data, index) => {
    setToggleImage(index);
  };

  const editApiHandlerFname = (fname, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (fname) {
      formData.append("user_first_name", fname);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstNameRequired"]) ||
          validationsKey.firstNameRequired
      );
      return false;
    }

    formData.append("user_last_name", data?.super_admin?.last_name);
    formData.append("name", data?.name);
    formData.append("user_id", data?.super_admin?.id);
    formData.append("id", data?.id);
    formData.append("user_phone_number", data?.super_admin?.phone_number);

    updateAdvanceCompany({ formData, id: data?.id })
      .then((payload) => {
        let msg =
          (payload?.message === "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg);
        setShowFirstName(!showFirstName);
      })
      .catch((error) => {
        // toast.success(
        //   (keywordTranslation && keywordTranslation["companyUpdateSuccess"]) ||
        //   successMsg.companyUpdateSuccess
        // );
      });
  };

  const editApiHandlerLname = (lname, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    if (lname && data?.super_admin?.first_name) {
      formData.append("user_first_name", data?.super_admin?.first_name);
      formData.append("user_last_name", lname);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstNameRequired"]) ||
          validationsKey.firstNameRequired
      );
      return false;
    }

    formData.append("name", data?.name);
    formData.append("user_id", data?.super_admin?.id);
    formData.append("id", data?.id);
    formData.append("user_phone_number", data?.super_admin?.phone_number);

    updateAdvanceCompany({ formData, id: data?.id })
      .then((payload) => {
        let msg =
          (payload?.message === "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg);
        setShowLastName(!showLastName);
      })
      .catch((error) => {});
  };

  const editApiHandlerPhone = (phoneNum, data) => {
    let formData = new FormData();
    formData.append("_method", "put");
    data?.super_admin?.first_name &&
      formData.append("user_first_name", data?.super_admin?.first_name);
    data?.super_admin?.last_name &&
      formData.append("user_last_name", data?.super_admin?.last_name);
    data?.name && formData.append("name", data?.name);
    data?.user_id && formData.append("user_id", data.super_admin.id);
    data?.id && formData.append("id", data?.id);
    phoneNum && formData.append("user_phone_number", phoneNum);

    setShowPhone(!showPhone);
    updateAdvanceCompany({ formData, id: data?.id })
      .then((payload) => {
        let msg =
          (payload?.message === "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg);
        setShowPhone(!showPhone);
      })
      .catch((error) => {});
  };

  const editApiHandlerImage = (image, data) => {
    let formData = new FormData();
    formData.append("_method", "put");

    data?.super_admin?.first_name &&
      formData.append("user_first_name", data?.super_admin?.first_name);
    data?.super_admin?.last_name &&
      formData.append("user_last_name", data?.super_admin?.last_name);
    data?.name && formData.append("name", data?.name);
    data?.super_admin?.id && formData.append("user_id", data?.super_admin?.id);
    formData.append("id", data?.id);
    data?.super_admin?.phone_number &&
      formData.append("user_phone_number", data?.super_admin?.phone_number);
    image && formData.append("logo", image);

    updateAdvanceCompany({ formData, id: data?.id })
      .then((payload) => {
        let msg =
          (payload?.message === "updated" &&
            keywordTranslation &&
            keywordTranslation["companyUpdateSuccess"]) ||
          successMsg.companyUpdateSuccess;
        toast.success(msg, { toastId: "" });
        setToggleImage(!toggleImage);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="sideMargin">
        {showBadgeModal && (
          <ManageWorkerBadge
            manageWorkerModalHandler={manageWorkerModalHandler}
            loading={workerBadgeSettingsLoading}
            action={workerBadgeSettingsHandler}
            data={showBadgeModalData}
            success={workerBadgeSettingsSuccess}
          />
        )}

        {showClientPrefModal && (
          <ClientPrefrenceModal
            isLoading={clientPreferenceLoading}
            modelHandler={prefModelHandler}
            preference={{
              languages: client.languages,
              flag_icon_status: client.flag_icon_status,
              language_abbrivation: client.language_abbrivation,
              logo: client.logo,
            }}
            action={preferenceUpdateHandler}
          >
            {clientPreferenceIsError && (
              <AlertComponent
                error={clientPreferenceIsError}
                message={clientPreferenceError.data.message}
                closeHandler={clientPreferenceReset}
              />
            )}
          </ClientPrefrenceModal>
        )}
        <div className="row">
          <div className="col-md-12  mt-4">
            <p className="m-0 tableheading">
              {(keywordTranslation && keywordTranslation["clientsInfo"]) ||
                langKey.clientsInfo}
            </p>
          </div>
        </div>
        <div className="row mt-4 align-items-center">
          <div className="col-4">
            <select
              name=""
              id=""
              className="form-select selectStatus"
              onChange={(e) => setActiveStatus(e.target.value)}
            >
              <option value="" disabled="true">
                {(keywordTranslation && keywordTranslation["status"]) ||
                  langKey.status}
              </option>
              <option value="1">
                {" "}
                {(keywordTranslation && keywordTranslation["active"]) ||
                  langKey.active}
              </option>
              <option value="0">
                {" "}
                {(keywordTranslation && keywordTranslation["inActive"]) ||
                  langKey.inActive}
              </option>
            </select>
          </div>

          <div className="col-md-8 d-flex justify-content-end gap-2">
            {Ids.length ? (
              <>
                {Ids.length ? (
                  <img
                    src={deleteBlankAsset}
                    alt=""
                    className="mr-2 pointer"
                    onClick={() => delClientModalHandler(null)}
                  />
                ) : null}

                <div className="mr-2">
                  <ToggleSlide
                    Class="Medium"
                    defaultChecked={toggleStatus}
                    onChangeHandler={(toggleStatus) =>
                      Ids.length ? statusChangeHandler(toggleStatus) : null
                    }
                  />
                </div>

                {/* <div className="d-flex align-items-center gap-2">
                  <p className="fs-12 fw-600 purple">Export</p>
                  <img
                    src={purpleDownloadAsset}
                    width="12px"
                    height="13.5px"
                    alt=""
                  />
                </div> */}

                {/* <img src={downloadAsset} alt="" className='mr-2' /> */}
              </>
            ) : null}

            {/* <div className="mr-2" style={{ width: "225px" }}>
              <SearchBar
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["searchByClient"]) ||
                  langKey.searchByClient
                }
                searchClass="languageSearchBar"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageUrl("");
                }}
              />
            </div> */}

            {company_or_client_create && (
              <Button
                label={
                  (keywordTranslation && keywordTranslation["addnewClient"]) ||
                  langKey.addnewClient
                }
                buttonStyle="create_btn"
                onClick={clientsModelHandler}
              />
            )}
            {showClientsMangModal && (
              <AddClientsModal
                modelHandler={clientsModelHandler}
                action={createCompanyHandler}
                isLoading={createCompanyLoading}
              >
                {createCompanyIsError && (
                  <AlertComponent
                    error={true}
                    message={createCompanyError?.data?.message}
                    closeHandler={createCompanyReset}
                  />
                )}
              </AddClientsModal>
            )}
          </div>
        </div>
        {editClient && client && (
          <AddClientsModal
            modelHandler={editClientHandler}
            action={editApiTrigger}
            client={client}
            isLoading={updateMasterCompanyLoading}
          >
            {updateMasterCompanyIsError && (
              <AlertComponent
                error={true}
                message={updateMasterCompanyError.data.message}
                closeHandler={updateMasterCompanyReset}
              />
            )}
          </AddClientsModal>
        )}

        {delClient && (
          // <DeleteModal
          //   deleteMessage={
          //     (keywordTranslation && keywordTranslation["delClient"]) ||
          //     langKey.delClient
          //   }
          //   targetName={
          //     companyToDelete?.name ||
          //     (keywordTranslation && keywordTranslation["selected"]) ||
          //     langKey.selected
          //   }
          //   warningText={
          //     (keywordTranslation && keywordTranslation["delClientWarning"]) ||
          //     langKey.delClientWarning
          //   }
          //   action={deleteCompanyHandler}
          //   loading={deleteCompanyLoading}
          //   handleCloseDeleteModal={() => delClientModalHandler(null)}
          // />

          <DeleteTrainingModal
            action={deleteCompanyHandler}
            loading={deleteCompanyLoading}
            handleCloseDeleteModal={() => delClientModalHandler(null)}
            deleteButtonText="Delete Client"
            confirmationTextOne="Please confirm that you want to delete this training and all
          associated content. This action cannot be undone!"
            firstCheckBoxText="All the training content belongs to this client including quiz questions"
            secondCheckBoxText="Workers certifications linked with this training"
          />
        )}

        <div className="customScrollbar smTableOverflow">
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
                                companies?.length &&
                                companies?.length === Ids.length
                              }
                            />
                          </div>
                        </th>
                      )
                    ) : name === langKey.setting ? (
                      <th scope="col" key={id}>
                        <div className="last-th">
                          <p className="fs-12" style={{ marginRight: "35px" }}>
                            Action
                          </p>
                          <Dropdown>
                            <Dropdown.Toggle variant="" id="setting-dropdown">
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
              {/* Getting data from API */}
              {companies?.length ? (
                companies.map((data, index) => (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          {" "}
                          <input
                            type="checkbox"
                            value={data.id}
                            onChange={(e) => checkBoxHandler(e, data)}
                            checked={isIdAdded(data.id)}
                          />
                        </div>
                      </td>
                    )}
                    {tableTitle[1].status && (
                      <td>{index + managementCompanyList?.data.from}</td>
                    )}

                    {tableTitle[2].status && (
                      <td>
                        <div className="d-flex justify-content-start align-items-center">
                          {data?.logo ? (
                            <>
                              {toggleImage !== index ? (
                                <ImageViewer
                                  src={data?.logo}
                                  className="img-fluid"
                                  width="50px"
                                  height="22px"
                                  name="image"
                                />
                              ) : (
                                <div className="csvfile_div p-2 advanceViewFileUpload h-auto">
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
                                        className="adavancedViewUploadIcon "
                                      />

                                      <input
                                        type="file"
                                        name="image"
                                        className="TbmFileUpload h-100 "
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
                                  className="cursor advanceViewDelIconn ml-1"
                                  width="12px"
                                  height="12px"
                                  onClick={() =>
                                    imageRemoveEditHandler(data, index)
                                  }
                                />
                              )}
                            </>
                          ) : (
                            <div className="csvfile_div p-2 advanceViewFileUpload h-auto">
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
                                    className="TbmFileUpload h-100"
                                    style={{ top: "0px", height: "26px" }}
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={(e) =>
                                      imageUploadHandlerEdit(e, data, index)
                                    }
                                  />
                                </>
                              </center>
                            </div>
                          )}
                        </div>
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>
                        {data.super_admin?.first_name ||
                        data.super_admin?.last_name ? (
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                data.super_admin?.profile_photo ||
                                contactpersonAsset
                              }
                              alt=""
                              width="22px"
                              height="22px"
                              className="mr-2 rounded-circle"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = contactpersonAsset;
                              }}
                            />

                            {showFirstName === index ? (
                              <input
                                type="text"
                                value={hideFirstName}
                                style={{ width: "115px" }}
                                name="name"
                                className="typetext ml-1 form-control"
                                placeholder="Blaise"
                                onChange={(e) =>
                                  setHideFirstName(e.target.value)
                                }
                                onBlur={(e) => onBlurFnameHandler(e, data)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  keyPressEditFnameHandler(e, data)
                                }
                              />
                            ) : (
                              <span>{data?.super_admin?.first_name}</span>
                            )}

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editFirstNameHandler(data, index)}
                            />

                            {showLastName === index ? (
                              <input
                                type="text"
                                value={hideLastName}
                                style={{ width: "115px" }}
                                name="name"
                                className="typetext ml-1 form-control"
                                placeholder="DEFLOO"
                                onChange={(e) =>
                                  setHideLastName(e.target.value)
                                }
                                onBlur={(e) => onBlurLnameHandler(e, data)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  keyPressEditLnameHandler(e, data)
                                }
                              />
                            ) : (
                              <span className="ml-1">
                                {data?.super_admin?.last_name}
                              </span>
                            )}

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editLastNameHandler(data, index)}
                            />

                            {updateAdvanceCompanyLoading &&
                              showFirstName === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}

                            {updateAdvanceCompanyLoading &&
                              showLastName === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}
                    {tableTitle[4].status && (
                      <td>
                        <div className="d-flex align-items-center clientPhone">
                          <div>
                            {showPhone === index ? (
                              // <div style={{ width: "100px" }}>
                              <div>
                                {/* <InputMasks
                                  mask="99/99/9999"
                                  value={phone}
                                  onChange={(e) =>
                                    keyPressEditPhoneHandler(e, data)
                                  }
                                >
                                  <input
                                    type="number"
                                    className="typetext mr-2 form-control"
                                    placeholder="+32 0 000 00 00"
                                  />
                                </InputMasks> */}
                                <PhoneInput
                                  country={
                                    data.country?.split(" ")[0].toLowerCase() ||
                                    "be"
                                  }
                                  // className="typetext mr-2 form-control"
                                  // value={phone_number}
                                  onChange={(value, info) =>
                                    keyPressEditPhoneHandler(value, info, data)
                                  }
                                />
                              </div>
                            ) : (
                              <p className="phone_number m-0">
                                {data?.super_admin?.phone_number == "undefined"
                                  ? ""
                                  : data?.super_admin?.phone_number == "null"
                                  ? ""
                                  : data?.super_admin?.phone_number ?? ""}
                              </p>
                            )}
                          </div>

                          <img
                            src={editRedIconAsset}
                            className="cursor ml-1"
                            width="12px"
                            height="12px"
                            onClick={() => editPhoneHandler(index, data)}
                          />

                          {updateAdvanceCompanyLoading &&
                            showPhone === index && (
                              <img
                                src={loaderAsset}
                                width="35px"
                                height="35px"
                              />
                            )}
                        </div>
                      </td>
                    )}
                    {tableTitle[5].status && (
                      <td>
                        <p className="td_email m-0">
                          {data.super_admin?.email || "—"}
                        </p>
                      </td>
                    )}
                    {tableTitle[6].status && (
                      <td>
                        {data.country ? (
                          <div className="d-flex align-items-center  client">
                            {/* <img
                              src={flagAsset}
                              alt=""
                              width="22px"
                              height="13.48px"
                              className="mr-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = flagAsset;
                              }}
                            /> */}

                            <div className="d-flex">
                              <PhoneInput
                                country={
                                  data.country.split(" ")[0].toLowerCase() ||
                                  "be"
                                }
                                disabled={true}
                                // className="typetext mr-2 form-control"
                                value={data.phone_number}
                                // onChange={(value) => {
                                //   // setValue("phone_number", value) pk pakistan
                                //   setValue("phone_number", value);
                                // }}
                              />
                              <p className="mb-0 ml-4 pl-2">
                                {data.country?.split(" ")[1] || "Belgium"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}
                    {tableTitle[7].status && (
                      <td>{moment(data.created_at).format("MMM DD, hh:mm")}</td>
                    )}
                    {tableTitle[8].status && (
                      <td>
                        <div style={{ marginTop: "-7px" }}>
                          <ToggleSlide
                            Class="Medium"
                            checked={data.status}
                            onChangeHandler={(status) =>
                              statusChangeHandler(status, data.id)
                            }
                          />
                        </div>
                      </td>
                    )}
                    <td>
                      <div className="last-td">
                        {company_or_client_delete && (
                          <img
                            src={deleteBlankAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="cursor"
                            onClick={() => {
                              delClientModalHandler(data);
                            }}
                          />
                        )}
                        {company_or_client_update && (
                          <img
                            src={editAsset}
                            alt=""
                            width="13px"
                            height="13px"
                            className="cursor"
                            onClick={() => editClientHandler(data)}
                          />
                        )}
                        {/* <img
                          src={downloadgreenAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          className="cursor"
                        /> */}

                        {user_view && main_admin === "main_admin" && (
                          <img
                            src={viewblueAsset}
                            alt=""
                            width="16.87px"
                            height="12px"
                            className="cursor"
                            onClick={() => {
                              navigate("/Dashboard/Users", {
                                state: {
                                  company_id: data?.id,
                                  company_name: data?.name,
                                },
                              });
                            }}
                          />
                        )}
                        <img
                          src={settingBrownAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          className="cursor"
                          onClick={() => prefModelHandler(data)}
                        />
                        <img
                          src={settingiconAsset}
                          alt=""
                          width="13px"
                          height="13px"
                          className="cursor"
                          onClick={() => manageWorkerModalHandler(data)}
                        />
                      </div>

                      {/* <div className="float-right">
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

                            {company_or_client_update && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => editClientHandler(data)}
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

                            {company_or_client_delete && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  delClientModalHandler(data);
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

                            {user_view && main_admin === "main_admin" && (
                              <Dropdown.Item
                                className="dropdown_items"
                                onClick={() => {
                                  navigate("/Dashboard/Users", {
                                    state: { company_id: data?.id },
                                  });
                                }}
                              >
                                <img
                                  src={udAsset}
                                  alt=""
                                  width="12px"
                                  height="12px"
                                />
                                &nbsp;&nbsp;
                                {(keywordTranslation &&
                                  keywordTranslation["users"]) ||
                                  langKey.users}
                              </Dropdown.Item>
                            )}

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => prefModelHandler(data)}
                            >
                              <img
                                src={settingiconAsset}
                                alt=""
                                width="12px"
                                height="12px"
                              />
                              &nbsp;&nbsp;
                              {(keywordTranslation &&
                                keywordTranslation["preferences"]) ||
                                langKey.preferences}
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={() => manageWorkerModalHandler(data)}
                            >
                              <img
                                src={settingiconAsset}
                                alt=""
                                width="12px"
                                height="12px"
                              />
                              &nbsp;&nbsp;
                              {(keywordTranslation &&
                                keywordTranslation["badge"]) ||
                                langKey.badge}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div> */}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {managementCompanyLoading ? (
                    <Loader colSpan="10" />
                  ) : (
                    <NoRecordFound colSpan="10" />
                  )}
                </>
              )}
            </tbody>
          </TableComponent>
        </div>
      </div>
      {pagination && pagination.length && !searchquery && (
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

export default Clients;
