import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModelComponent from "../../components/Model/Model";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import {
  securityAsset,
  uploadAsset,
  addtopicAsset,
  notFoundAsset,
  bin2Asset,
} from "../../assets";
import ImageViewer from "../../components/ImageViewer";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import {
  useTopicDropdownQuery,
  useCategoryCompetenceDropdownQuery,
  useGetCompaniesListQuery,
} from "../../services/api";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const RequiredCertificationModal = (props) => {

  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const [topicErrors, setTopicErrors] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showTopic, setShowTopic] = useState(false);
  const [company_id, setCompanyId] = useState();
  const [inputFields, setInputFields] = useState([
    {
      name: "",
    },
  ]);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const validationSchema = Yup.object().shape({
    // company_id: Yup.string().required(
    //   (keywordTranslation && keywordTranslation["companyRequired"]) ||
    //     validationsKey.companyRequired
    // ),
  });





  const {
    register,
    clearErrors,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
    mode: "onTouched",
  });

  let {
    category_image,
    topic_image,
    category_id,
    category_input,
    topic_id,
    topic_input,
  } = watch();

  const { data: categoryDropdown } = useCategoryCompetenceDropdownQuery({
    params: { company_id: companyId || company_id },
  });

  const { data: topicDropdown } = useTopicDropdownQuery({
    category_id: category_id?.value,
    company_id: companyId || company_id,
  });

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
    const { value } = evnt.target;
    const list = [...inputFields];
    list[index]["name"] = value;
    setInputFields(list);
  };

  const onSubmit = (values) => {
    let formData = new FormData();
    let error = topicValidationHandler();
    if (!error && !errors?.company && !errors.topic) {
      if (props.data) {
        // allTopicValues["_method"] = "put";
        formData.append(`_method`, "put");
        formData.append(`id`, props?.data?.id);
      }

      // for (const field in allTopicValues) {
      //   if (allTopicValues[field]) {
      //     formData.append(field, allTopicValues[field]);
      //   }
      // }

      if (props?.data) {
        formData.append("category_id", props?.data?.category_id);
      } else {
        formData.append("category_id", category_id.value);
      }

      company_id && formData.append("company_id", company_id);
      if (topic_id) {
        if (props?.data) {
          formData.append("topic_id", props?.data?.topic_id);
        } else {
          formData.append("topic_id", topic_id.value);
        }
      } else {
        formData.append("topic_input", topic_input);
      }

      inputFields.forEach((data, index) => {
        formData.append(`name[${index}]`, data.name);
        if (data.image == null) {
          formData.append(`image[${index}]`, "");
        } else if (data.image && typeof data.image !== "string") {
          formData.append(`image[${index}]`, data.image);
        } else if (data.image && data.image === "null") {
          formData.append(`image[${index}]`, "image_delete");
        }
      });
      props.action(formData);
    }
  };

  const listImageUploadHandler = (e, index) => {
    let { files } = e.target;
    const list = [...inputFields];
    list[index]["image"] = files[0];
    setInputFields(list);
  };

  const imageRemoveHandler = (index) => {
    const list = [...inputFields];
    list[index]["image"] = "null"; //null string set for image delete on edit Required in api
    setInputFields(list);
  };

  const imageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  const removeImg = () => {
    setValue("category_image", null);
  };

  const removeTopicImg = () => {
    setValue("topic_image", null);
  };

  const topicValidationHandler = () => {
    let errors = [];
    inputFields.forEach((data, index) => {
      if (!data.name) {
        errors.push(index);
      }
    });
    setTopicErrors([...errors]);
    return errors.length ? true : false;
  };
  const topicInputsValidationHandler = () => {
    if (!topic_id && !topic_input) {
      setError("topic", {
        type: "custom",
        message:
          (keywordTranslation && keywordTranslation["topicRequired"]) ||
          validationsKey.topicRequired,
      });
    } else {
      clearErrors("topic");
    }
  };

  const validationHandler = () => {
    topicValidationHandler();
    topicInputsValidationHandler();
    let noError = false;

    // if (!company_id) {
    //   setError("company", {
    //     type: "custom",
    //     message:
    //       (keywordTranslation && keywordTranslation["companyRequired"]) ||
    //       validationsKey.companyRequired,
    //   });
    // } else {
    //   if (errors?.company) {
    //     clearErrors("company");
    //   }
    // }

    if (!category_input && !category_id && !props.data) {
      setError("category", {
        type: "custom",
        message:
          (keywordTranslation && keywordTranslation["categoryRequired"]) ||
          validationsKey.categoryRequired,
      });
    } else {
      if (errors?.category) {
        clearErrors("category");
      }
      onSubmit();
    }

    return noError;
  };

  useEffect(() => {
    if (showCategory) {
      setValue("category_id", "");
    }
    if (!showCategory) {
      setValue("category_input", "");
      setValue("category_image", "");
    }
  }, [showCategory]);

  useEffect(() => {
    setCompanyId(companyId);
    if (showTopic) {
      setValue("topic_id", "");
    } else {
      setValue("topic_input", "");
      setValue("topic_image", "");
    }
  }, [showTopic, companyId]);

  useEffect(() => {
    if (props.data) {
      let { id, name, image, category_id, topic_id, company_id } = props.data;
      reset({ id, category_id, topic_id, company_id });
      setInputFields([
        {
          name,
          image,
        },
      ]);
    }
  }, []);

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  return (
    <>
      <ModelComponent
        size="md"
        show={true}
        handleClose={props.handleCloseAddrequiredcertificateModal}
        title={
          (keywordTranslation &&
            keywordTranslation[
              props?.data ? "editCertification" : "addCertification"
            ]) ||
          (props?.data ? langKey.editCertification : langKey.addCertification)
        }
        // icon={addtopicAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="row">
            <label className="modalLabel modalLabelDark">
              {(keywordTranslation && keywordTranslation["company"]) ||
                langKey.company}
            </label>

            <div className="col-12 mb-3">
              <SearchableDropdown
                placeholder={
                  (keywordTranslation && keywordTranslation["selectCompany"]) ||
                  langKey.selectCompany
                }
                options={companies}
                changeHandler={(value) => setCompanyId(value)}
                selectedValue={props?.data?.company_id}
              />

              {/* {errors?.company && (
                <ErrorViewer message={errors?.company?.message} />
              )} */}
            </div>

            <div className="col-6">
              <div className="d-flex">
                <label className="modalLabel modalLabelDark">
                  {(keywordTranslation && keywordTranslation["category"]) ||
                    langKey.category}
                </label>
                {props?.data ? null : (
                  <p
                    className="addmore mb-0 ml-auto cursor"
                    onClick={() => {
                      setShowCategory(!showCategory); // Add new Category from here
                      setShowTopic(!showTopic);
                    }}
                  >
                    {!showCategory
                      ? (keywordTranslation && keywordTranslation["addNew"]) ||
                        langKey.addNew
                      : (keywordTranslation &&
                          keywordTranslation["selectCategory"]) ||
                        langKey.selectCategory}
                  </p>
                )}
              </div>

              {!showCategory && (
                <SearchableDropdown
                  placeholder={
                    props?.data?.category?.name ||
                    (keywordTranslation &&
                      keywordTranslation["selectCategory"]) ||
                    langKey.selectCategory
                  }
                  name="category_id"
                  // disabled={company_id ? false : true}
                  selectedValue={category_id}
                  options={categoryDropdown}
                  changeHandler={(value) => {
                    setValue("category_id", value);
                    setValue("topic_id", "");
                  }} // change category and undo topic selector because topic depend on category
                  e={true}
                />
              )}

              {showCategory && (
                <>
                  <input
                    type="text"
                    {...register("category_input")}
                    className="typetext mr-2 form-control paddingRight"
                    placeholder="Safety"
                  />
                  <div className="upload_div_cs" style={{ top: "26px" }}>
                    {category_image && (
                      <>
                        <ImageViewer
                          src={category_image || notFoundAsset}
                          alt=""
                          className="mr-2"
                          width="22px"
                          height="22px"
                        />
                        <img
                          src={bin2Asset}
                          alt=""
                          className="mr-2 pointer"
                          onClick={removeImg}
                        />
                      </>
                    )}
                    <img src={uploadAsset} alt="" width="24px" height="17px" />
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      name="category_image"
                      className="typefile"
                      onInput={imageUploadHandler}
                    />
                  </div>
                </>
              )}
              {errors.category && (
                <ErrorViewer message={errors.category.message} />
              )}
            </div>
            <div className="col-6">
              <div className="d-flex">
                <label className="modalLabel modalLabelDark">
                  {(keywordTranslation && keywordTranslation["topic"]) ||
                    langKey.topic}
                </label>
                {props?.data ? null : (
                  <p
                    className="addmore mb-0 ml-auto cursor"
                    onClick={() => {
                      setShowTopic(!showTopic);
                    }}
                  >
                    {!showTopic
                      ? (keywordTranslation && keywordTranslation["addNew"]) ||
                        langKey.addNew
                      : (keywordTranslation &&
                          keywordTranslation["selectTopic"]) ||
                        langKey.selectTopic}
                  </p>
                )}
              </div>

              {!showTopic && (
                <SearchableDropdown
                  placeholder={
                    (topic_id && props?.data?.topic.name) ||
                    (keywordTranslation && keywordTranslation["selectTopic"]) ||
                    langKey.selectTopic
                  }
                  selectedValue={topic_id}
                  name="topic_id"
                  options={topicDropdown}
                  disabled={
                    category_id || props?.data?.category_id ? false : true
                  }
                  changeHandler={(value) => setValue("topic_id", value)}
                  e={true}
                />
              )}
              {showTopic && (
                <>
                  <>
                    <input
                      type="text"
                      {...register("topic_input")}
                      className="typetext mr-2 form-control paddingRight"
                      placeholder="Safety"
                    />
                    <div className="upload_div_cs" style={{ top: "26px" }}>
                      {topic_image && (
                        <>
                          <ImageViewer
                            src={topic_image || notFoundAsset}
                            alt=""
                            className="mr-2"
                            width="22px"
                            height="22px"
                          />
                          <img
                            src={bin2Asset}
                            alt=""
                            className="mr-2 pointer"
                            onClick={removeTopicImg}
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
                        name="topic_image"
                        className="typefile"
                        onInput={imageUploadHandler}
                      />
                    </div>
                  </>
                </>
              )}
              {errors.topic && <ErrorViewer message={errors.topic.message} />}
            </div>
            {inputFields.map((data, index) => {
              const { name, image } = data;
              return (
                <div className="row pr-0" key={index}>
                  <div className="col-8 mt-3 pr-0">
                    <div className="d-flex">
                      <label className="modalLabel modalLabelDark">
                        {(keywordTranslation &&
                          keywordTranslation["traning"]) ||
                          langKey.traning}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(evnt) => handleChange(index, evnt)}
                      className="typetext mr-2 form-control paddingRight"
                      placeholder={
                        (keywordTranslation &&
                          keywordTranslation["certification"]) ||
                        langKey.certification
                      }
                    />
                    <div className="upload_div_cs2" style={{ top: "26px" }}>
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
                            className="mr-2 pointer"
                            onClick={() => imageRemoveHandler(index)}
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
                        onInput={(e) => listImageUploadHandler(e, index)}
                      />
                    </div>
                    {topicErrors.length && topicErrors.includes(index) ? (
                      <ErrorViewer
                        message={
                          (keywordTranslation &&
                            keywordTranslation["certificateRequired"]) ||
                          validationsKey.certificateRequired
                        }
                      />
                    ) : null}
                  </div>
                  <div className="col-12">
                    {inputFields.length > 1 ? (
                      <button
                        className="addMoreButton"
                        onClick={() => removeInputFields(index)}
                      >
                        {(keywordTranslation && keywordTranslation["remove"]) ||
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
        </Modal.Body>
        <Modal.Footer>
          <div className="m-0 p-0">
            <Button
              label={
                (keywordTranslation && keywordTranslation["cancel"]) ||
                langKey.cancel
              }
              buttonStyle="cancel mr-2"
              onClick={props.handleCloseAddrequiredcertificateModal}
            />
            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props?.data ? "updatebtn" : "create"]) ||
                (props?.data ? langKey.updatebtn : langKey.create)
              }
              buttonStyle={props?.data ? "updateBtn" : "createbtn"}
              onClick={validationHandler}
              loading={props.loading}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default RequiredCertificationModal;
