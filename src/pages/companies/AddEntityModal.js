import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "../../components/Model/Modal.css";
import { companyiconAsset } from "../../assets";
import Button from "../../components/Button/Button";
import ModelComponent from "../../components/Model/Model";
import { useGetCompaniesListQuery } from "../../services/api";

const AddEntityModal = (props) => {
  const [chooseCompany, setChooseCompany] = useState();
  const [siteName, setSiteName] = useState("");
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const entityFunc = () => {
    const data = {
      company_id: chooseCompany,
      site_name: siteName,
    };

    props.action(data);
  };

  const company_Id = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const {
    data: companies,
    isLoading,
    isFetching,
    isError,
  } = useGetCompaniesListQuery({
    url: "",
    params: { search: "", company_id: chooseCompany },
  });

  const companiesData = companies?.data;

  useEffect(() => {
    setChooseCompany(company_Id);
  }, []);

  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleCloseAddEntityModal}
        title={
          (keywordTranslation && keywordTranslation["Add Entity"]) ||
          "Add Entity"
        }
        icon={companyiconAsset}
      >
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["COMPANY"]) ||
                  "COMPANY"}
              </label>
              <br />
              <select
                className="typetext mr-2"
                onChange={(option) =>
                  setChooseCompany(parseInt(option.target.value))
                }
              >
                <option>
                  {(keywordTranslation &&
                    keywordTranslation["Select company"]) ||
                    "Select company"}
                </option>
                {companiesData?.length &&
                  companiesData.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["ENTITY"]) ||
                  "ENTITY"}
              </label>
              <br />
              <input
                type="text"
                // {...register("entity")}
                className="typetext mr-2 form-control"
                placeholder={
                  (keywordTranslation && keywordTranslation["Site Name"]) ||
                  "Site Name"
                }
                value={siteName}
                onChange={(name) => setSiteName(name.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={
                (keywordTranslation && keywordTranslation["Cancel"]) || "Cancel"
              }
              buttonStyle="cancel mr-2"
              onClick={props.handleCloseAddEntityModal}
            />
            <Button
              label={
                (keywordTranslation && keywordTranslation["Create"]) || "Create"
              }
              buttonStyle="createbtn"
              onClick={() => {
                entityFunc();
                props.handleCloseAddEntityModal();
              }}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default AddEntityModal;
