import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { userLogout } from "../../redux/authSlice";
import {
  useLogoutMutation,
  useLanguageDropDownQuery,
  useLanguageTranslationQuery,
} from "../../services/api";
import { updateLocalLanguage } from "../../redux/localizationSlice";
import { english } from "../../utils/localization";
import langKey from "../../localization/locale.json";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  USER_VIEW,
  ROLE_VIEW,
  ZONE_VIEW,
  FIELD_MANAGEMENT,
  CLIENT_VIEW,
  PROJECT_VIEW,
  COMPANY_VIEW,
  FUNCTION_VIEW,
  LANGUAGE_VIEW,
  DEPARTMENT_VIEW,
  PERMISSION_VIEW,
  COMPANY_OR_CLIENT_VIEW,
  INFORMATION_CATEGORY,
  INFORMATION_CLASSIFICATION,
  INFORMATION_STATUS,
  INFORMATION_TYPE,
  INFORMATION_SUBCATEGORY,
  INFORMATION_TAGS,
  COMPETENCE_SETTING_CATEGORY,
  COMPETENCE_SETTING_TOPICS,
  COMPETENCE_SETTING_CERTIFICATION,
  COMPETENCE_SETTING_DOCUMENT,
  SCAFFOLD_CATEGORY,
  SCAFFOLD_BRAND,
  SCAFFOLD_ELEMENT,
  LMRA,
  SITE_INSPECTION,
  COMPANY,
} from "../../utils/constants";
import {
  udAsset,
  udActiveAsset,
  rpAsset,
  rpActiveAsset,
  cspAsset,
  cspActiveAsset,
  infoAsset,
  infoActiveAsset,
  profileAsset,
  companyAsset,
  companyActiveAsset,
  appLogoClosedAsset,
  csAsset,
  csActiveAsset,
  localizationAsset,
  localizationActiveAsset,
  fieldActiveAsset,
  dbAsset,
  dbActiveAsset,
  obsAsset,
  obsActiveAsset,
  tbmActiveAsset,
  siAsset,
  siActiveAsset,
  lmraAsset,
  lmraActiveAsset,
  cmptAsset,
  cmptActiveAsset,
  scaffImgAsset,
  scaffActiveImgAsset,
  siteinpectionnonactiveAsset,
  siteinspectionactiveviewAsset,
  safetyAsset,
  sdactiveAsset,
  notificationAsset,
  englishAsset,
  profilePageAsset,
  contactpersonAsset,
  imenseLogoAsset,
  searchAsset,
  cartIconpinkAsset,
  notFoundAsset,
  flagIconAsset,
} from "./../../assets";
import Logo from "../Logo";
import "../ResponsiveText.css";
import PATHS from "./../../routes/paths";
import Line from "../../assets/manage-border.png";
import checkPermission from "../../utils/checkPermissions";
import checkPermission2 from "../../utils/checkPermissionss";

import { Dropdown } from "react-bootstrap";
import paths from "./../../routes/paths";
import { searchValue } from "../../redux/SearchCart";
import { DropdownButton } from "react-bootstrap";
import LockedModal from "../../pages/adminArea/tranings/LockedModal";

