import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useSelector } from 'react-redux';
import "./companies.css";
import {
  sortAsset,
  settingAsset,
  companyLogoAsset,
  actionAsset,
  delIconAsset,
  editIconAsset,
} from "../../assets";
import AddEntityModal from "./AddEntityModal";
import Button from "../../components/Button/Button";
import TableComponent from "../../components/table/Table";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Model/DeleteModal";
import {
  useGetEntitiesQuery,
  useCreateEntitiesMutation,
  useGetCompaniesListQuery,
} from "../../services/api";
import Loader from "../../components/loader/Loader";
import AlertComponent from "../../components/alert/Alert";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";

const Entities = () => {
  const [showAddEntityModal, setShowAddEntityModal] = useState(false);
  const [showDeleteEntityModal, setShowDeleteEntityModal] = useState(false);
  const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
  const [companyId, setCompanyId] = useState();
  const addAddEntityHandler = () => {
    setShowAddEntityModal((prev) => !prev);
  };

  const addDeleteEntityHandler = () => {
    setShowDeleteEntityModal((prev) => !prev);
  };

  const {
    data: entitiesList,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useGetEntitiesQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [
    createEntities,
    {
      isError: createEntitiesError,
      isSuccess: createEntitiesSuccess,
      reset: createEntitiesReset,
    },
  ] = useCreateEntitiesMutation();

  const createEntitiesFunc = (data) => {
    createEntities({ data })
      .unwrap()
      .then((payload) => {
        if (payload.status) {
          // setAlertMessage(payload.message);
        }
      })
      .catch((error) => {
      });
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: '', params: { 'search': '' , company_id: companyId} });

  const companiesData = companies?.data;

  const entityData = entitiesList?.data?.data;

  const company_Id = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  useEffect(() => {
    setCompanyId(company_Id);
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="sideMargin">
          <div className="d-flex">
            {createEntitiesSuccess && (
              <AlertComponent
                message={keywordTranslation && keywordTranslation["Entity has been created successfully."] || "Entity has been created successfully."}
                closeHandler={createEntitiesReset}
              />
            )}
            <div style={{ width: "250px" }}>
              <SearchBar
                placeholder={keywordTranslation && keywordTranslation["Search by id, company, site ..."] || "Search by id, company, site ..."}
                searchClass="languageSearchBar"
              />
            </div>

            <div className="col-lg-2 col-md-3 pl-0">
              <SearchableDropdown
                placeholder="Select Company"
                options={companies}
                changeHandler={(value) => setCompanyId(value)}
              />
            </div>

            <select
              className="select_field cursor ml-2"
              style={{ width: "150px" }}
            >
              <option>{keywordTranslation && keywordTranslation["Select company"] || "Select company"}</option>
              {companiesData?.length &&
                companiesData.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>

            <div className="ml-auto">
              <Button
                label={keywordTranslation && keywordTranslation["New entity +"] || "New entity +"}
                buttonStyle="create_btn"
                onClick={addAddEntityHandler}
              />
              {showAddEntityModal && (
                <AddEntityModal
                  handleCloseAddEntityModal={addAddEntityHandler}
                  action={createEntitiesFunc}
                />
              )}
            </div>
          </div>

          <TableComponent>
            <thead>
              <tr>
                <th>
                  <input type="checkbox"
                    style={{ marginTop: "5px" }}
                  />
                </th>
                <th scope="col">{keywordTranslation && keywordTranslation["ID"] || "ID"}</th>
                <th scope="col">
                  {keywordTranslation && keywordTranslation["Date"] || "Date"} 
                  {/* <img src={sortAsset} alt="" width="5px" height="6.67px" /> */}
                </th>
                <th scope="col">{keywordTranslation && keywordTranslation["Entities"] || "Entities"}</th>
                <th scope="col">{keywordTranslation && keywordTranslation["Logo"] || "Logo"}</th>
                <th scope="col">{keywordTranslation && keywordTranslation["Company"] || "Company"}</th>
                {/* <th scope="col">
                <img src={settingAsset} alt="" className="float-right mr-1" />
              </th> */}
              </tr>
            </thead>
            <tbody>
              {entityData?.length
                ? entityData.map((data, index) => {
                  const date = moment(data.created_at).format("MMM DD, hh:mm");
                  const companyDetail = companiesData?.filter((value) => value.id == data.company_id);
                  return (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{index + 1}</td>
                      <td>{date}</td>
                      <td>{data.site_name}</td>
                      <td>
                        <img src={companyLogoAsset} alt="" onError={(e) => { e.target.onerror = null; e.target.src = companyLogoAsset }} />
                      </td>
                      <td>{companyDetail && companyDetail[0]?.name}</td>
                      {/* <td>
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
                            <p className="action">Action</p>
                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={addDeleteEntityHandler}
                            >
                              <img
                                src={delIconAsset}
                                alt=""
                                width="10px"
                                height="9.99px"
                              />
                              &nbsp;&nbsp;Delete
                            </Dropdown.Item>

                            {showDeleteEntityModal && (
                              <DeleteModal
                                deleteMessage="You are about to delete this entity"
                                targetName="name"
                                handleCloseDeleteModal={addDeleteEntityHandler}
                              />
                            )}

                            <Dropdown.Item
                              className="dropdown_items"
                              onClick={addAddEntityHandler}
                            >
                              <img
                                src={editIconAsset}
                                alt=""
                                width="12px"
                                height="12px"
                              />
                              &nbsp;&nbsp;Edit
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td> */}
                    </tr>
                  );
                })
                : <>{isLoading ? <Loader colSpan="7" /> : <NoRecordFound colSpan="7" />} </>}
            </tbody>
          </TableComponent>
        </div>
      </div>
    </>
  );
};

export default Entities;
