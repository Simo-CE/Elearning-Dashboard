import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../components/Model/Modal.css";
import { totalDepartmetsAsset } from "../../assets";
import Button from "../../components/Button/Button";
import ModelComponent from "../../components/Model/Model";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCompaniesListQuery } from "../../services/api";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const AddDepartmentModal = (props) => {
  const [deptErrors, setDeptErrors] = useState([]);
  const [inputFields, setInputFields] = useState([{ name: "" }]);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        name: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    let rows = [...inputFields];
    rows = rows.filter((data, dataIndex) => dataIndex != index);
    setInputFields([...rows]);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const validationSchema = Yup.object().shape({
    company_id: Yup.string().required((keywordTranslation && keywordTranslation["companyRequired"]) || validationsKey.companyRequired),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  
  const { company_id } = watch();
  const allTopicValues = watch();

  const onSubmit = (values = allTopicValues) => {

    let error = deptValidationHandler();
    if (!error) {
      if (props.data) {
        values["_method"] = props?.update ? "put" : "post";
      }
      let formData = new FormData();

      for (const field in values) {
        if (values[field]) { formData.append(field, values[field]) }
      }

      inputFields.forEach((data, index) => {
        formData.append(`name[${index}]`, data.name);
      });


      props.action(formData);
    }
  };

  useEffect(() => {
    if (props.data) {
      let { id, company_id, name } = props.data;

      setInputFields([
        {
          name,
        },
      ]);
      reset({ id, company_id });
    }
  }, []);

  const deptValidationHandler = () => {
    let errors = [];
    inputFields.forEach((data, index) => {
      if (!data.name) {
        errors.push(index);
      }
    });
    setDeptErrors([...errors]);
    return errors.length ? true : false;
  };

  const {
    data: companies,
    isLoading,
    isFetching,
    isError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id } });

  return (
    <>
      <ModelComponent
        size=""
        show={true}
        handleClose={props.handleCloseAddDepartmentModal}
        title={
          (keywordTranslation &&
            keywordTranslation[
            props?.update ? "editDepartment" : "addDepartment"
            ]) ||
          (props?.update
            ? langKey.editDepartment
            : langKey.addDepartment)
        }
      // icon={totalDepartmetsAsset}
      >
        {" "}
        {props?.children}
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-12">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["company"]) || langKey.company}
              </label>
              <br />

              <SearchableDropdown
                placeholder={(keywordTranslation && keywordTranslation["selectCompany"]) || langKey.selectCompany}
                options={companies}
                changeHandler={(value) => setValue("company_id", value)}
                selectedValue={props?.data ? props?.data?.company_id : company_id}
              />

              {errors.company_id && <ErrorViewer message={errors.company_id.message} />}
            </div>
            <div className="col-12 mt-2">
              <label className="modalLabel">
                {(keywordTranslation && keywordTranslation["department"]) || langKey.department}
              </label>
              <br />


              {inputFields.map((data, index) => {
                const { name } = data;
                return (
                  <div className="row" key={index}>
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <input
                          type="text"
                          onChange={(evnt) => handleChange(index, evnt)}
                          value={name}
                          name="name"
                          className="typetext pl-2 paddingRight"
                          placeholder={(keywordTranslation && keywordTranslation["department"]) || langKey.department}
                        />
                        {deptErrors.length && deptErrors.includes(index) ? (
                          <ErrorViewer message={(keywordTranslation && keywordTranslation["departmentRequired"]) || validationsKey.departmentRequired} />
                        ) : null}
                      </div>
                    </div>

                    <div className="col-12">
                      {inputFields.length > 1 ? (
                        <button
                          className="addMoreButton"
                          onClick={() => removeInputFields(index)}
                        >
                          {(keywordTranslation && keywordTranslation["remove"]) || langKey.remove}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="row">
                <div className="col-sm-12">
                  <button className="addMoreButton" onClick={addInputField}>
                    {(keywordTranslation && keywordTranslation["addMore"]) || langKey.addMore}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={(keywordTranslation && keywordTranslation["cancel"]) || langKey.cancel}
              buttonStyle="cancel mr-2"
              onClick={props.handleCloseAddDepartmentModal}
            />
            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props?.update ? "updatebtn" : "create"]) ||
                (props?.update
                  ? langKey.updatebtn
                  : langKey.create)
              }
              buttonStyle={props?.update ? "updateBtn" : "createbtn"}
              loading={props?.loading}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default AddDepartmentModal;
