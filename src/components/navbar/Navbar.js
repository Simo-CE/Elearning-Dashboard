import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import "../Theming.css";
import PATHS from "../../routes/paths";
import { userLogout } from "../../redux/authSlice";
import { navBarTheme } from "../../redux/uiSlice";
import contactpersonAsset from "../../assets/profile.png";
import {
  useLogoutMutation,
  useLanguageDropDownQuery,
  useLanguageTranslationQuery,
} from "../../services/api";
import { updateLocalLanguage } from "../../redux/localizationSlice";
import { english } from "../../utils/localization";
import { flagIconAsset, drkmoodAsset, belliconAsset } from "../../assets";

const Sidebar = ({ sideBarIsOpen, handleSideBar }) => {
  const [selectedLanguage, setLanguage] = useState();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [logout] = useLogoutMutation();

  const currentUser = useSelector((state) => state.auth?.userDetail?.user);
  const theme = useSelector((state) => state.ui.theme);
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

  const themeHandle = () => {
    let themeArray = ["darkMode", "lightMode"];
    let newTheme = themeArray.find((data) => data !== theme);
    dispatch(navBarTheme(newTheme));
  };

  const { data: languages } = useLanguageDropDownQuery();

  const {
    data: selectedLanguageData,
    isLoading: languageLaoding,
    isFetching: languageFetching,
  } = useLanguageTranslationQuery(selectedLanguage);
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

  const isNotMasterAdmin = () => {
    return !currentUser?.role.includes("main_admin");
  };

  let flagIcon = (
    <img
      src={localSelectedLanguage?.flag_icon || flagIconAsset}
      alt=""
      className="mr-1"
      width="20px"
      height="20px"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = flagIconAsset;
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
  ); //{currentUser?.comapny?.language_abbrivation ? localSelectedLanguage?.abbrevation : localSelectedLanguage?.name}
  return (
    <>
      {/* <Navbar bg="white" expand="lg" className={theme}> */}
      {/* <Container fluid> */}
      {/* {!sideBarIsOpen && (
            <div className="closeNavBtn mr-3" onClick={handleSideBar}>
              ☰
            </div>
          )} */}
      {/* <div>
            <p className="breadcrumbs">Observations - all</p>
            <p className="breadcrumbsDetail">Overview</p>
          </div> */}
      {/* <div className="ml-auto d-flex align-items-center">
            <img src={fontSize} alt="fontSize" className='mr-4' width="21px" height="30px" />
            <img
              src={drkmoodAsset}
              alt="darkmood"
              onClick={themeHandle}
              className="mr-4 darkModeImg"
              width="14px"
              height="14.93px"
            />

            <img
              src={belliconAsset}
              alt="bellicon"
              className="bellIconimg mr-4"
              width="15px"
              height="18.25px"
            />

            <DropdownButton
              id="dropdown-basic-button"
              className="floatRight langDropdown"
              onSelect={handleSelect}
              title={languageFetching ? '--' : (isNotMasterAdmin() ? superLangaugeDisplay : masterLangaugeDisplay)}
            >
              {languagesDrops?.length &&
                languagesDrops.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} eventKey={item.id}>
                      {isNotMasterAdmin() ? <>
                        <> {!currentUser?.company?.flag_icon_status && <img src={item?.flag_icon || flagIconAsset} alt="" className="mr-1" width="20px" height="20px" onError={(e) => { e.target.onerror = null; e.target.src = flagIconAsset }} />} </>
                        <> {currentUser?.company?.language_abbrivation ? item?.abbrevation : item?.name} </>
                      </> : <>
                        <img src={item?.flag_icon || flagIconAsset} alt="" className="mr-1" width="20px" height="20px" onError={(e) => { e.target.onerror = null; e.target.src = flagIconAsset }} />
                        {item?.abbrevation}
                      </>
                      }
                    </Dropdown.Item>
                  );
                })
              }
            </DropdownButton>

            <div className="dropdown">
              <button className="btn profileDropdown d-flex align-items-center dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img
                  src={currentUser?.profile_photo || contactpersonAsset}
                  alt=""
                  width="20px"
                  height="20px"
                  className="mr-2 rounded-circle"
                  onError={(e) => { e.target.onerror = null; e.target.src = contactpersonAsset }}
                />
                <p className={`mb-0 text-dark profileName text-capitalize ${theme}`}>{currentUser?.first_name + ' ' + currentUser?.last_name}</p>
              </button>
              <div className="dropdown-menu p-0 userProfileDropdown" aria-labelledby="dropdownMenuButton">
                <div className="profileInfo">

                  <a className="dropdown-item profileName text-capitalize">{currentUser?.first_name + ' ' + currentUser?.last_name}</a>
                  <a className="dropdown-item profileEmail">{currentUser?.email}</a>
                  <a className="dropdown-item myProfile" onClick={() => navigator(PATHS.Profile)}>My Profile</a>
                  <a className="dropdown-item myProfile" onClick={() => logoutFunc()}>Logout</a>

                </div>
              </div>
            </div>

          </div> */}
      {/* </Container> */}
      {/* </Navbar> */}
    </>
  );
};

export default Sidebar;

// (<> <img src={localSelectedLanguage?.flag_icon || flagIconAsset} alt="" className="mr-1" width="20px" height="20px" onError={(e) => { e.target.onerror = null; e.target.src = flagIconAsset }} />{localSelectedLanguage?.abbrevation} </> || languagesDrops && languagesDrops[0].abbrevation)

{
  /* <> { !currentUser?.company?.flag_icon_status && <img src={item?.flag_icon || flagIconAsset} alt="" className="mr-2" width="20px" height="20px" onError={(e) => { e.target.onerror = null; e.target.src = flagIconAsset }} />  }</> */
}
