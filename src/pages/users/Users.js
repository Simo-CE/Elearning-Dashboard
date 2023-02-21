import React, { useCallback, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import "../../components/detailCard/DetailCard.css";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import usersDetailCardsData from "./userData";
import DetailCard from "../../components/detailCard/DetailCard";
import ModalImage from "react-modal-image";

import "./Users.css";
import "../../components/ResponsiveText.css";
import {
  sortAsset,
  settingAsset,
  filterAsset,
  activeIconAsset,
  actionAsset,
  deactiveIconAsset,
  delIconAsset,
  editIconAsset,
  filterActiveAsset,
  csvFileAsset,
  printAsset,
  contactpersonAsset,
  binAsset,
  editRedIconAsset,
  loaderAsset,
  settingGreyAsset,
  deleteBlankAsset,
  editAsset,
  downloadgreenAsset,
  viewblueAsset,
  totalUsersAsset,
  ageAsset,
  userFunctionAsset,
  activeUserAsset,
  inactiveUserAsset,
  csvIconAsset,
} from "../../assets";
import UserModal from "./AddUserModal";
import "../../components/ResponsiveText.css";
import ImportCsvFileModal from "./ImportCsvFileModal";
import AlertComponent from "../../components/alert/Alert";
import TableComponent from "../../components/table/Table";
import PrintUsersBadgesModal from "./PrintUsersBadgesModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Model/DeleteModal";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import DateRangeSelector from "../../components/dateRangeSelector/DateRangeSelector";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
  useGetFunctionDropdownQuery,
  useGetCompaniesListQuery,
  useGetDepartmentDropdownQuery,
  useUserListDropDownQuery,
  useManagerDropDownQuery,
  useReportToDropDownQuery,
  useUpdateUserAdvanceMutation,
  useRoleDropDownQuery,
  useImportCSVFileMutation,
} from "../../services/api";
import checkPermission from "../../utils/checkPermissions";
import SaveButton from "../../components/Button/Button";
import { toast } from "react-toastify";
import InputMasks from "../../components/inputMask/InputMask";
import { useEffect } from "react";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import QRModal from "./QRModal";

