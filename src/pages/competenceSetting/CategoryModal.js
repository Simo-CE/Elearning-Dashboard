import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModelComponent from "../../components/Model/Model";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import {
  addtopicAsset,
  bin2Asset,
  notFoundAsset,
  uploadAsset,
} from "../../assets";
import ImageViewer from "../../components/ImageViewer";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import { useGetCompaniesListQuery } from "../../services/api";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const CategoryModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const [inputFields, setInputFields] = useState([{ name: "" }]);
  const [allErrors, setAllErrors] = useState([]);
  const [company_id, setCompanyId] = useState();
  // add new feild when click on Add more.
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
    rows = rows.filter((data, dataIndex) => dataIndex !== index);
    setInputFields([...rows]);
  };
  // handel when change input data
  const handleChange = (index, evnt, id) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    // list[index]["id"] = id ?? "";
    // setInputFields(list);
    // /////// setInputFields(pre=>([...pre,]))
    // const updateList = inputFields.filter((item, i) => {
    //   if (i === index) {
    //     item.name = value;
    //     return item;
    //   } else {
    //     return item;
    //   }
    // });
    setInputFields(list);
  };

  // const validationSchema = Yup.object().shape({
  //   company_id: Yup.string().required(
  //     (keywordTranslation && keywordTranslation["companyRequired"]) ||
  //       validationsKey.companyRequired
  //   ),
  // });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  let { image } = watch();

  const allTopicValues = watch();

  const topicValidationHandler = () => {
    let errors = [];
    inputFields.forEach((data, index) => {
      if (!data.name) {
        errors.push(index);
      }
    });
    setAllErrors([...errors]);
    return errors.length ? true : false;
  };

  const imageUploadHandler = (e, index, id) => {
    let { files } = e.target;
    const list = [...inputFields];
    list[index]["image"] = files[0];
    list[index]["id"] = id ?? "";
    setInputFields(list);
  };

  const imageRemoveHandler = (index, id) => {
    const list = [...inputFields];
    list[index]["image"] = null;
    list[index]["id"] = id ?? "";
    setInputFields(list);
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    refetch: companyRefetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id: company_id} });

  const onSubmit = (values = allTopicValues) => {
    let error = topicValidationHandler();
    if (!error) {
      if (typeof image === "string") {
        let { image, ...rest } = values;
        values = { ...rest };
      }

      let formData = new FormData();

      if (props.data) {
        values["_method"] = "put";
        // formData.append(`id[0]`,props?.data.id);
      }

      for (const field in values) {
        if (values[field]) {
          formData.append(field, values[field]);
        }
      }
      company_id && formData.append("company_id", company_id);

      inputFields.forEach((data, index) => {
        data.name && formData.append(`name[${index}]`, data.name);
        formData.append(`id[${index}]`, data.id ?? "");
        data.image
          ? formData.append(`image[${index}]`, data.image)
          : formData.append(`image[0]`, null);

        // if (typeof data.image !== "string") {
        // } else if (data.image && data.image === "null") {
        //   formData.append(`image[${index}]`, "image_delete");
        // }
        if (props?.data) {
          formData.append(`image[0]`, null);
        }
      });

      props.action(formData);
    }
  };

  useEffect(() => {
    setCompanyId(companyId);
    // set edit and update incoming props
    if (props.data) {
      let { id, name, image } = props.data;
      setInputFields([{ ...props.data }]);
      reset({
        company_id,
      });
    }
  }, []);

  useEffect(() => {
    companyRefetching();
  }, [props.handleCloseAddCategoryModal]);

  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleCloseAddCategoryModal}
        // icon={addtopicAsset}
        title={
          (keywordTranslation &&
            keywordTranslation[props.data ? "editCategory" : "addCategory"]) ||
          (props?.data ? langKey.editCategory : langKey.addCategory)
        }
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="row">
            <label className="modalLabel modalLabelDark">
              {(keywordTranslation && keywordTranslation["company"]) ||
                langKey.company}
            </label>

            <div className="col-12">
              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companies}
                changeHandler={(value) => setCompanyId(value)}
                selectedValue={
                  props?.data ? props?.data?.company_id : company_id
                }
              />

              {/* {errors.company_id && (
                <ErrorViewer message={errors.company_id.message} />
              )} */}
            </div>

            <div className="col-12 mt-2">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["category"]) ||
                  langKey.category}
              </label>
              <br />

              {inputFields.map((data, index) => {
                const { name, image, id } = data;
                return (
                  <div className="row" key={id}>
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={(evnt) => handleChange(index, evnt, id)}
                        value={name}
                        name="name"
                        className="typetext mr-2 form-control paddingRight"
                        placeholder="Safety"
                      />
                      {errors.name && (
                        <ErrorViewer message={errors.name.message} />
                      )}
                      <div className="upload_div_cs3">
                        {image && image !== "null" && (
                          <>
                            <ImageViewer
                              src={image || notFoundAsset}
                              alt=""
                              className="mr-2"
                              width="22px"
                              height="22px"
                            />
                            <img
                              src={bin2Asset}
                              alt=""
                              className="mr-2"
                              onClick={() => imageRemoveHandler(index, id)}
                            />
                          </>
                        )}
                        <img
                          src={uploadAsset}
                          alt=""
                          width="24px"
                          height="17px"
                        />
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          name="image"
                          className="typefile"
                          onInput={(e) => imageUploadHandler(e, index, id)}
                        />
                      </div>

                      {allErrors.length && allErrors.includes(index) ? (
                        <ErrorViewer
                          message={
                            (keywordTranslation &&
                              keywordTranslation["categoryRequired"]) ||
                            validationsKey.categoryRequired
                          }
                        />
                      ) : null}
                    </div>

                    <div className="col-12">
                      {inputFields.length > 1 ? (
                        <button
                          className="addMoreButton mb-2"
                          onClick={() => removeInputFields(index)}
                        >
                          {(keywordTranslation &&
                            keywordTranslation["remove"]) ||
                            langKey.remove}
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
                    {(keywordTranslation && keywordTranslation["addMore"]) ||
                      langKey.addMore}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={
                (keywordTranslation && keywordTranslation["cancel"]) ||
                langKey.cancel
              }
              buttonStyle="cancel mr-2"
              onClick={props.handleCloseAddCategoryModal}
            />

            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props.data ? "updatebtn" : "create"]) ||
                (props.data ? langKey.updatebtn : langKey.create)
              }
              buttonStyle={props.data ? "updateBtn" : "createbtn"}
              onClick={handleSubmit(onSubmit)}
              loading={props.loading}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default CategoryModal;
