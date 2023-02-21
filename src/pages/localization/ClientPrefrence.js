import React, { useState, useEffect } from "react";
import "./Localization.css";
import "../../components/ResponsiveText.css";
import { useSelector } from "react-redux";
import {
  settingAsset,
  englishAsset,
  arrowAsset,
  notFoundAsset,
  contactpersonAsset,
  settingGreyAsset,
} from "../../assets";
import AlertComponent from "../../components/alert/Alert";
import SearchBar from "../../components/SearchBar/SearchBar";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import TableComponent from "../../components/table/Table";
import ClientPrefrenceModal from "./ClientPrefrenceModal";
import PaginationComponent from "../../components/Pagination/Pagination";
import {
  useManagementCompanyListQuery,
  useUpdateClientPreferencesMutation,
} from "../../services/api";
import checkPermission from "../../utils/checkPermissions";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import LocalizationRouter from "./LocalizationRouter";
import { Dropdown } from "react-bootstrap";
import TableSettingMenu from "../../components/TableSetting";
import langKey from "../../localization/locale.json";
import successMsg from "../../localization/successMsgLocale.json";

const Localization = () => {
  const searchquery = useSelector((state) => state.search?.searchedValue);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [pageUrl, setPageUrl] = useState();
  // const [searchquery, setSearchQuery] = useState("");
  const [showClientPrefModal, setShowClientPrefModal] = useState(false);
  const [client, setClient] = useState({});
  const [showAllRecord, setShowAllRecord] = useState("");
  const [tableTitle, setTableTitle] = useState([
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
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["photo"]) || langKey.photo,
      elementStyle: "",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["languages"]) ||
        langKey.languages,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["defaultLanguage"]) ||
        langKey.defaultLanguage,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon",
    },
  ]);

  const prefModelHandler = (client = {}) => {
    setClient(client);
    setShowClientPrefModal((prev) => !prev);
  };

  const {
    data: managementCompanyList,
    isLoading: managementCompanyLoading,
    isFetching: managementCompanyFetching,
    isError: managementCompanyError,
    refetch,
  } = useManagementCompanyListQuery({
    url: pageUrl,
    params: {
      search: searchquery,
      per_page: showAllRecord == true ? "1000" : "10",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

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

  const clients = managementCompanyList?.data?.data;
  const pagination = managementCompanyList?.data?.links;
  const paginationCount = managementCompanyList?.data;

  const preferenceUpdateHandler = (data) => {
    updateClientPreferences({
      id: client.id,
      data: data,
    }).then((payload) => {
      toast.success(
        (keywordTranslation && keywordTranslation["prefrenUpdateSuccess"]) ||
        successMsg.prefrenUpdateSuccess
      );
      if (payload?.data?.status) {
        prefModelHandler();
      }
    });
  };

  // const searchHandlear = (e) => {
  //   setSearchQuery(e.target.value);
  //   setPageUrl("");
  // };

  const paginationClickHandler = (url) => {
    if (url) {
      setPageUrl(url);
    }
  };

  return (
    <>
      <LocalizationRouter />

      <div className="sideMargin">
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
                message={clientPreferenceError?.error}
                closeHandler={clientPreferenceReset}
              />
            )}
          </ClientPrefrenceModal>
        )}
        <div className="row mt-4">
          <div className="col-lg-12 col-md-12 d-flex">
            <h5 className="table_heading fs-16 mb-0">
              {(keywordTranslation &&
                keywordTranslation["clientPreferencesInfo"]) ||
                langKey.clientPreferencesInfo}
            </h5>
            {/* <div className="ml-auto w-25">
              <SearchBar
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["searchByClient"]) ||
                  langKey.searchByClient
                }
                searchClass="languageSearchBar"
                onChange={searchHandlear}
              />
            </div> */}
          </div>
        </div>

        <TableComponent showAllRecord={showAllRecord}>
          <thead>
            <tr>
              {tableTitle.map(({ id, name, status, icon, elementStyle }) => (
                <>
                  {name === langKey.setting ? (
                    <th scope="col" key={id}>
                      <div className="float-right">
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
            {clients?.length ? (
              clients.map((data, index) => {
                let defaultLanguage = data.languages.find(
                  (data) => data.default_lang
                );
                return (
                  <tr key={index}>
                    {tableTitle[0].status && (
                      <td className="pl-4">
                        {index + managementCompanyList.data.from}
                      </td>
                    )}

                    {tableTitle[1].status && (
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
                              width="30px"
                              height="30px"
                              className="rounded-circle mr-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = contactpersonAsset;
                              }}
                            />
                            <p className="m-0">
                              {data.super_admin?.first_name &&
                              data.super_admin?.last_name
                                ? data.super_admin?.first_name +
                                  " " +
                                  data.super_admin?.last_name
                                : "-"}
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}

                    {tableTitle[2].status && (
                      <td>
                        <img
                          src={data.logo || notFoundAsset}
                          alt=""
                          width="50px"
                          height="22px"
                          className="img-fluid"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = notFoundAsset;
                          }}
                        />
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>
                        <div
                          className={
                            data.status ? "active_status" : "td_type_inactive"
                          }
                        >
                          <p className="m-0">
                            {data.status
                              ? (keywordTranslation &&
                                  keywordTranslation["active"]) ||
                                langKey.active
                              : (keywordTranslation &&
                                  keywordTranslation["inActive"]) ||
                                langKey.inActive}
                          </p>
                        </div>
                      </td>
                    )}

                    {tableTitle[4].status && <td>{data.languages.length}</td>}

                    {tableTitle[5].status && (
                      <td>
                        {defaultLanguage?.name !== undefined ? (
                          <div className="d-flex align-items-center">
                            <img
                              src={defaultLanguage?.flag_icon || notFoundAsset}
                              alt=""
                              width="20px"
                              height="20px"
                              className="mr-2"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFoundAsset;
                              }}
                            />
                            <p className="m-0" style={{ width: "max-content" }}>
                              {" "}
                              {defaultLanguage?.name +
                                ` (${defaultLanguage?.abbrevation.toUpperCase()})`}
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}

                    <td className="pr-2">
                      <img
                        src={arrowAsset}
                        alt=""
                        width="6px"
                        onClick={() => prefModelHandler(data)}
                        className="float-right mr-2 cursor"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                {managementCompanyLoading ? (
                  <Loader colSpan="7" />
                ) : (
                  <NoRecordFound colSpan="7" />
                )}{" "}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
      {pagination?.length && !searchquery && (
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

export default Localization;