const Sidebar = ({ sideBarIsOpen, handleSideBar }) => {
  const [selectedLanguage, setLanguage] = useState(1);

  const user_view = checkPermission(USER_VIEW);
  //const site_view = checkPermission("site_view");
  const role_view = checkPermission(ROLE_VIEW);
  const zone_view = checkPermission(ZONE_VIEW);
  // const field_view = checkPermission("feild_view");
  const field_view = checkPermission(FIELD_MANAGEMENT);
  const client_view = checkPermission(CLIENT_VIEW);
  //const entity_view = checkPermission("entity_view");
  const project_view = checkPermission(PROJECT_VIEW);
  const company_view = checkPermission(COMPANY_VIEW);
  const function_view = checkPermission(FUNCTION_VIEW);
  const language_view = checkPermission(LANGUAGE_VIEW);
  const department_view = checkPermission(DEPARTMENT_VIEW);
  const permission_view = checkPermission(PERMISSION_VIEW);
  //const information_view = checkPermission("information_view");
  const company_or_client_view = checkPermission(COMPANY_OR_CLIENT_VIEW);
  //change
  const localSelectedLanguage = useSelector(
    (state) => state.localization.selectedLanguage,
    shallowEqual
  );

  const { defaultLanguageId } = useSelector(
    (state) => state.localization,
    shallowEqual
  );
  const handleSelect = (key) => {
    setLanguage(parseInt(key));
  };
  const entity_view = checkPermission2(COMPANY);
  const information_view =
    checkPermission2(INFORMATION_CATEGORY) ||
    checkPermission2(INFORMATION_CLASSIFICATION) ||
    checkPermission2(INFORMATION_STATUS) ||
    checkPermission2(INFORMATION_TYPE) ||
    checkPermission2(INFORMATION_SUBCATEGORY) ||
    checkPermission2(INFORMATION_TAGS);

  const competence_view =
    checkPermission2(COMPETENCE_SETTING_CATEGORY) ||
    checkPermission2(COMPETENCE_SETTING_TOPICS) ||
    checkPermission2(COMPETENCE_SETTING_CERTIFICATION) ||
    checkPermission2(COMPETENCE_SETTING_DOCUMENT);

  const scaffold_view =
    checkPermission2(SCAFFOLD_CATEGORY) ||
    checkPermission2(SCAFFOLD_BRAND) ||
    checkPermission2(SCAFFOLD_ELEMENT);

  const lmra_view = checkPermission2(LMRA);

  const site_inspection_view = checkPermission2(SITE_INSPECTION);

  //change

  const [searchedValue, setSearchedValue] = useState("");

  const theme = useSelector((state) => state.ui.theme);
  const cart = useSelector((state) => state.cart.cart);

  const main_admin = useSelector(
    (state) => state.auth?.userDetail?.user?.role[0]
  );

  const localLanguageKeywords = useSelector(
    (state) => state.localization?.selectedLanguage?.keywordTranslation
  );
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [logout] = useLogoutMutation();
  const location = useLocation();

  const currentUser = useSelector((state) => state.auth?.userDetail?.user);
  const logoutFunc = () => {
    logout()
      .unwrap()
      .then((payload) => {
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      })
      .catch((error) => {
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      })
      .finally(() => {
        dispatch(updateLocalLanguage(english));
        dispatch(userLogout(null));
        navigator(PATHS.signin);
      });
  };
  const More =
    ((department_view || function_view) && main_admin != "main_admin") ||
    (competence_view && main_admin != "main_admin");

  useEffect(() => {
    dispatch(searchValue(searchedValue));
  });

  const {
    data: selectedLanguageData,
    isLoading: languageLaoding,
    isFetching: languageFetching,
  } = useLanguageTranslationQuery(selectedLanguage);

  const isNotMasterAdmin = () => {
    return !currentUser?.role.includes("main_admin");
  };
  const { data: languages } = useLanguageDropDownQuery();
  useEffect(() => {
    if (localSelectedLanguage) {
      setLanguage(localSelectedLanguage.id);
    } else {
      setLanguage(languages[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedLanguageData?.data) {
      {
        dispatch(updateLocalLanguage(selectedLanguageData.data));
      }
    }
  }, [selectedLanguageData]);

  useEffect(() => {
    setLanguage(defaultLanguageId);
  }, [defaultLanguageId]);

  let flagIcon = (
    <img
      src={localSelectedLanguage?.flag_icon || notFoundAsset}
      alt=""
      className="mr-1"
      width="20px"
      height="20px"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = notFoundAsset;
      }}
    />
  );
  let languagesDrops = languages;

  let masterLangaugeDisplay = (
    <>
      {" "}
      {flagIcon} {localSelectedLanguage?.abbrevation}
    </>
  );

  let superLangaugeDisplay = (
    <>
      {" "}
      {!currentUser?.company?.flag_icon_status && flagIcon}{" "}
      {currentUser?.company?.language_abbrivation
        ? localSelectedLanguage?.abbrevation
        : localSelectedLanguage?.name}
    </>
  );

  const [Locked, setLocked] = useState(false);

  const handleLockModal = () => {
    setLocked((prev) => !prev);
  };

  return (
    <>
      {Locked && <LockedModal handleLockModal={handleLockModal} />}
      <Navbar bg="white" expand="xl">
        <Container fluid>
          <Navbar.Brand href="#" style={{ marginLeft: "35px" }}>
            <NavLink
              to={main_admin === "main_admin" ? paths.clients : paths.users}
            >
              <img src={imenseLogoAsset} width="150px" height="45px" alt="" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="bg-white"
            style={{ zIndex: "12" }}
          >
            <Nav
              className="me-auto my-2 my-lg-0 align-items-xl-center pl-md-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
              defaultActiveKey="/workerDashboard"
            >
              {location.pathname === "/dashboard/profile" ||
              location.pathname === "/dashboard/passedQuiz" ||
              location.pathname === "/dashboard/failedQuiz" ||
              location.pathname === "/dashboard/underReview" ||
              location.pathname === "/dashboard/localization" ||
              location.pathname === "/dashboard/competencesettings" ||
              location.pathname === "/dashboard/topics" ||
              location.pathname === "/dashboard/externalTraning" ||
              location.pathname === "/dashboard/requiredDocuments" ||
              location.pathname === "/dashboard/viewParticipant" ||
              location.pathname === "/dashboard/subContractor" ||
              location.pathname === "/dashboard/trueFalse" ||
              location.pathname === "/dashboard/singleAddNewTraning" ||
              location.pathname === "/dashboard/multipleAddNewTraning" ||
              location.pathname === "/dashboard/topics" ? null : (
                <Form className="d-flex position-relative">
                  <img
                    src={searchAsset}
                    width="15px"
                    height="15px"
                    alt=""
                    className="navSearchIcon"
                  />
                  <Form.Control
                    type="search"
                    placeholder={` ${
                      (localLanguageKeywords &&
                        localLanguageKeywords["search"]) ||
                      langKey.search
                    } ${
                      location.pathname === "/dashboard/roleandpermission"
                        ? (localLanguageKeywords &&
                            localLanguageKeywords["roleAndPermission"]) ||
                          langKey.roleAndPermission
                        : location.pathname?.split("/")[2]
                    } ...`}
                    className="searchField"
                    aria-label="Search"
                    value={searchedValue}
                    onChange={(e) => {
                      setSearchedValue(e.target.value);
                    }}
                  />
                </Form>
              )}
              {/* {main_admin !== "main_admin" && (
                <NavLink
                  to={PATHS.competence}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["Dashboard"]) ||
                        "Dashboard"}
                    </div>
                  )}
                </NavLink>
              )} */}
              {main_admin !== "main_admin" && (
                <Dropdown>
                  <Dropdown.Toggle
                    className="nav-link d-flex align-items-center"
                    data-toggle="tab"
                  >
                    {sideBarIsOpen && (
                      <div>
                        {(localLanguageKeywords &&
                          localLanguageKeywords["training"]) ||
                          langKey.training}
                      </div>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <NavLink
                        to={paths.tranings}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {(keywordTranslation &&
                          keywordTranslation["singleTraining"]) ||
                          langKey.singleTraining}
                      </NavLink>
                    </Dropdown.Item>

                    {/* <Dropdown.Item>
                      <NavLink
                        to={paths.traningSeries}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {(keywordTranslation &&
                          keywordTranslation["multipleTraining"]) ||
                          langKey.multipleTraining}
                      </NavLink>
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {main_admin !== "main_admin" && (
                <NavLink
                  to={PATHS.assignment}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["assignments"]) ||
                        langKey.assignments}
                    </div>
                  )}
                </NavLink>
              )}

              {user_view && main_admin != "main_admin" && (
                // <li className="nav-item">
                <NavLink
                  to={PATHS.users}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["Users"]) ||
                        langKey.users}
                    </div>
                  )}
                </NavLink>
                // </li>
              )}
              {/* <NavLink
                to={PATHS.workerDashboard}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Dashboard"]) ||
                      "Dashboard"}
                  </div>
                )}
              </NavLink> */}

              {company_or_client_view && (
                <NavLink
                  to={PATHS.clients}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["client"]) ||
                        langKey.client}
                    </div>
                  )}
                </NavLink>
                // </li>
              )}

              {/* {(permission_view || role_view) && main_admin === "main_admin" ? (
                <NavLink
                  to={PATHS.clients}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["Clients"]) ||
                        "Clients"}
                    </div>
                  )}
                </NavLink>
              ) : null} */}
              {/* {(permission_view || role_view) && main_admin === "main_admin" ? (
                <NavLink
                  to={PATHS.rolepermission}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["Roles & Permissions"]) ||
                        "Roles & Permissions"}
                    </div>
                  )}
                </NavLink>
              ) : null} */}

              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link d-flex align-items-center dropdownArrow"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["roleAndPermission"]) ||
                        langKey.roleAndPermission}
                    </div>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <NavLink
                      to={PATHS.rolepermission}
                      className="nav-link d-flex align-items-center"
                      data-toggle="tab"
                    >
                      {(localLanguageKeywords &&
                        localLanguageKeywords["roleAndPermission"]) ||
                        langKey.roleAndPermission}
                    </NavLink>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <NavLink
                      to={PATHS.role}
                      className="nav-link d-flex align-items-center"
                      data-toggle="tab"
                    >
                      {(keywordTranslation && keywordTranslation["roles"]) ||
                        langKey.roles}
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {(permission_view || role_view) && main_admin === "main_admin" ? (
                <NavLink
                  to={PATHS.Profile}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["profile"]) ||
                        langKey.profile}
                    </div>
                  )}
                </NavLink>
              ) : null}

              {language_view && main_admin === "main_admin" ? (
                <NavLink
                  to={PATHS.localization}
                  className="nav-link d-flex align-items-center"
                  data-toggle="tab"
                >
                  {sideBarIsOpen && (
                    <div>
                      {(localLanguageKeywords &&
                        localLanguageKeywords["languages"]) ||
                        langKey.languages}
                    </div>
                  )}
                </NavLink>
              ) : null}

              {/* <li className="nav-item">
            <NavLink
              to={PATHS.Profile}
              className="nav-link d-flex align-items-center"
              data-toggle="tab"
            >
              <img
                src={profileAsset}
                alt="icon"
                className="img-fluid sideBarImg activeImg"
              />
              <img
                src={profileAsset}
                alt="icon"
                style={{
                  display: "none",
                }}
                className="img-fluid sideBarImg nonActiveImg"
              />

              {sideBarIsOpen && (
                <div>
                  {(localLanguageKeywords &&
                    localLanguageKeywords["Profile"]) ||
                    "Profile"}
                </div>
              )}
            </NavLink>
          </li> */}

              {More && (
                <NavDropdown
                  title="More"
                  id="navbarScrollingDropdown"
                  className="moreDropdown"
                >
                  {/* <NavDropdown.Item>
                    {main_admin !== "main_admin" && (
                      <NavLink
                        to={paths.myTranings}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["My trainings"]) ||
                              "My trainings"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}

                  {/* <NavDropdown.Item>
                    {main_admin !== "main_admin" && (
                      <NavLink
                        to={paths.MySeries}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["My series"]) ||
                              "My series"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}

                  {/* <NavDropdown.Item>
                    {language_view && (
                      <NavLink
                        to={PATHS.fieldManagement}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["Field Management"]) ||
                              "Field Management"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}

                  <NavDropdown.Item>
                    {(permission_view || role_view) && (
                      <NavLink
                        to={PATHS.Profile}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["profile"]) ||
                              langKey.profile}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                    {(permission_view || role_view) && (
                      <NavLink
                        to={PATHS.rolepermission}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["Roles & Permissions"]) ||
                              "Roles & Permissions"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Item>
                    {main_admin !== "main_admin" && (
                      <NavLink
                        to={PATHS.emailTemplate}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["Email templates"]) ||
                              "Email templates"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}
                  {company_view && main_admin != "main_admin" && (
                    <NavDropdown.Item>
                      <NavLink
                        to={PATHS.companies}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["companies"]) ||
                              langKey.companies}
                          </div>
                        )}
                      </NavLink>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item>
                    {(department_view || function_view) &&
                      main_admin != "main_admin" && (
                        <NavLink
                          to={PATHS.department}
                          className="nav-link d-flex align-items-center"
                          data-toggle="tab"
                        >
                          {sideBarIsOpen && (
                            <div>
                              {(localLanguageKeywords &&
                                localLanguageKeywords["departments"]) ||
                                langKey.departments}
                            </div>
                          )}
                        </NavLink>
                      )}
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {(department_view || function_view) &&
                      main_admin != "main_admin" && (
                        <NavLink
                          to={PATHS.function}
                          className="nav-link d-flex align-items-center"
                          data-toggle="tab"
                        >
                          {sideBarIsOpen && (
                            <div>
                              {(localLanguageKeywords &&
                                localLanguageKeywords["functions"]) ||
                                langKey.functions}
                            </div>
                          )}
                        </NavLink>
                      )}
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                  {competence_view && main_admin != "main_admin" && (
                    // <li className="nav-item">
                    <NavLink
                      to={PATHS.competencesettings}
                      className="nav-link d-flex align-items-center"
                      data-toggle="tab"
                    >
                      {sideBarIsOpen && (
                        <div>
                          {(localLanguageKeywords &&
                            localLanguageKeywords["Competence settings"]) ||
                            "Competence Settings"}
                        </div>
                      )}
                    </NavLink>
                    // </li>
                  )}
                </NavDropdown.Item> */}
                  <NavDropdown.Item>
                    {competence_view && main_admin != "main_admin" && (
                      <NavLink
                        to={PATHS.competencesettings}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["categories"]) ||
                              langKey.categories}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {competence_view && main_admin != "main_admin" && (
                      <NavLink
                        to={PATHS.topics}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["topics"]) ||
                              langKey.topics}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {competence_view && main_admin != "main_admin" && (
                      <NavLink
                        to={PATHS.externalTraning}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["externalTrain"]) ||
                              langKey.externalTrain}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {competence_view && main_admin != "main_admin" && (
                      <NavLink
                        to={PATHS.requiredDocuments}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["requiredDocuments"]) ||
                              langKey.requiredDocuments}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item>

                  {/* <NavDropdown.Item>
                    {competence_view && main_admin != "main_admin" && (
                      <NavLink
                        to={PATHS.subContractor}
                        className="nav-link d-flex align-items-center"
                        data-toggle="tab"
                      >
                        {sideBarIsOpen && (
                          <div>
                            {(localLanguageKeywords &&
                              localLanguageKeywords["Sub Contractor"]) ||
                              "Sub Contractor"}
                          </div>
                        )}
                      </NavLink>
                    )}
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}

              {/* <NavLink
                to={PATHS.workerDashboard}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Dashboard"]) ||
                      "Dashboard"}
                  </div>
                )}
              </NavLink> */}

              {/* <NavLink
                to={PATHS.invoiceHistory}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Invoices"]) ||
                      "Invoices"}
                  </div>
                )}
              </NavLink> */}

              {/* <NavLink
                to={PATHS.tranings}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Trainings"]) ||
                      "Trainings"}
                  </div>
                )}
              </NavLink> */}

              {/* <NavLink
                to={PATHS.polices}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Polices"]) ||
                      "Polices"}
                  </div>
                )}
              </NavLink> */}
              {/* <NavLink
                to={PATHS.fieldManagement}
                className="nav-link d-flex align-items-center"
                data-toggle="tab"
              >
                {sideBarIsOpen && (
                  <div>
                    {(localLanguageKeywords &&
                      localLanguageKeywords["Fields Management"]) ||
                      "Fields Management"}
                  </div>
                )}
              </NavLink> */}
            </Nav>
            <div className="d-flex gap-3 pl-md-3">
              {/* <NavLink to={PATHS.checkout}>
                <div className="cartitems d-flex gap-2">
                  <img src={cartIconpinkAsset} width="22px" height="19px" alt="" />
                  <p className="fs-14 fw-500 mb-0" style={{ color: "#313131" }}>1</p>
                </div>
              </NavLink> */}

              {cart?.length !== 0 && (
                <NavLink to={paths.checkout}>
                  <div className="pinkCart">
                    <img src={cartIconpinkAsset} alt="" />
                    <p className="fs-14 fw-700 black">{cart?.length}</p>
                  </div>
                </NavLink>
              )}

              {/* <img src={notificationAsset} alt="" /> */}
              <DropdownButton
                id="dropdown-basic-button"
                className="floatRight langDropdown"
                onSelect={handleSelect}
                title={
                  languageFetching
                    ? "-"
                    : isNotMasterAdmin()
                    ? superLangaugeDisplay
                    : masterLangaugeDisplay
                }
              >
                {languagesDrops?.length ? (
                  languagesDrops.map((item, index) => {
                    return (
                      <Dropdown.Item key={index} eventKey={item.id}>
                        {isNotMasterAdmin() ? (
                          <>
                            <>
                              {" "}
                              {!currentUser?.company?.flag_icon_status && (
                                <img
                                  src={item?.flag_icon || notFoundAsset}
                                  alt=""
                                  className="mr-1"
                                  width="20px"
                                  height="20px"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = notFoundAsset;
                                  }}
                                />
                              )}{" "}
                            </>
                            <>
                              {" "}
                              {currentUser?.company?.language_abbrivation
                                ? item?.abbrevation
                                : item?.name}{" "}
                            </>
                          </>
                        ) : (
                          <>
                            <img
                              src={item?.flag_icon || notFoundAsset}
                              alt=""
                              className="mr-1"
                              width="20px"
                              height="20px"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFoundAsset;
                              }}
                            />
                            {item?.abbrevation}
                          </>
                        )}
                      </Dropdown.Item>
                    );
                  })
                ) : (
                  <p className="fs-12 fw-500">
                    {(keywordTranslation && keywordTranslation["noLanguage"]) ||
                      langKey.noLanguage}
                  </p>
                )}
              </DropdownButton>
            </div>
            <div className="dropdown">
              <button
                className="btn profileDropdown d-flex align-items-center dropdown-toggle dropdownArrowRemove "
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={currentUser?.profile_photo || contactpersonAsset}
                  alt=""
                  width="32px"
                  height="32px"
                  className="mr-2 rounded-circle"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = contactpersonAsset;
                  }}
                />
                <p className="mb-0  profileName text-capitalize">
                  {currentUser?.first_name + " " + currentUser?.last_name}
                </p>
              </button>
              <div
                className="dropdown-menu p-0 userProfileDropdown"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="profileInfo">
                  <a className="dropdown-item profileName text-capitalize">
                    {currentUser?.first_name + " " + currentUser?.last_name}
                  </a>
                  <a className="dropdown-item profileEmail">
                    {currentUser?.email}
                  </a>
                  <a
                    className="dropdown-item myProfile"
                    onClick={() => navigator(PATHS.Profile)}
                  >
                    {(keywordTranslation && keywordTranslation["myProfile"]) ||
                      langKey.myProfile}
                  </a>
                  <a
                    className="dropdown-item myProfile"
                    onClick={() => logoutFunc()}
                  >
                    {(keywordTranslation && keywordTranslation["logOut"]) ||
                      langKey.logOut}
                  </a>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
