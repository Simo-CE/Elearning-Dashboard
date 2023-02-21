import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import "./SubContractor.css";
import Button from "../../components/Button/Button";
import TableComponent from "../../components/table/Table";
import Toggle from "../../components/ToggleSlide/ToggleSlide";
import {
  deleteBlankAsset,
  downloadgreenAsset,
  editAsset,
  pharmaAsset,
  profilePageAsset,
  purpleDownloadAsset,
  settingAsset,
  settingGreyAsset,
  viewblueAsset,
} from "../../assets";
import { useCreateCompanyMutation } from "../../services/api";
import { toast } from "react-toastify";
import AlertComponent from "../../components/alert/Alert";
import AddClientsModal from "../superClients/AddClientsModal";
import successMsg from "../../localization/successMsgLocale.json";
import langKey from "../../localization/locale.json";
import { useSelector } from "react-redux";
import TableSettingMenu from "../../components/TableSetting";

const SubContractor = () => {
  const [showClientsMangModal, setShowClientsMangModal] = useState(false);

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
        (keywordTranslation && keywordTranslation["subContractors"]) ||
        langKey.subContractors,
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

  const clientsModelHandler = useCallback(() => {
    setShowClientsMangModal((prev) => !prev);
  }, []);

  const createCompanyHandler = useCallback((data) => {
    createCompany({ data })
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "created" &&
            keywordTranslation &&
            keywordTranslation["subContractorCreatedSuccess"]) ||
          successMsg.subContractorCreatedSuccess;
        toast.success(msg);
        clientsModelHandler();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <>
      <div className="sideMargin">
        <div className="row mt-4">
          <div className="col-lg-12">
            <h3 className="fs-20 fw-500" style={{ color: "#7C7C7C" }}>
              {(keywordTranslation && keywordTranslation["manageSubCont"]) ||
                langKey.manageSubCont}
            </h3>
          </div>
          <div className="col-lg-12 mt-4">
            <div className="d-flex">
              <select
                name=""
                id=""
                className="statusDropdown"
                // onChange={(e) => setActiveStatus(e.target.value)}
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

              <div className="d-flex  gap-3 ml-auto align-items-center">
                <img src={deleteBlankAsset} alt="" width="16px" height="16px" />
                <Toggle className="Medium" />
                {/* <div className="d-flex gap-2">
                  <p className="fs-12 fw-500" style={{ color: "#8C2CAE" }}>
                    Export
                  </p>
                  <img
                    src={purpleDownloadAsset}
                    alt=""
                    width="12px"
                    height="13.5px"
                  />
                </div> */}
                <Button
                  label="Add New Sub-contractors"
                  buttonStyle="addnew_btn pl-2 pr-2"
                  onClick={clientsModelHandler}
                />
                {/* {showClientsMangModal && (
                  <AddClientsModal
                    modelHandler={clientsModelHandler}
                    action={createCompanyHandler}
                    isLoading={createCompanyLoading}
                    contractor="subContractor"
                  >
                    {createCompanyIsError && (
                      <AlertComponent
                        error={true}
                        message={createCompanyError.data.message}
                        closeHandler={createCompanyReset}
                      />
                    )}
                  </AddClientsModal>
                )} */}
              </div>
            </div>
          </div>
        </div>

        <TableComponent>
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
                            // onChange={allCheckboxHandler}
                            // checked={
                            //   companies?.length &&
                            //   companies?.length === Ids.length
                            // }
                          />
                        </div>
                      </th>
                    )
                  ) : name === langKey.setting ? (
                    <th scope="col" key={id}>
                      <div className="last-th">
                        <p className="fs-12" style={{ marginRight: "26px" }}>
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
                          {/* {name} */}
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

            {/* <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>SUB-CONTRACTOR</th>
              <th>CONTACT PERSON</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>DATE CREATION</th>
              <th>STATUS</th>
              <th>
                <div className="last-th">
                  <p className="fs-12 mr-4">ACTION</p>
                  <img src={settingGreyAsset} className="mr-3" alt="" />
                </div>
              </th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>21001</td>
              <td>
                <img src={pharmaAsset} alt="" />
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img
                    src={profilePageAsset}
                    className="rounded-circle"
                    alt=""
                    width="22px"
                    height="22px"
                  />
                  <p className="mb-0">Blaise Defloo</p>
                </div>
              </td>
              <td>+32 4 227 18 08</td>
              <td>info@ucbpharma.be</td>
              <td>10/05/2021 - 18:30</td>
              <td>
                <Toggle className="Medium" />
              </td>
              <td>
                <div className="d-flex gap-2">
                  <img src={deleteBlankAsset} alt="" />
                  <img src={editAsset} alt="" />
                  <img src={downloadgreenAsset} alt="" />
                  <img src={viewblueAsset} alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </TableComponent>
      </div>
    </>
  );
};

export default SubContractor;
