import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import ModelComponent from "../../components/Model/Model";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import {
  notFoundAsset,
  uploadAsset,
  addtopicAsset,
  bin2Asset,
} from "../../assets";
import ImageViewer from "../../components/ImageViewer";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import {
  useCategoryCompetenceDropdownQuery,
  useGetCompaniesListQuery,
} from "../../services/api";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const TopicsModal = (props) => {
  const companyId = useSelector(
    (state) => state.auth.userDetail.user.company_id
  );

  const [company_id, setCompanyId] = useState();
  const [topicErrors, setTopicErrors] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [inputFields, setInputFields] = useState([{ name: "" }]);

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

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  // const validationSchema = Yup.object().shape({
  //   company_id: Yup.string().required(
  //     (keywordTranslation && keywordTranslation["companyRequired"]) ||
  //       validationsKey.companyRequired
  //   ),
  // });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  //   {
  //   resolver: yupResolver(validationSchema),
  //   mode: "onTouched",
  //   defaultValues: { company_id: props?.data?.company_id ?? "" },
  // }

  const allTopicValues = watch();
  const onSubmit = (values = allTopicValues) => {
    let error = topicValidationHandler();
    if (!error) {
      let formData = new FormData();

      if (props.data) {
        // values["_method"] = "put";
        formData.append("_method", "put");
        formData.append("id", props?.data?.id);
      }
      // for (const field in values) {
      //   if (values[field]) {
      //     formData.append(field, values[field]);
      //   }
      // }
      formData.append("company_id", company_id);

      if (props?.data) {
        formData.append("category_id", props?.data?.category_id);
      } else {
        if (category_input) {
          formData.append("category_input", category_input);
        } else {
          formData.append("category_id", category_id.value);
        }
      }

      inputFields.forEach((data, index) => {
        formData.append(`name[${index}]`, data.name);
      });
      inputFields.forEach((data, index) => {
        if (data.topic_image == null) {
          formData.append(`topic_image[${index}]`, "");
        } else if (typeof data.topic_image !== "string") {
          formData.append(`topic_image[${index}]`, data.topic_image);
        } else if (data.topic_image === "null") {
          formData.append(`topic_image[${index}]`, "image_delete");
        }
      });

      props.action(formData);
    }
  };

  useEffect(() => {
    setCompanyId(companyId);
    if (props.data) {
      let { id, name, image, category, company_id } = props.data;
      setInputFields([
        {
          name,
          topic_image: image,
        },
      ]);
      reset({ id, category_id: category.id, company_id });
    }
  }, []);

  const topicImageUploadHandler = (e, index) => {
    let { files } = e.target;
    const list = [...inputFields];
    list[index]["topic_image"] = files[0];
    setInputFields(list);
  };

  const imageRemoveHandler = (index) => {
    const list = [...inputFields];
    list[index]["topic_image"] = "null";
    setInputFields(list);
  };

  const categoryImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  const removeImg = () => {
    setValue("category_image", null);
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

  let { category_image, category_input, category_id } = watch();

  const { data: categoryDropdown, refetch: categoryRefetch } =
    useCategoryCompetenceDropdownQuery({
      params: { company_id },
    });


  const validationHandler = () => {
    topicValidationHandler();
    let noError = false;

    if (!company_id) {
      setError("company", {
        type: "custom",
        message:
          (keywordTranslation && keywordTranslation["companyRequired"]) ||
          validationsKey.companyRequired,
      });
      noError = true;
    } else {
      if (errors?.company) {
        clearErrors("company");
      }
    }

    if (!category_input && !category_id) {
      setError("category", {
        type: "custom",
        message:
          (keywordTranslation && keywordTranslation["categoryRequired"]) ||
          validationsKey.categoryRequired,
      });
      noError = true;
    } else {
      if (errors?.category) {
        clearErrors("category");
      }
    }
    if (!noError) {
      onSubmit();
    }
    return noError;
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

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    refetch: companyRefetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "", company_id: company_id } });

  useEffect(() => {
    companyRefetching();
    categoryRefetch();
  }, [props.handleCloseAddTopicsModal]);

  return (
    <ModelComponent
      size="md"
      show={true}
      handleClose={props.handleCloseAddTopicsModal}
      title={
        (keywordTranslation &&
          keywordTranslation[props?.data ? "editTopic" : "addTopic"]) ||
        (props?.data ? langKey.editTopic : langKey.addTopic)
      }
      // icon={addtopicAsset}
    >
      {props.children}
      <Modal.Body className="overflow">
        <div className="row ">
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
              changeHandler={(value) => setValue("company_id", value)}
              selectedValue={props?.data?.company_id || company_id}
            />
          </div>
          {/* <div className="mt-2">
            {errors.company && <ErrorViewer message={errors.company.message} />}
          </div> */}

          <div className="col-5 mt-3">
            <div className="d-flex">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["category"]) ||
                  langKey.category}
              </label>
              {props?.data ? null : (
                <p
                  className="addmore mb-0 ml-auto cursor"
                  onClick={() => {
                    setShowCategory(!showCategory);
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
                name="category_id"
                disabled={company_id ? false : true}
                placeholder={
                  props?.data?.category?.name ||
                  (keywordTranslation &&
                    keywordTranslation["selectCategory"]) ||
                  langKey.selectCategory
                }
                options={categoryDropdown}
                changeHandler={(value) => setValue("category_id", value)}
                e={true}
              />
            )}

            {showCategory && (
              <div className="col-12 p-0">
                <div className="d-flex"></div>
                <input
                  type="text"
                  {...register("category_input")}
                  className="typetext mr-2 pl-2 paddingRight"
                  placeholder="Safety"
                />
                <div className="upload_div_cs2">
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
                        className="mr-2"
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
                    onInput={categoryImageUploadHandler}
                  />
                </div>
              </div>
            )}

            <div className="mt-2">
              {errors.category && (
                <ErrorViewer message={errors.category.message} />
              )}
            </div>
          </div>

          <div className="col-7 mt-2">
            <label className="modalLabel modalLabelDark">
              {(keywordTranslation && keywordTranslation["topic"]) ||
                langKey.topic}
            </label>

            {inputFields.map((data, index) => {
              const { name, topic_image } = data;
              return (
                <div className="row mt-1" key={index}>
                  <div className="col-12">
                    <div className="form-group mb-0">
                      <input
                        type="text"
                        onChange={(evnt) => handleChange(index, evnt)}
                        value={name}
                        name="name"
                        className="typetext pl-2 paddingRight"
                        placeholder={
                          (keywordTranslation && keywordTranslation["topic"]) ||
                          langKey.topic
                        }
                      />
                      <div className="upload_div_cs2" style={{ right: "18px" }}>
                        {topic_image && topic_image !== "null" && (
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
                              className="mr-2"
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
                          name="topic_image"
                          className="typefile"
                          onInput={(e) => topicImageUploadHandler(e, index)}
                        />
                      </div>
                      {topicErrors.length && topicErrors.includes(index) ? (
                        <div className="mt-2">
                          <ErrorViewer
                            message={
                              (keywordTranslation &&
                                keywordTranslation["topicRequired"]) ||
                              validationsKey.topicRequired
                            }
                          />
                        </div>
                      ) : null}
                    </div>
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
            onClick={props.handleCloseAddTopicsModal}
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
  );
};

export default TopicsModal;
