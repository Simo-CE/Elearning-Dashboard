import React, { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ModelComponent from "../../components/Model/Model";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import {
  uploadAsset,
  notFoundAsset,
  documenticonAsset,
  bin2Asset,
  multidropdownAsset,
} from "../../assets";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import ImageViewer from "../../components/ImageViewer";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import {
  useRoleDropDownQuery,
  useGetCompaniesListQuery,
} from "../../services/api";
import { MultiSelect } from "react-multi-select-component";
import SearchableDropdown from "../../components/searchDropdown/SearchableDropdown";
import { textCapitalize } from "./../../utils/helper/index";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const RequiredDocumentModal = (props) => {
  const [assign_to, setAssign_to] = useState([]);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const companyId = useSelector((state) => state.auth.userDetail.user.company_id);

  const validationSchema = Yup.object().shape({

    name: Yup.string().required(
      (keywordTranslation && keywordTranslation["documentRequired"]) ||
        validationsKey.documentRequired
    ),
    assign_to: Yup.array()
      .min(
        1,
        (keywordTranslation && keywordTranslation["assignToRequired"]) ||
          validationsKey.assignToRequired
      )
      .required(
        (keywordTranslation && keywordTranslation["assignToRequired"]) ||
          validationsKey.assignToRequired
      ),
  });

  const ArrowRenderer = ({ expanded }) => (
    <>
      {expanded ? (
        <img src={multidropdownAsset} />
      ) : (
        <img src={multidropdownAsset} />
      )}
    </>
  );

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    defaultValues: {
      assign_to: [],
      expiry_date: 0,
      status: props?.data?.status ?? 0,
      company_id: companyId ||  props?.data?.company_id,
    },
  });

  let { image, expiry_date, status, company_id } = watch();

  const allTopicValues = watch();
  const onSubmit = (values = allTopicValues) => {
    const { assign_to, ...rest } = values;
    values = { ...rest };
    if (props.data) {
      values["_method"] = "put";
    }

    let formData = new FormData();
    // formData.append("company_id", allTopicValues?.company_id);
    for (const field in values) {
      if (field === "image" && values[field] === null) {
        formData.append(field, "");
      } else if (field === "image" && values[field] === "null") {
        formData.append(field, "image_delete");
      } else {
        formData.append(field, values[field]);
      }
    }

    assign_to.forEach((data, index) => {
      formData.append(`assign_to[${index}]`, data.value);
    });
    props.action(formData);
  };

  const documentsImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  const removeImg = () => {
    setValue("image", "null");
  };

  const { data: roleDropDown } = useRoleDropDownQuery(company_id || companyId);

  useEffect(() => {
    if (props.data) {
      let { id, name, expiry_date, status, document, assign_to, company_id } =
        props.data;
      reset({
        id,
        name,
        expiry_date,
        status,
        image: document,
        assign_to,
        company_id,
      });

      let assign_too = props.data.assign_to;
      let assignTo =
        typeof assign_too == "undefined"
          ? []
          : assign_too.map(({ name, id }) => {
              return {
                label: name,
                value: id,
              };
            });

      setValue("assign_to", assignTo);

      setAssign_to([...assignTo]);
    }
  }, [props.data]);

  const assignToHandler = (value) => {
    setValue("assign_to", value);
    setAssign_to([...value]);
  };

  const {
    data: companies,
    isLoading: companyLoading,
    isFetching: companyFetching,
    isError: companyError,
  } = useGetCompaniesListQuery({ url: "", params: { search: "" } });

  const reNameStrings = {
    allItemsAreSelected:
      (keywordTranslation && keywordTranslation["selectAllRoles"]) ||
      langKey.selectAllRoles,
    selectSomeItems:
      (keywordTranslation && keywordTranslation["selectAssignTo"]) ||
      langKey.selectAssignTo,
  };

  return (
    <>
      <ModelComponent
        size="md"
        show={true}
        handleClose={props.handleCloseAddRequiredDocumentModal}
        title={
          (keywordTranslation &&
            keywordTranslation[props?.data ? "editDocument" : "addDocument"]) ||
          (props?.data ? langKey.editDocument : langKey.addDocument)
        }
        // icon={documenticonAsset}
      >
        {props.children}
        <Modal.Body>
          <div className="row ">
            <div className="col-12 mb-2">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["company"]) ||
                  langKey.company}
              </label>

              <div className="h-36">
                <SearchableDropdown
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["selectCompany"]) ||
                    langKey.selectCompany
                  }
                  options={companies}
                  changeHandler={(value) => {
                    setValue("company_id", value);
                  }}
                  selectedValue={props?.data?.company_id || company_id || companyId}
                />
              </div>

            </div>

            <div className="col-8">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["document"]) ||
                  langKey.document}
              </label>
              <input
                type="text"
                {...register("name")}
                className="typetext mr-2 form-control paddingRight h-36"
                placeholder="ID / Passport"
              />
              {errors?.name && <ErrorViewer message={errors.name.message} />}
              <div className="upload_div_cs">
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
                      onClick={removeImg}
                    />
                  </>
                )}
                <img src={uploadAsset} alt="" width="24px" height="17px" />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  name="image"
                  className="typefile"
                  onInput={documentsImageUploadHandler}
                />
              </div>
            </div>

            <div className="col-4">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["assignTo"]) ||
                  langKey.assignTo}
              </label>

              <div className="h-36">
                <MultiSelect
                  options={
                    typeof roleDropDown == "undefined"
                      ? []
                      : roleDropDown.map(({ name, id }) => {
                          return {
                            label: textCapitalize(name),
                            value: id,
                          };
                        })
                  }
                  // disabled={company_id ? false : true}
                  overrideStrings={reNameStrings}
                  ArrowRenderer={ArrowRenderer}
                  value={assign_to}
                  onChange={assignToHandler}
                />
              </div>

              {errors?.assign_to && (
                <ErrorViewer message={errors.assign_to.message} />
              )}
            </div>
            <div className="col-3 mt-3">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["expiryDate"]) ||
                  langKey.expiryDate}
              </label>{" "}
              <br />
              <ToggleSlide
                Class="Medium"
                checked={expiry_date === 1 ? true : false}
                onChangeHandler={(value) => {
                  setValue("expiry_date", value ? 1 : 0);
                }}
              />
            </div>
            <div className="col-3 mt-3">
              <label className="modalLabel modalLabelDark">
                {(keywordTranslation && keywordTranslation["required"]) ||
                  langKey.required}
              </label>{" "}
              <br />
              <ToggleSlide
                Class="Medium"
                checked={status ? true : false}
                onChangeHandler={(value) => setValue("status", value ? 1 : 0)}
              />
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
              onClick={props.handleCloseAddRequiredDocumentModal}
            />
            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props?.data ? "updatebtn" : "Create"]) ||
                (props?.data ? langKey.updatebtn : langKey.create)
              }
              buttonStyle={props?.data ? "updateBtn" : "createbtn"}
              onClick={handleSubmit(onSubmit)}
              loading={props.loading}
            />
          </div>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default memo(RequiredDocumentModal);
