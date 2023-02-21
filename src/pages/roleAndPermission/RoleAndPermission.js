import React, { useEffect, useState, useRef } from "react";
import "../../components/table/Table.css";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import "../../components/ResponsiveText.css";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import {
  useAddNewRoleMutation,
  useGetCompanyPermissionsMutation,
  useGivePermissionToRoleMutation,
  useRevokePermissionToRoleMutation,
  useGetCompaniesListQuery,
  useCompanyRolePermissionQuery,
  useGetOldRolesListQuery,
  usePermissionListingQuery,
} from "../../services/api";
import "./RoleAndPermission.css";
import Loader from "../../components/loader/Loader";
import SaveButton from "../../components/Button/Button";
import AlertComponent from "../../components/alert/Alert";
import checkPermission from "../../utils/checkPermissions";
import TableComponent from "../../components/table/Table";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import ToggleSwitch from "../../components/toggleswitch/ToggleSwitch";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import ModifyPermissionsModal from "./ModifyPermissionsModal";
import { ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } from "../../utils/constants";
import "../../components/detailCard/DetailCard.css";
import DetailCard from "../../components/detailCard/DetailCard";
import roleDetailCardsData from "./RoleAndPermissionData";
import SearchBar from "./../../components/SearchBar/SearchBar";
import { toast } from "react-toastify";
import RoleAndPermissionTabs from "./RoleAndPermissionTabs";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";
import validationsKey from "../../localization/validationsLocale.json";
import RoleAndPermissionELearnig from "./RoleAndPermissionELearnig";