const Users = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth?.userDetail?.user);
  const [editUserData, setEditUserData] = useState(null);
  const [company_id, setCompanyId] = useState(location?.state?.company_id);
  const currentUser = useSelector((user) => user.auth.userDetail.user);

  // filter status section
  const [userInfoSearches, setUserInfoSearches] = useState({
    userId: "",
    roleId: "",
    range: "",
    managerId: "",
    status: "",
    type: "",
    age: "",
    search: "",
    departmentId: "",
    functionId: "",
    company_id: location?.state?.company_id || userInfo?.company_id,
    //   userInfo?.company_id ||
    //   0,
  });

  // location?.state?.userCompanyId
  // // ||
  // // userInfo?.company_id ||
  // // userInfo?.company_id ||
  // // ""
  // end filter status

  const search = useSelector((state) => state.search?.searchedValue);

  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [showCSVFileModal, setShowCSVFileModal] = useState(false);
  const [showUserBadgeModal, setShowUserBadgeModal] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const theme = useSelector((state) => state.ui.theme);
  const [userIds, setUserIds] = useState([]);
  const [userDelete, setUserDelete] = useState();
  const [hideFirstName, setHideFirstName] = useState();
  const [showFirstName, setShowFirstName] = useState();
  const [showLastName, setShowLastName] = useState();
  const [hideLastName, setHideLastName] = useState();
  const [functionValue, setFunctionValue] = useState();
  const [deptValue, setDeptValue] = useState();
  const [roleValue, setRoleValue] = useState();
  const [managerValue, setManagerValue] = useState();
  const [showFuncDropdown, setShowFuncDropdown] = useState();
  const [showDeptDropdown, setShowDeptDropdown] = useState();
  const [showRoleDropdown, setShowRoleDropdown] = useState();
  const [showManagerDropdown, setShowManagerDropdown] = useState();
  const [phone, setPhone] = useState("");
  // const [search, setSearchQuery] = useState("");
  const [showPhone, setShowPhone] = useState();
  const [showAllRecord, setShowAllRecord] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQRCode] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState("");

  const main_admin = useSelector(
    (state) => state.auth?.userDetail?.user?.role[0]
  );

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
        (keywordTranslation && keywordTranslation["users"]) || langKey.users,
      elementStyle: "ml-1",
      elementStyle: "ml-1",
      icon: "",
    },
    // {
    //   id: 4,
    //   status: true,
    //   name: (keywordTranslation && keywordTranslation["age"]) || langKey.age,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["function"]) ||
        langKey.function,
      elementStyle: "ml-1",
      icon: "",
    },
    // {
    //   id: 5,
    //   status: true,
    //   name:
    //     (keywordTranslation && keywordTranslation["department"]) ||
    //     langKey.department,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    {
      id: 5,
      status: true,
      name: (keywordTranslation && keywordTranslation["role"]) || langKey.role,
      elementStyle: "ml-1",
      icon: "",
    },
    // {
    //   id: 7,
    //   status: true,
    //   name:
    //     (keywordTranslation && keywordTranslation["company"]) ||
    //     langKey.company,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    // {
    //   id: 8,
    //   status: true,
    //   name: (keywordTranslation && keywordTranslation["site"]) || langKey.site,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    // {
    //   id: 9,
    //   status: true,
    //   name: (keywordTranslation && keywordTranslation["N+1"]) || "N+1",
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["phone"]) || langKey.phone,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name: (keywordTranslation && keywordTranslation["type"]) || langKey.type,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["qrCode"]) || langKey.qrCode,
      elementStyle: "ml-1",
      icon: "",
    },
    // {
    //   id: 7,
    //   status: true,
    //   name:
    //     (keywordTranslation && keywordTranslation["email"]) || langKey.email,
    //   elementStyle: "ml-1",
    //   icon: "",
    // },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["dateCreation"]) ||
        langKey.dateCreation,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 10,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 11,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const handleShowQR = (qr) => {
    setShowQR((prev) => !prev);
    setQRCode(qr);
  };

  const addUserModalHandler = () => {
    setShowUserModal((prev) => !prev);
  };

  const addCSVFileModalHandler = (payload) => {
    setShowCSVFileModal((prev) => !prev);
    setFileUploadSuccess(payload.message);
  };

  const addUserBadgeModalHandler = () => {
    setShowUserBadgeModal((prev) => !prev);
  };

  const editUserHandler = (data) => {
    setEditUserModal((prev) => !prev);
    setEditUserData(data);
  };

  const viewUserHandler = (data) => {
    setViewUserModal((prev) => !prev);
    setEditUserData(data);
  };

  const {
    data: usersList,
    isLoading,
    isFetching,
    isError,
    refetch: usersRefetch,
  } = useGetUsersQuery({
    pageUrl,
    params: {
      ...userInfoSearches,
      search,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  const {
    data: functionsList,
    isLoading: functionsListLoading,
    isError: functionsListError,
    refetch: functionsRefetch,
  } = useGetFunctionDropdownQuery(company_id || location?.state?.company_id);

  const {
    data: roleList,
    isLoading: roleLoading,
    isFetching: roleFetching,
    isError: roleError,
    refetch: rolesRefetch,
  } = useRoleDropDownQuery(company_id || location?.state?.company_id);

  const {
    data: userDropDownList,
    isLoading: userDropDownListLoading,
    isError: userDropDownListError,
    refetch: userDropdownRefetch,
  } = useUserListDropDownQuery({
    params: { company_id: company_id || location?.state?.company_id },
  });

  // const {
  //   data: managerList,
  //   isLoading: managerListLoading,
  //   isError: managerListError,
  //   refetch: managererRefetch,
  // } = useManagerDropDownQuery(company_id);

  // const {
  //   data: reportToList,
  //   isLoading: reportToListLoading,
  //   isError: reportToListError,
  //   refetch: reportToRefetch,
  // } = useReportToDropDownQuery(company_id);

  // const {
  //   data: departmentsList,
  //   isLoading: departmentsListLoading,
  //   isError: departmentsListError,
  //   refetch: departmentsRefetch,
  // } = useGetDepartmentDropdownQuery(company_id);

  // const {
  //   data: companyList,
  //   isLoading: companyListLoading,
  //   isError: companyListError,
  //   refetch: companyListRefetch,
  // } = useGetCompaniesListQuery({ params: { company_id: company_id } });

  const [
    createUser,
    {
      isLoading: createUserLoading,
      isError: createUserError,
      isSuccess: createUserSuccess,
      reset: createUserReset,
      error: createUserErrorMessage,
    },
  ] = useCreateUserMutation();

  useEffect(() => {
    // companyListRefetch();
    // departmentsRefetch();
    // reportToRefetch();
    // managererRefetch();
    // userDropdownRefetch();
    rolesRefetch();
    functionsRefetch();
    usersRefetch();

    if (main_admin === "main_admin") {
      setCompanyId(location?.state?.company_id);
    } else {
      setCompanyId(userInfo?.company_id);
    }
  }, []);

  useEffect(() => {
    if (fileUploadSuccess === "updated") {
      usersRefetch();
    }
  }, [fileUploadSuccess]);

  const ages = [
    {
      value: "25",
      age: "Less than 25",
    },
    {
      value: "25to34",
      age: "From 25 to 34",
    },
    {
      value: "35to44",
      age: "From 35 to 44",
    },
    {
      value: "45to55",
      age: "From 45 to 55",
    },
    {
      value: "55",
      age: "More than 55",
    },
  ];

  const userStatus = [
    {
      value: 1,
      status:
        (keywordTranslation && keywordTranslation["active"]) || langKey.active,
    },
    {
      value: 0,
      status:
        (keywordTranslation && keywordTranslation["inActive"]) ||
        langKey.inActive,
    },
  ];

  const [
    updateUserStatus,
    {
      isError: updateUserStatusError,
      isSuccess: updateUserStatusSuccess,
      reset: updateUserStatusReset,
    },
  ] = useUpdateUserStatusMutation();

  const [
    deleteUser,
    {
      isLoading: deleteUserLoading,
      isError: deleteUserError,
      isSuccess: deleteUserSuccess,
      reset: deleteUserReset,
    },
  ] = useDeleteUserMutation();

  const [
    updateUser,
    {
      isLoading: updateUserLoading,
      isSuccess: updateUserSuccess,
      reset: updateUserReset,
    },
  ] = useUpdateUserMutation();

  const [
    updateUserAdvance,
    {
      isLoading: updateUserAdvanceLoading,
      isSuccess: updateUserAdvanceSuccess,
      reset: updateUserAdvanceReset,
    },
  ] = useUpdateUserAdvanceMutation();

  const createUserFunc = (data) => {
    createUser({ data })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          let msg =
            (payload?.message == "created" &&
              keywordTranslation &&
              keywordTranslation["userCreatedSuccess"]) ||
            successMsg.userCreatedSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userCreatedSuccess"]) ||
          //     successMsg.userCreatedSuccess
          // );
          setShowUserModal(false);
        }
      })
      .catch((error) => {});
  };

  const updateUserStatusFunc = (id, status) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("status", status === 1 ? 0 : 1);
    formData.append("ids[]", id);

    updateUserStatus({ formData })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
        }
      })
      .catch((error) => {});
  };

  const deleteUserFunc = () => {
    let data = {
      _method: "delete",
      ids: [],
    };
    if (userDelete) {
      data.ids = [userDelete.id];
    } else {
      data.ids = [...userIds];
    }
    if (data.ids.length) {
      deleteUser(data).then((payload) => {
        let msg =
          (payload?.data?.message == "deleted" &&
            keywordTranslation &&
            keywordTranslation["userDeleteSuccess"]) ||
          successMsg.userDeleteSuccess;
        toast.success(msg);
        // toast.success(
        //   (keywordTranslation && keywordTranslation["userDeleteSuccess"]) ||
        //     successMsg.userDeleteSuccess
        // );
        userIds.length && setUserIds([]);
        deleteUserModalHandler(null);
      });
    }
  };

  const deleteUserModalHandler = (user) => {
    setUserDelete(user);
    setDeleteUserModal((prev) => !prev);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = usersData?.map((data) => data.id);
      setUserIds([...ids]);
    } else {
      setUserIds([]);
    }
  };

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = userIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setUserIds([...stateIds]);
  };

  const isIdAdded = (id) => {
    return userIds.includes(JSON.parse(id));
  };

  const updateUserFunc = (data) => {
    updateUser(data)
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setEditUserModal(false);
        }
      })
      .catch((error) => {});
  };

  const paginationClickHandler = (url) => {
    if (url) {
      setPageUrl(url);
    }
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const user_create = checkPermission("user_create");
  const user_delete = checkPermission("user_delete");
  const user_update = checkPermission("user_update");
  const usersData = usersList?.data?.users?.data;
  const pagination = usersList?.data?.users?.links;
  const paginationCount = usersList?.data?.users;

  let cardData = [
    usersList?.data?.total_user ?? 0,
    usersList?.data?.age_average ?? 0,
    usersList?.data?.functionUser.length &&
      usersList?.data?.functionUser[0].name,
    usersList?.data?.active,
    usersList?.data?.un_active,
  ];

  const editFirstNameHandler = (data, index) => {
    setShowFirstName(index);
    setHideFirstName(data?.first_name);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const editLastNameHandler = (data, index) => {
    setShowLastName(index);
    setHideLastName(data?.last_name);
    setShowFirstName(!showFirstName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const editFunctionHandler = (index) => {
    setShowFuncDropdown(index);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const editDeptHandler = (index) => {
    setShowDeptDropdown(index);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const editRoleHandler = (index) => {
    setShowRoleDropdown(index);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowManagerDropdown(!showManagerDropdown);
    setShowPhone(!showPhone);
  };

  const editManagerHandler = (index) => {
    setShowManagerDropdown(index);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowPhone(!showPhone);
  };

  const editPhoneHandler = (index) => {
    setShowPhone(index);
    setHideLastName("");
    setShowFirstName(!showFirstName);
    setShowLastName(!showLastName);
    setShowFuncDropdown(!showFuncDropdown);
    setShowDeptDropdown(!showDeptDropdown);
    setShowRoleDropdown(!showRoleDropdown);
    setShowManagerDropdown(!showManagerDropdown);
  };

  const keyPressEditFnameHandler = (e, data) => {
    let fname = e.target.value;
    editApiHandlerFname(
      fname,
      data,
      functionValue,
      deptValue,
      roleValue,
      managerValue,
      phone
    );
  };

  const onBlurFnameHandler = (e, data) => {
    let fname = e.target.value;
    editApiHandlerFname(
      fname,
      data,
      functionValue,
      deptValue,
      roleValue,
      managerValue,
      phone
    );
  };

  const keyPressEditLnameHandler = (e, data) => {
    let lname = e.target.value;
    editApiHandlerLname(
      lname,
      data,
      functionValue,
      deptValue,
      roleValue,
      managerValue,
      phone
    );
  };

  const onBlurLnameHandler = (e, data) => {
    let lname = e.target.value;
    editApiHandlerLname(
      lname,
      data,
      functionValue,
      deptValue,
      roleValue,
      managerValue,
      phone
    );
  };

  const keyPressEditPhoneHandler = (e, data) => {
    let phoneNum = e.target.value;
    setPhone(phoneNum);
    phoneApiHandler(phoneNum, data);
  };

  const editApiHandlerFname = (
    fname,
    data,
    functionValue,
    deptValue,
    roleValue,
    managerValue,
    phone
  ) => {
    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);
    formData.append("first_name", fname);
    formData.append("last_name", data?.last_name);
    formData.append("company_id", company_id);

    if (functionValue) {
      formData.append("function_id", functionValue);
    }

    if (deptValue) {
      formData.append("department_id", deptValue);
    }

    if (roleValue) {
      formData.append("role_id", roleValue);
    } else {
      formData.append("role_id", data?.user_role?.role_list?.id);
    }

    if (managerValue) {
      formData.append("report_to", managerValue);
    } else {
      formData.append("report_to", data?.report_to?.id);
    }

    formData.append("phone_number", phone);

    updateUserAdvance(formData)
      .then((payload) => {
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["userUpdateSuccess"]) ||
          successMsg.userUpdateSuccess;
        toast.success(msg);
        // toast.success(
        //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
        //     successMsg.userUpdateSuccess
        // );
        setShowFirstName(!showFirstName);
        setShowFuncDropdown(!showFuncDropdown);
        setShowDeptDropdown(!showDeptDropdown);
        setShowRoleDropdown(!showRoleDropdown);
        setShowManagerDropdown(!showManagerDropdown);
        setShowPhone(!showPhone);
      })
      .catch((error) => {});
  };

  const editApiHandlerLname = (
    lname,
    data,
    functionValue,
    deptValue,
    roleValue,
    managerValue,
    phone
  ) => {
    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);
    formData.append("first_name", data?.first_name);
    formData.append("last_name", lname);

    if (functionValue) {
      formData.append("function_id", functionValue);
    }

    if (deptValue) {
      formData.append("department_id", deptValue);
    }

    if (roleValue) {
      formData.append("role_id", roleValue);
    }

    if (managerValue) {
      formData.append("report_to", managerValue);
    }

    formData.append("phone_number", phone);

    updateUserAdvance(formData)
      .then((payload) => {
        let msg =
          (payload?.message == "updated" &&
            keywordTranslation &&
            keywordTranslation["userUpdateSuccess"]) ||
          successMsg.userUpdateSuccess;
        toast.success(msg);
        // toast.success(
        //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
        //     successMsg.userUpdateSuccess
        // );
        setShowLastName(!showLastName);
        setShowFuncDropdown(!showFuncDropdown);
        setShowDeptDropdown(!showDeptDropdown);
        setShowRoleDropdown(!showRoleDropdown);
        setShowManagerDropdown(!showManagerDropdown);
        setShowPhone(!showPhone);
      })
      .catch((error) => {});
  };

  const funcApiHandler = (value, data) => {
    setFunctionValue(value);

    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);

    if (data?.first_name && data?.last_name) {
      formData.append("function_id", value);
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data.last_name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstLastNameRequired"]) ||
          validationsKey.firstLastNameRequired
      );
    }

    if (value) {
      updateUserAdvance(formData)
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setShowFuncDropdown(!showFuncDropdown);
        })
        .catch((error) => {});
    }
  };

  const deptApiHandler = (value, data) => {
    setDeptValue(value);
    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);

    if (data?.first_name && data?.last_name) {
      formData.append("department_id", value);
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data.last_name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstLastNameRequired"]) ||
          validationsKey.firstLastNameRequired
      );
    }

    if (value) {
      updateUserAdvance(formData)
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setShowDeptDropdown(!showDeptDropdown);
        })
        .catch((error) => {});
    }
  };

  const roleApiHandler = (value, data) => {
    setRoleValue(value);

    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);

    if (data?.first_name && data?.last_name) {
      formData.append("role_id", value);
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data.last_name);
      formData.append("company_id", company_id);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstLastNameRequired"]) ||
          validationsKey.firstLastNameRequired
      );
    }

    if (value) {
      updateUserAdvance(formData)
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setShowRoleDropdown(!showRoleDropdown);
        })
        .catch((error) => {});
    }
  };

  const managerApiHandler = (value, data) => {
    setManagerValue(value);

    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);

    if (data?.first_name && data?.last_name) {
      formData.append("report_to", value);
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data.last_name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstLastNameRequired"]) ||
          validationsKey.firstLastNameRequired
      );
    }

    if (value) {
      updateUserAdvance(formData)
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setShowManagerDropdown(!showManagerDropdown);
        })
        .catch((error) => {});
    }
  };

  const phoneApiHandler = (phoneNum, data) => {
    let formData = new FormData();

    formData.append("_method", "put");

    formData.append("id", data?.id);

    if (data?.first_name && data?.last_name) {
      formData.append("phone_number", phoneNum);
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data.last_name);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["firstLastNameRequired"]) ||
          validationsKey.firstLastNameRequired
      );
    }

    if (phoneNum.slice(-1) !== "_") {
      setShowPhone(!showPhone);
      updateUserAdvance(formData)
        .then((payload) => {
          let msg =
            (payload?.message == "updated" &&
              keywordTranslation &&
              keywordTranslation["userUpdateSuccess"]) ||
            successMsg.userUpdateSuccess;
          toast.success(msg);
          // toast.success(
          //   (keywordTranslation && keywordTranslation["userUpdateSuccess"]) ||
          //     successMsg.userUpdateSuccess
          // );
          setShowManagerDropdown(!showManagerDropdown);
          setShowPhone(!showPhone);
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      {/* <div className={`d-flex topnab-border align-items-center ${theme}`}>
        <div className="col-12">
          <p className="navtab cursor mb-0 fs-12">
            {(keywordTranslation && keywordTranslation["users"]) ||
              langKey.users}
          </p>
        </div>
      </div> */}

      {showQR && <QRModal handleShowQR={handleShowQR} data={qrCode} />}

      <div className="sideMargin">
        <div className="row align-items-center mt-3">
          <div className="col-6 mt-3">
            <p className="tableheading mb-0">
              {(keywordTranslation && keywordTranslation["manageUsers"]) ||
                langKey.manageUsers}
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-3 pr-0">
                <div className="d-flex">
                  <div className="w-100 mr-2">
                    {/* function selector */}
                    <div className="h-29px userSelectableDropdown">
                      <SearchableDropdown
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["selectFunction"]) ||
                          langKey.selectFunction
                        }
                        selectedValue={userInfo?.function?.id}
                        options={functionsList}
                        changeHandler={(value) =>
                          setUserInfoSearches((pre) => ({
                            ...pre,
                            functionId: value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3 pr-0">
                <div className="h-29px userSelectableDropdown">
                  <SearchableDropdown
                    placeholder="Select Role"
                    options={roleList}
                    changeHandler={(value) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        roleId: value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-3 pr-0">
                <div className="h-29px userSelectableDropdown">
                  <select
                    name="status"
                    value={userInfoSearches?.type}
                    onChange={(e) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        type: e.target.value,
                      }))
                    }
                    className={`form-select select_field cursor fs-12 w-100 ml-0 ${theme}`}
                  >
                    <option value="">
                      {(keywordTranslation &&
                        keywordTranslation["selectType"]) ||
                        langKey.selectType}
                    </option>
                    <option value="internal">
                      {" "}
                      {(keywordTranslation && keywordTranslation["internal"]) ||
                        langKey.internal}
                    </option>
                    <option value="external">
                      {" "}
                      {(keywordTranslation && keywordTranslation["external"]) ||
                        langKey.external}
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-3">
                <div className="h-29px userSelectableDropdown">
                  <select
                    name="status"
                    value={userInfoSearches?.status}
                    onChange={(e) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        status: e.target.value,
                      }))
                    }
                    className={`form-select select_field cursor fs-12 w-100 ml-0 ${theme}`}
                  >
                    <option value="">
                      {(keywordTranslation &&
                        keywordTranslation["selectStatus"]) ||
                        langKey.selectStatus}
                    </option>
                    {userStatus.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-1">
            {userIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2"
                onClick={() => deleteUserModalHandler(null)}
              />
            ) : null}
          </div> */}
          <div className="col-lg-5 col-md-12 mt-md-2 mt-lg-0 d-flex justify-content-end">
            {userIds.length ? (
              <img
                src={binAsset}
                alt=""
                className="mr-2 pointer"
                onClick={() => deleteUserModalHandler(null)}
              />
            ) : null}
            <SaveButton
              label={
                (keywordTranslation && keywordTranslation["importCsvFile"]) ||
                langKey.importCsvFile
              }
              buttonStyle="csvButton mr-2"
              icon={csvIconAsset}
              imgStyle="csvIcon"
              onClick={addCSVFileModalHandler}
            />
            {user_create && (
              <SaveButton
                label={
                  (keywordTranslation && keywordTranslation["newUser"]) ||
                  langKey.newUser
                }
                buttonStyle="create_btn"
                onClick={addUserModalHandler}
              />
            )}
            {showUserModal && (
              <UserModal
                handleCloseUserModal={addUserModalHandler}
                action={createUserFunc}
                loading={createUserLoading}
                success={createUserSuccess}
                error={createUserError}
                reset={createUserReset}
                companyDetail={userInfo}
                userCompanyId={location?.state?.company_id}
                userCompanyName={location?.state?.company_name}
              >
                {createUserError && (
                  <AlertComponent
                    error={true}
                    message={createUserErrorMessage.data.message}
                    closeHandler={createUserReset}
                  />
                )}
              </UserModal>
            )}

            {editUserModal && editUserData && (
              <UserModal
                info={editUserData}
                userCompanyId={editUserData.company_id}
                action={updateUserFunc}
                id={editUserData.id}
                loading={updateUserLoading}
                handleCloseUserModal={() => editUserHandler(null)}
                edit={true}
              />
            )}

            {viewUserModal && editUserData && (
              <UserModal
                info={editUserData}
                userCompanyId={editUserData.company_id}
                action={updateUserFunc}
                id={editUserData.id}
                view={true}
                loading={updateUserLoading}
                handleCloseUserModal={() => viewUserHandler(null)}
              />
            )}

            {deleteUserModal && (
              <DeleteModal
                action={deleteUserFunc}
                handleCloseDeleteModal={() => deleteUserModalHandler(null)}
                deleteMessage={
                  (keywordTranslation && keywordTranslation["delUserMsg"]) ||
                  langKey.delUserMsg
                }
                targetName={
                  userDelete?.first_name ||
                  (keywordTranslation && keywordTranslation["selected"]) ||
                  langKey.selected
                }
                loading={deleteUserLoading}
              />
            )}

            {showCSVFileModal && (
              <ImportCsvFileModal
                handleCloseCSVFileModal={addCSVFileModalHandler}
              />
            )}

            {showUserBadgeModal && (
              <PrintUsersBadgesModal
                handleCloseUserBadgeModal={addUserBadgeModalHandler}
              />
            )}
          </div>
        </div>

        {/* <div className="row">
          {usersDetailCardsData.map((data, index) => (
            <DetailCard
              key={index}
              {...data}
              columns="customCardsWidth mx-auto mt-4"
              title={cardData[index]}
            />
          ))}
        </div> */}

        {/* <div className="col-lg-5 col-md-12 ml-0 pr-0">
            <div className="d-flex"> */}
        {/* search queary */}
        {/* <SearchBar
                placeholder={
                  (keywordTranslation && keywordTranslation["searchByUser"]) ||
                  langKey.searchByUser
                }
                searchClass={`searchBarComponent w-50 mr-2 ${theme}`}
                name="search"
                value={userInfoSearches.search}
                onChange={(e) => {
                  setUserInfoSearches((pre) => ({
                    ...pre,
                    search: e.target.value,
                  }));
                  // setSearchQuery(e.target.value);
                }}
              /> */}
        {/* Date range selector */}
        {/* <DateRangeSelector
                className="w-50"
                name="range"
                value={userInfoSearches.range}
                onCallback={(value) =>
                  setUserInfoSearches((pre) => ({ ...pre, range: value }))
                }
              /> */}
        {/* </div>
          </div> */}

        {/* <div className="col-lg-7 col-md-12 mt-md-2 mt-lg-0 pr-md-0 pr-lg-3 select"> */}
        {/* <div className="row"> */}
        {/* <div className="col-4 pl-0"> */}
        {/* age duration selector */}
        {/* <select
                  className={`form-select select_field cursor  ${theme}`}
                  name="age"
                  value={userInfoSearches.age}
                  onChange={(e) =>
                    setUserInfoSearches((pre) => ({
                      ...pre,
                      age: e.target.value,
                    }))
                  }
                >
                  <option value="">
                    {(keywordTranslation && keywordTranslation["selectAge"]) ||
                      langKey.selectAge}
                  </option>
                  {ages.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.age}
                    </option>
                  ))}
                </select> */}
        {/* </div> */}

        {/* <div className="col-3 pr-0"> */}
        {/* <div className="d-flex"> */}
        {/* <div className="w-100 mr-2">
                    <div className="h-29px">
                      <SearchableDropdown
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["selectFunction"]) ||
                          langKey.selectFunction
                        }
                        selectedValue={userInfo?.function?.id}
                        options={functionsList}
                        changeHandler={(value) =>
                          setUserInfoSearches((pre) => ({
                            ...pre,
                            functionId: value,
                          }))
                        }
                      />
                    </div>
                  </div> */}

        {/* {userIds.length ? (
                    <img
                      src={binAsset}
                      alt=""
                      className="mr-2"
                      onClick={() => deleteUserModalHandler(null)}
                    />
                  ) : null} */}

        {/* <div className="filter cursor">
                    <img
                      src={openMoreFilters ? filterActiveAsset : filterAsset}
                      width="30px"
                      height="30px"
                      alt="filter"
                      className="filtersIcons"
                      onClick={() => setOpenMoreFilters(!openMoreFilters)}
                    />
                  </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* <div className="col-3 pr-0">
                <div className="h-29px">
                  <SearchableDropdown
                    placeholder="Select Role"
                    options={roleList}
                    changeHandler={(value) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        roleId: value,
                      }))
                    }
                  />
                </div>
              </div> */}

        {/* <div className="col-3 pr-0">
                <div className="h-29px">
                  <select
                    name="status"
                    value={userInfoSearches?.status}
                    onChange={(e) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        type: e.target.value,
                      }))
                    }
                    className={`form-select select_field cursor fs-12 w-100 ml-0 ${theme}`}
                  >
                    <option value="">
                      {(keywordTranslation &&
                        keywordTranslation["selectType"]) ||
                        langKey.selectType}
                    </option>
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                  </select>
                </div>
              </div> */}

        {/* <div className="col-3">
                <div className="h-29px">
                  <select
                    name="status"
                    value={userInfoSearches?.status}
                    onChange={(e) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        status: e.target.value,
                      }))
                    }
                    className={`form-select select_field cursor fs-12 w-100 ml-0 ${theme}`}
                  >
                    <option value="">
                      {(keywordTranslation &&
                        keywordTranslation["selectStatus"]) ||
                        langKey.selectStatus}
                    </option>
                    {userStatus.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* {openMoreFilters && (
            <div className="row mt-3 align-items-center filter_dive">
              <div className="col-lg-2 col-md-4 mb-md-2 mb-lg-0 pl-0">
                <div className="h-29px">
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["selectDepartment"]) ||
                      langKey.selectDepartment
                    }
                    selectedValue={userInfo?.department?.id}
                    options={departmentsList}
                    changeHandler={(value) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        departmentId: value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-2 col-md-4 mb-md-2 mb-lg-0 pl-0">
                <div className="h-29px">
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["selectUser"]) ||
                      langKey.selectUser
                    }
                    selectedValue={userInfoSearches.userId}
                    options={userDropDownList}
                    changeHandler={(value) =>
                      setUserInfoSearches((pre) => ({ ...pre, userId: value }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-2 col-md-4 mb-md-2 mb-lg-0 pl-0">
                <div className="h-29px">
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation &&
                        keywordTranslation["selectReportTo"]) ||
                      langKey.selectReportTo
                    }
                    options={reportToList}
                    selectedValue={userInfoSearches.managerId || 0}
                    changeHandler={(value) =>
                      setUserInfoSearches((pre) => ({
                        ...pre,
                        managerId: value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-2 col-md-4 mb-md-2 mb-lg-0 pl-0">
                <select
                  name="status"
                  value={userInfoSearches?.status}
                  onChange={(e) =>
                    setUserInfoSearches((pre) => ({
                      ...pre,
                      status: e.target.value,
                    }))
                  }
                  className={`form-select select_field cursor fs-12 w-100 ml-0 ${theme}`}
                >
                  <option value="">
                    {(keywordTranslation &&
                      keywordTranslation["selectStatus"]) ||
                      langKey.selectStatus}
                  </option>
                  {userStatus.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-4 col-md-4 mb-md-2 mb-lg-0 text-initial">
                <button
                  className="clear_filters cursor fs-12 ml-5"
                  onClick={resetFilterHandler}
                >
                  {(keywordTranslation && keywordTranslation["clearFilters"]) ||
                    langKey.clearFilters}
                </button>
              </div>
            </div>
          )} */}

        <div>
          <TableComponent tableTitle={tableTitle}>
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
                                usersData?.length &&
                                usersData.length === userIds.length
                              }
                            />
                          </div>
                        </th>
                      )
                    ) : name === langKey.setting ? (
                      <th scope="col" key={id}>
                        <div className="last-th">
                          <p className="fs-12" style={{ marginRight: "18px" }}>
                            Action
                          </p>
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
              {usersData?.length ? (
                usersData.map((data, index) => {
                  const date = moment(data.created_at).format("MMM DD, hh:mm");
                  const userAdded = isIdAdded(data.id);
                  return (
                    <tr key={index}>
                      {tableTitle[0].status && (
                        <td>
                          <input
                            type="checkbox"
                            id={index}
                            value={data.id}
                            onChange={checkBoxHandler}
                            checked={userAdded}
                          />
                        </td>
                      )}

                      {tableTitle[1].status && (
                        <td>{index + usersList?.data?.users?.from}</td>
                      )}

                      {tableTitle[2].status && (
                        <td>
                          {data?.first_name || data?.last_name ? (
                            <div className="d-flex align-items-center">
                              <ModalImage
                                small={
                                  data?.profile_photo || contactpersonAsset
                                }
                                large={
                                  data?.profile_photo || contactpersonAsset
                                }
                                alt=""
                                hideDownload="true"
                                hideZoom="true"
                                className="setImgSizeTableUser rounded-circle"
                                imageBackgroundColor="transparent"
                              />

                              {showFirstName === index ? (
                                <input
                                  type="text"
                                  value={hideFirstName}
                                  style={{ width: "115px" }}
                                  name="fname"
                                  className="typetext ml-1 form-control"
                                  placeholder="Blaise"
                                  onChange={(e) =>
                                    setHideFirstName(e.target.value)
                                  }
                                  onBlur={(e) =>
                                    onBlurFnameHandler(e, data, index)
                                  }
                                  onKeyPress={(e) =>
                                    e.key === "Enter" &&
                                    keyPressEditFnameHandler(e, data, index)
                                  }
                                />
                              ) : (
                                <span className="ml-1">{data?.first_name}</span>
                              )}

                              <img
                                src={editRedIconAsset}
                                className="cursor ml-1"
                                width="12px"
                                height="12px"
                                onClick={() =>
                                  editFirstNameHandler(data, index)
                                }
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
                                <span className="ml-1">{data?.last_name}</span>
                              )}

                              <img
                                src={editRedIconAsset}
                                className="cursor ml-1"
                                width="12px"
                                height="12px"
                                onClick={() => editLastNameHandler(data, index)}
                              />

                              {updateUserAdvanceLoading &&
                                showFirstName === index && (
                                  <img
                                    src={loaderAsset}
                                    width="35px"
                                    height="35px"
                                  />
                                )}

                              {updateUserAdvanceLoading &&
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

                      {/* {tableTitle[3].status && <td>{data?.age || "—"}</td>} */}

                      {tableTitle[3].status && (
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              {showFuncDropdown === index ? (
                                <div className="advanceViewDropDown">
                                  <SearchableDropdown
                                    placeholder="Select Function"
                                    options={functionsList}
                                    selectedValue={data?.function?.id}
                                    changeHandler={(value) =>
                                      funcApiHandler(value, data)
                                    }
                                  />
                                </div>
                              ) : (
                                <div>{data?.function?.name}</div>
                              )}
                            </div>

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editFunctionHandler(index)}
                            />

                            {updateUserAdvanceLoading &&
                              showFuncDropdown === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}
                          </div>
                        </td>
                      )}

                      {/* {tableTitle[4].status && (
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                {showDeptDropdown === index ? (
                                  <div className="advanceViewDropDown">
                                    <SearchableDropdown
                                      placeholder="Select Department"
                                      options={departmentsList}
                                      selectedValue={data?.department?.id}
                                      changeHandler={(value) =>
                                        deptApiHandler(value, data)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div>{data?.department?.name}</div>
                                )}
                              </div>

                              <img
                                src={editRedIconAsset}
                                className="cursor ml-1"
                                width="12px"
                                height="12px"
                                onClick={() => editDeptHandler(index)}
                              />

                              {updateUserAdvanceLoading &&
                                showDeptDropdown === index && (
                                  <img
                                    src={loaderAsset}
                                    width="35px"
                                    height="35px"
                                  />
                                )}
                            </div>
                          </td>
                        )} */}

                      {tableTitle[4].status && (
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              {showRoleDropdown === index ? (
                                <div className="advanceViewDropDown">
                                  <SearchableDropdown
                                    placeholder="Select Role"
                                    options={roleList}
                                    selectedValue={
                                      data?.user_role?.role_list?.id
                                    }
                                    changeHandler={(value) =>
                                      roleApiHandler(value, data)
                                    }
                                  />
                                </div>
                              ) : (
                                <div>{data?.user_role?.role_list?.name}</div>
                              )}
                            </div>

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editRoleHandler(index)}
                            />

                            {updateUserAdvanceLoading &&
                              showRoleDropdown === index && (
                                <img
                                  src={loaderAsset}
                                  width="35px"
                                  height="35px"
                                />
                              )}
                          </div>
                        </td>
                      )}

                      {/* {tableTitle[6].status && (
                          <td>{data?.company?.name || "—"}</td>
                        )} */}

                      {/* {tableTitle[7].status && (
                          <td>{data?.entity?.name || "—"}</td>
                        )} */}

                      {/* {tableTitle[4].status && (
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                {showManagerDropdown === index ? (
                                  <div className="advanceViewDropDown">
                                    <SearchableDropdown
                                      placeholder="Select Manager"
                                      options={managerList}
                                      selectedValue={data?.report_to?.id}
                                      changeHandler={(value) =>
                                        managerApiHandler(value, data)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {data?.report_to?.first_name}{" "}
                                    {data?.report_to?.last_name}
                                  </div>
                                )}
                              </div>

                              <img
                                src={editRedIconAsset}
                                className="cursor ml-1"
                                width="12px"
                                height="12px"
                                onClick={() => editManagerHandler(index)}
                              />

                              {updateUserAdvanceLoading &&
                                showManagerDropdown === index && (
                                  <img
                                    src={loaderAsset}
                                    width="35px"
                                    height="35px"
                                  />
                                )}
                            </div>
                          </td>
                        )} */}

                      {tableTitle[5].status && (
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              {showPhone === index ? (
                                <div style={{ width: "100px" }}>
                                  <InputMasks
                                    mask="99/99/9999"
                                    value={phone || data?.phone_number}
                                    onChange={(e) =>
                                      keyPressEditPhoneHandler(e, data)
                                    }
                                  >
                                    <input
                                      type="number"
                                      className="typetext mr-2 form-control"
                                      placeholder="+32 0 000 00 00"
                                    />
                                  </InputMasks>
                                </div>
                              ) : (
                                <p className="phone_number m-0">
                                  {data?.phone_number &&
                                  data?.phone_number !== "null" &&
                                  data?.phone_number !== "undefined"
                                    ? data?.phone_number
                                    : ""}
                                </p>
                              )}
                            </div>

                            <img
                              src={editRedIconAsset}
                              className="cursor ml-1"
                              width="12px"
                              height="12px"
                              onClick={() => editPhoneHandler(index)}
                            />
                          </div>
                        </td>
                      )}
                      {tableTitle[6].status && (
                        <td>
                          <p className="internal">
                            {data?.company?.company_type}
                          </p>
                          {/* <p className="external">External</p> */}
                        </td>
                      )}
                      {tableTitle[7].status && (
                        <td>
                          <img
                            src={viewblueAsset}
                            width="16.87px"
                            height="12.38px"
                            className="pointer"
                            onClick={(e) => handleShowQR(data?.qr_code)}
                          />
                        </td>
                      )}

                      {/* {tableTitle[6].status && (
                          <td>
                            <p className="td_email m-0">{data?.email || "—"}</p>
                          </td>
                        )} */}
                      {tableTitle[8].status && <td>{date}</td>}
                      {tableTitle[9].status && (
                        <td>
                          {/* <div
                              className={
                                data?.status === 1
                                  ? "td_type"
                                  : "td_type_inactive"
                              }
                            >
                              <p className="m-0">
                                {data?.status === 1
                                  ? (keywordTranslation &&
                                      keywordTranslation["active"]) ||
                                    langKey.active
                                  : (keywordTranslation &&
                                      keywordTranslation["inActive"]) ||
                                    langKey.inActive}
                              </p>
                            </div> */}
                          <ToggleSlide
                            Class="Medium"
                            defaultChecked={data?.status}
                            onChangeHandler={() =>
                              updateUserStatusFunc(data.id, data?.status)
                            }
                          />
                        </td>
                      )}

                      <td>
                        <div className="last-td">
                          {user_delete && (
                            <img
                              src={deleteBlankAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              onClick={() => {
                                deleteUserModalHandler(data);
                              }}
                              className="pointer"
                            />
                          )}
                          {user_update && (
                            <img
                              src={editAsset}
                              alt=""
                              width="13px"
                              height="13px"
                              className="pointer"
                              onClick={() => editUserHandler(data)}
                            />
                          )}
                          {/* {data?.status !== 1 ? (
                              <img
                                src={activeIconAsset}
                                alt=""
                                width="10px"
                                height="7px"
                                className="pointer"
                                onClick={() => updateUserStatusFunc(data.id, 1)}
                              />
                            ) : (
                              <img
                                src={deactiveIconAsset}
                                alt=""
                                width="10px"
                                height="11.67px"
                                className="pointer"
                                onClick={() => updateUserStatusFunc(data.id, 0)}
                              />
                            )} */}
                          {/* <img
                            src={downloadgreenAsset}
                            width="12px"
                            height="13px"
                            className="pointer"
                          /> */}
                          <img
                            src={viewblueAsset}
                            width="16.87px"
                            height="12px"
                            className="pointer"
                            onClick={() => viewUserHandler(data)}
                          />
                        </div>

                        {/* {!userAdded && (
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
                                <p className="action fs-12">
                                  {(keywordTranslation &&
                                    keywordTranslation["action"]) ||
                                    langKey.action}
                                </p>

                                {data?.status !== 1 ? (
                                  <Dropdown.Item
                                    className="dropdown_items fs-12"
                                    onClick={() =>
                                      updateUserStatusFunc(data.id, 1)
                                    }
                                  >
                                    <img
                                      src={activeIconAsset}
                                      alt=""
                                      width="10px"
                                      height="7px"
                                    />
                                    &nbsp;&nbsp;
                                    {(keywordTranslation &&
                                      keywordTranslation["activate"]) ||
                                      langKey.activate}
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    className="dropdown_items fs-12"
                                    onClick={() =>
                                      updateUserStatusFunc(data.id, 0)
                                    }
                                  >
                                    <img
                                      src={deactiveIconAsset}
                                      alt=""
                                      width="10px"
                                      height="11.67px"
                                    />
                                    &nbsp;&nbsp;
                                    {(keywordTranslation &&
                                      keywordTranslation["deactivate"]) ||
                                      langKey.deactivate}
                                  </Dropdown.Item>
                                )}

                                {user_update && (
                                  <Dropdown.Item
                                    className="dropdown_items fs-12"
                                    onClick={() => editUserHandler(data)}
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

                                {user_delete && (
                                  <Dropdown.Item
                                    className="dropdown_items fs-12"
                                    onClick={() => {
                                      deleteUserModalHandler(data);
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
                  {isLoading ? (
                    <Loader colSpan="15" />
                  ) : (
                    <NoRecordFound colSpan="15" />
                  )}{" "}
                </>
              )}
            </tbody>
          </TableComponent>
        </div>
      </div>

      {pagination?.length && !search && (
        <Pagination
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

export default Users;