const RoleAndPermission = () => {
  const searchquery = useSelector((state) => state.search?.searchedValue);

  const userInfo = useSelector((state) => state.auth?.userDetail?.user);
  const [roleName, setRoleName] = useState("");
  const [
    permissionsStateForLocalInteractivity,
    setPermissionsStateForLocalInteractivity,
  ] = useState([]);
  const [status, setStatus] = useState("active");
  const [companyId, setCompanyId] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [roleCompanyId, setRoleCompanyId] = useState("");
  const [showPermissionRole, setShowPermissionRole] = useState(true);
  const [selectAllPermission, setSelectAllPermission] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [companyPermissionList, setCompanyPermissionList] = useState([]);

  const { data: permissions } = usePermissionListingQuery();
  const permissionData = permissions?.data?.getPermission?.data ?? [];

  // const [toggleChange, setToggleChange] = useState(false);
  // const [tempId, settempId] = useState();
  // const [toggleIDs, setToggleIDs] = useState([]);
  //let perm = []
  // const role_create = checkPermission(ROLE_CREATE);
  // const role_delete = checkPermission(ROLE_DELETE);
  // const role_update = checkPermission(ROLE_UPDATE);
  const [searchInput, setSearchInput] = useState("");

  const [validationError, setValidationError] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [permissionsModal, setPermissionsModal] = useState(false);
  const toggleElements = useRef(new Array());
  const toggleElements2 = useRef(new Array());
  const currentUser = useSelector((user) => user.auth.userDetail.user);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const theme = useSelector((state) => state.ui.theme);

  const [addNewRole, { isLoading, isError, isSuccess, reset, error }] =
    useAddNewRoleMutation();

  const [
    givePermissionToRole,
    {
      isLoading: givePermissionLoading,
      isError: givePermissionError,
      isSuccess: givePermissionSuccess,
      reset: givePermissionReset,
    },
  ] = useGivePermissionToRoleMutation();

  const [
    revokePermissionToRole,
    {
      isLoading: revokePermissionLoading,
      isError: revokePermissionError,
      isSuccess: revokePermissionSuccess,
      reset: revokePermissionReset,
    },
  ] = useRevokePermissionToRoleMutation();

  const {
    data: companyRolePermissionList,
    isLoading: companyRolePermissionLoading,
    isFetching: companyRolePermissionFetching,
    isError: companyRolePermissionError,
    refetch: companyRolePermissionRefetch,
  } = useCompanyRolePermissionQuery(companyId || userInfo?.company_id);

  const {
    data: rolePermissionList,
    isLoading: rolePermissionLoading,
    isFetching: rolePermissionFetching,
    isError: rolePermissionError,
  } = useGetOldRolesListQuery();

  useEffect(() => {
    companyRolePermissionRefetch();
  }, []);



  useEffect(() => {
    if (userInfo?.company_id) {
      getPermissions(userInfo?.company_id);
    }
  }, [userInfo?.company_id]);

  const rolesInfo = rolePermissionList?.data;

  let header = [{ name: "Web premissions", field: "title" }];
  companyRolePermissionList?.data[0]?.role?.forEach((element) => {
    header.push({ name: element.name, field: element.name, id: element.id });
  });

  // useEffect(() => {
  //   setToggleIDs([]);
  //   let arr = [];
  //   if (showPermissionRole && header?.length)
  //     header.map((item, index) => {
  //       if (item?.id !== undefined) {
  //         arr.push({ id: item.id, state: false });
  //       }
  //     });
  //   const ids = arr.map((o) => o.id);
  //   const filtered = arr.filter(
  //     ({ id }, index) => !ids.includes(id, index + 1)
  //   );
  //   setToggleIDs(filtered);
  // }, [header]);
  //here
  // useEffect(() => {
  //   const ids = toggleIDs.map((o) => o.id);
  //   const filtered = toggleIDs.filter(
  //     ({ id }, index) => !ids.includes(id, index + 1)
  //   );
  // }, [toggleIDs]);

  useEffect(() => {
    let data = [];
    companyPermissionList?.forEach((element) => {
      element?.permission?.forEach((element) => {
        let obj = { ...element };
        companyRolePermissionList?.data[0]?.role?.forEach((element) => {
          let role_element = toggleElements2.current.find(
            (a) => a.getAttribute("item_id") == element.id
          );

          if (role_element != -1) {
            let select_all_toggle =
              element.permissions.findIndex((a) => a.id == obj.id) == -1
                ? false
                : true;

            if (select_all_toggle) {
              role_element.checked = 1;
            }
          }

          obj[element.name] =
            element.permissions.findIndex((a) => a.id == obj.id) == -1
              ? false
              : true;
        });
        data.push(obj);
      });
    });
    setPermissionsStateForLocalInteractivity([...data]);
    setPermissionsModal(false);
  }, [companyPermissionList, companyRolePermissionList]);

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

  const addNewRoleFunc = () => {
    const data = {
      name: roleName,
      status: status,
      company_id: roleCompanyId || userInfo?.company_id,
    };
    addNewRole(data)
      .unwrap()
      .then((payload) => {
        if (payload.data === "error") {
          toast.error(
            (keywordTranslation && keywordTranslation["roleNameExits"]) ||
            validationsKey.roleNameExits,
            { toastId: "" }
          );
        } else if (payload.code == 201) {
          toast.success(
            (keywordTranslation && keywordTranslation["roleCreatedSuccess"]) ||
            successMsg.roleCreatedSuccess,
            { toastId: "" }
          );
          setModalShow(false);
          setRoleName("");
          // setCompanyId(null);
        }
      })
      .catch((error) => {
        setModalShow(false);
        setRoleName("");
        setCompanyId(null);
      });
  };
  // const updateState = () => {
  //   let row = [...toggleIDs];
  //   row[tempId].state = true;
  //   setToggleIDs(row);
  //   // setDatas(newArr);
  // };
  const givePermission = (roleId, permission) => {
    const data = { role_id: roleId, permission_ids: permission };
    givePermissionToRole({ data })
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["givePermission"]) ||
          successMsg.givePermission,
          { toastId: "" }
        );
      })
      .catch((error) => { });
  };
  const addElement = (element) => {
    if (element != null) {
      toggleElements.current.push(element);
    }
  };
  const addElement2 = (element) => {
    if (element != null) {
      toggleElements2.current.push(element);
    }
  };

  const revokePermission = (roleId, permission) => {
    const data = { role_id: roleId, permission_ids: permission };
    revokePermissionToRole({ data })
      .unwrap()
      .then((payload) => {
        toast.success(
          (keywordTranslation && keywordTranslation["revokePermission"]) ||
          successMsg.revokePermission,
          { toastId: "" }
        );
      })
      .catch((error) => { });
  };
  const getPermissions = (Id) => {
    const data = { companyId: Id };
    getCompanyPermissions(data)
      .unwrap()
      .then((payload) => {
        setCompanyPermissionList(payload?.data?.getPermission?.data);
      })
      .catch((error) => { });
  };

  const validationsHandler = () => {
    setValidationError(false);
    setCompanyError("");
    if (!roleName) {
      setValidationError((prev) => !prev);
    } else if (currentUser?.role[0] === "main_admin" && !roleCompanyId) {
      if (roleName) {
        setValidationError(false);
      }
      setCompanyError(
        (keywordTranslation && keywordTranslation["companyRequired"]) ||
        validationsKey.companyRequired
      );
    } else {
      addNewRoleFunc();
    }
  };

  const mutatePermissionLocallay = (permissionsIndex, role) => {
    let localPermissions = permissionsStateForLocalInteractivity;
    localPermissions[permissionsIndex][role] =
      !localPermissions[permissionsIndex][role];
    setPermissionsStateForLocalInteractivity([...localPermissions]);
  };

  const role_create = checkPermission("role_create");
  const role_delete = checkPermission("role_delete");
  const role_update = checkPermission("role_update");

  let cardData = [
    rolesInfo?.total_role,
    rolesInfo?.active,
    rolesInfo?.inactive,
    rolesInfo?.top_use_role[0]?.name,
  ];

  const openDropdownHandler = () => {
    setModalShow(true);
    setCompanyError("");
    setValidationError(false);
  };

  const toggleHandler = (e, index, item, item1) => {
    let is_checked = Number(e.target.checked);
    if (is_checked == 1) {
      mutatePermissionLocallay(index, item.field);
      givePermission(item.id, [item1.id]);
    } else {
      mutatePermissionLocallay(index, item.field);
      revokePermission(item.id, [item1.id]);
    }
  };

  // useEffect(() => {
  //   companyRolePermissionRefetch();
  // }, [companyRolePermissionList]);

  
  useEffect(() => {
    companyRolePermissionRefetch();
  }, [companyList]);

  // function localSearchTableFunction(filter) {
  //   setSearchInput(filter);
  //   var input, table, tr, td, i, txtValue;
  //   // input = document.getElementById("localSearchInput");
  //   // filter = input.value.toUpperCase();
  //   table = document.getElementById("localSearchTable");
  //   tr = table.getElementsByTagName("tr");

  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[0];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }

  function localSearchTableFunction(filter) {
    setSearchInput(filter);

    var nodes = document.getElementsByClassName("mainGroup");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }

  useEffect(() => {
    var nodes = document.getElementsByClassName("mainGroup");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(searchquery)) {
        nodes[i].style.display = "";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }, [searchquery]);

  return (
    <>
      <div className="sideMargin mt-4">
        <div className="row align-items-center">
          <div className="col-6">
            <p className="tableheading mb-0">
              {(keywordTranslation && keywordTranslation["manageRolesPer"]) ||
                langKey.manageRolesPer}
            </p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <Dropdown className="role_dropdown">
              {role_create && (
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="navtab fontsize-12 pr-0"
                >
                  <SaveButton
                    buttonStyle="create_btn"
                    onClick={openDropdownHandler}
                    label={
                      (keywordTranslation && keywordTranslation["newRole"]) ||
                      langKey.newRole
                    }
                  />
                </Dropdown.Toggle>
              )}

              {modalShow && (
                // new role+++
                <Dropdown.Menu>
                  <div>
                    <label className="modalLabel ps-2 d-flex mb-1">
                      {(keywordTranslation && keywordTranslation["roleName"]) ||
                        langKey.roleName}
                    </label>
                    <div className="d-flex pr-3">
                      <input
                        type="text"
                        className="newrole_type fontsize-12 pl-2"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["typeHere"]) ||
                          langKey.typeHere
                        }
                        value={roleName}
                        onChange={(name) => setRoleName(name.target.value)}
                      />

                      <SaveButton
                        buttonStyle="create_btn"
                        label={
                          (keywordTranslation && keywordTranslation["save"]) ||
                          langKey.save
                        }
                        onClick={validationsHandler}
                        loading={isLoading}
                      />
                    </div>

                    {validationError && (
                      <ErrorViewer
                        message={
                          (keywordTranslation &&
                            keywordTranslation["roleRequired"]) ||
                          validationsKey.roleRequired
                        }
                        className="ml-2"
                      />
                    )}
                  </div>
                  <div className="mt-2 row ml-0 mr-0">
                    <div className="col-6">
                      <label className="modalLabel d-flex mb-1 ml-0">
                        {(keywordTranslation &&
                          keywordTranslation["company"]) ||
                          langKey.company}
                      </label>

                      <div className="h-29px">
                        <SearchableDropdown
                          placeholder={ userInfo?.company?.name  ||
                            (keywordTranslation &&
                              keywordTranslation["selectCompany"]) ||
                            langKey.selectCompany
                          }
                         

                          options={companyList}
                          selectedValue={roleCompanyId ?? companyId}
                          changeHandler={(value) => {
                            setRoleCompanyId(value);
                          }}
                        />
                      </div>
                      <>
                        {companyError && (
                          <ErrorViewer
                            message={companyError}
                            className="ml-2"
                          />
                        )}
                      </>
                    </div>

                    <div className="col-6">
                      <label className="modalLabel d-flex mb-1 ml-0">
                        {(keywordTranslation && keywordTranslation["status"]) ||
                          langKey.status}
                      </label>
                      <select
                        className="selectRoleStatus fontsize-12 form-select" style={{ borderRadius: "5px" }}
                        onChange={(option) => setStatus(option.target.value)}
                      >
                        <option value="active">
                          {(keywordTranslation &&
                            keywordTranslation["active"]) ||
                            langKey.active}
                        </option>
                        <option value="inactive">
                          {(keywordTranslation &&
                            keywordTranslation["inActive"]) ||
                            langKey.inActive}
                        </option>
                      </select>
                    </div>
                  </div>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </div>

        {/* <div className="row">
          {roleDetailCardsData.map((data, index) => (
            <DetailCard
              key={index}
              {...data}
              title={cardData[index]}
              columns="col-md-4 col-lg-3 mx-auto mt-4"
            />
          ))}
        </div> */}

        <div className="row mt-3">
          <div className="col-10">
            {/* SEARCH BOX */}
            <div className="mr-2" style={{ width: "225px" }}>
              {/* {companyId && */}
              {/* <SearchBar
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["searchPermission"]) ||
                  langKey.searchPermission
                }
                searchClass="languageSearchBar"
                searchId="localSearchInput"
                value={searchInput}
                onChange={(e) => localSearchTableFunction(e.target.value)}
              /> */}
              {/* // } */}
            </div>
          </div>

          <div className="col-2">
            <div className="userSelectableDropdown">
              <SearchableDropdown
                placeholder={ 
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companyList}
                selectedValue={companyId}
                changeHandler={(value) => {
                  if (
                    toggleElements != null &&
                    toggleElements.current.length > 0
                  ) {
                    toggleElements.current = [];
                  }
                  setPermissionsStateForLocalInteractivity([]);
                  setSelectedRoleId("");
                  setSelectAllPermission(false);
                  setShowPermissionRole(true);
                  setCompanyId(value);
                  getPermissions(parseInt(value));
                }}
              />
            </div>
          </div>
        </div>

        {permissionsModal && (
          <ModifyPermissionsModal
            deleteMessage={
              (keywordTranslation && keywordTranslation["youAreAboutTo"]) ||
              langKey.youAreAboutTo
            }
            closeHandler={revokePermissionReset}
            targetName={
              (keywordTranslation && keywordTranslation["Permissions"]) ||
              langKey.Permissions
            }
            show_del_msg={true}
            loading={
              revokePermissionLoading ||
              givePermissionLoading ||
              companyRolePermissionLoading
            }
            handleCloseDeleteModal={() => setPermissionsModal((pre) => !pre)}
            action={() => {
              let permit2 = [];
              let count = 0;
              if (selectedRoleId != "") {
                let permittedElements = [];
                let toggleCount = 0;
                toggleElements.current.forEach((elemitem, elem_index) => {
                  if (elemitem != null) {
                    if (
                      elemitem.getAttribute("customattrib") == selectedRoleId
                    ) {
                      permittedElements[toggleCount] = elemitem;
                      toggleCount += 1;
                    }
                  }
                });
                permittedElements.forEach((elemitem, elem_index) => {
                  if (elemitem != null) {
                    if (elemitem.checked == !selectAllPermission) {
                      permit2[count] =
                        permissionsStateForLocalInteractivity[elem_index].id;
                      elemitem.checked = selectAllPermission ? 1 : 0;
                      count += 1;
                    } else if (elemitem.checked == selectAllPermission) {
                    }
                  }
                });

                if (permit2.length > 0 && selectAllPermission) {
                  givePermission(selectedRoleId, permit2);
                } else if (permit2.length > 0 && !selectAllPermission) {
                  revokePermission(selectedRoleId, permit2);
                }
              }
            }}
          />
        )}

        <div className="customScrollbar rolePermissionTableHeight">
          <TableComponent tableId="localSearchTable">
            <thead>
              <tr>
                <th scope="col" style={{ display: "revert" }}>
                  {(keywordTranslation && keywordTranslation["Permissions"]) ||
                    langKey.Permissions}
                </th>
                {showPermissionRole && header?.length
                  ? header.map((item, index) => {
                    if (index > 0) {
                      return (
                        <th
                          scope="col"
                          className="permissionsStyle2"
                          key={index}
                          style={{ display: "revert" }}
                        >
                          {/* {toggleIDs?.map((val, id) => (
                              <>
                                {val.id == item.id ? (
                                  <div className="d-flex align-items-center justify-content-center">
                                  {item?.name.replace(/(^\w|\s\w)/g, (m) =>
                                    m.toUpperCase()
                                  )}
                                  &nbsp;
                                  <div style={{ marginTop: "-4px" }}>
                                    <ToggleSwitch
                                      Class="SmallLightBlue mr-2"
                                      itemid={item?.id}
                                      ref={(element) => addElement2(element)}
                                      // onClick={(e) => {
                                      //   let is_checked = Number(e.target.checked);

                                      //   setSelectedRoleId(item.id);

                                      //   setPermissionsModal((pre) => !pre);

                                      //   setSelectAllPermission(
                                      //     is_checked == 1 ? true : false
                                      //   );
                                      //   // if (is_checked == 1) {
                                      //   //   setPermissionsModal((pre) => !pre);
                                      //   // } else {
                                      //   //   setPermissionsModal((pre) => !pre);
                                      //   // }
                                      // }}

                                      checked={val.state}
                                      onChangeHandler={(e) => {
                                        // window.alert(toggleIDs);
                                        let is_checked = Number(
                                          e.target.checked
                                        );
                                        settempId(id);
                                        setSelectedRoleId(item.id);
                                        setSelectAllPermission(
                                          is_checked == 1 ? true : false
                                        );
                                        if (is_checked == 1) {
                                          setPermissionsModal((pre) => !pre);
                                        } else {
                                          setPermissionsModal((pre) => !pre);
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                                ) : null}
                              </>
                            ))} */}
                          <div className="d-flex align-items-center justify-content-center">
                            {item?.name.replace(/(^\w|\s\w)/g, (m) =>
                              m.toUpperCase()
                            )}
                            &nbsp;
                            <div style={{ marginTop: "-4px" }}>
                              <ToggleSwitch
                                Class="SmallLightBlue mr-2"
                                itemid={item?.id}
                                ref={(element) => addElement2(element)}
                                // onClick={(e) => {
                                //   let is_checked = Number(e.target.checked);

                                //   setSelectedRoleId(item.id);

                                //   setPermissionsModal((pre) => !pre);

                                //   setSelectAllPermission(
                                //     is_checked == 1 ? true : false
                                //   );
                                //   // if (is_checked == 1) {
                                //   //   setPermissionsModal((pre) => !pre);
                                //   // } else {
                                //   //   setPermissionsModal((pre) => !pre);
                                //   // }
                                // }}

                                // checked={true}
                                onChangeHandler={(e) => {
                                  // window.alert(toggleIDs);
                                  let is_checked = Number(e.target.checked);
                                  // settempId(id);
                                  setSelectedRoleId(item.id);
                                  setSelectAllPermission(
                                    is_checked == 1 ? true : false
                                  );
                                  if (is_checked == 1) {
                                    setPermissionsModal((pre) => !pre);
                                  } else {
                                    setPermissionsModal((pre) => !pre);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </th>
                      );
                    }
                  })
                  : null}
              </tr>
            </thead>
            <tbody>
              {permissionsStateForLocalInteractivity?.length ? (
                permissionsStateForLocalInteractivity?.map((item1, index) => {
                  return (
                    <tr key={index} className="mainGroup">
                      {showPermissionRole && header?.length
                        ? header.map((item, i) => {
                          if (i === 0) {
                            return (
                              <td
                                key={i}
                                className="permissionsStyle"
                                style={{ borderRight: "1px solid #F0F0F0" }}
                              >
                                {item1[item.field].replaceAll("_", " ")}
                              </td>
                            );
                          } else {
                            return (
                              <td key={i} className="permissionsStyle2" style={{ display: "revert" }}>
                                <ToggleSwitch
                                  Class="Small"
                                  customAttrib={item.id}
                                  ref={(element) => addElement(element)}
                                  checked={item1[item.field] ? 1 : 0}
                                  onChangeHandler={(e) =>
                                    toggleHandler(e, index, item, item1)
                                  }
                                  disabled={
                                    givePermissionLoading
                                      ? givePermissionLoading
                                      : revokePermissionLoading
                                  }
                                />
                              </td>
                            );
                          }
                        })
                        : null}
                    </tr>
                  );
                })
              ) : (
                <>
                  {companyListLoading ? (
                    <Loader className="trClass" />
                  ) : (
                    <NoRecordFound className="trClass" />
                  )}{" "}
                </>
              )}
            </tbody>
          </TableComponent>
        </div>
      </div>

      {/* <RoleAndPermissionELearnig /> */}
    </>
  );
};

export default RoleAndPermission;
