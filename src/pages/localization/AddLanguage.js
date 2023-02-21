import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../components/Model/Modal.css";
import { Modal } from "react-bootstrap";
import Button from "../../components/Button/Button";
import ModelComponent from "../../components/Model/Model";
import ImageViewer from "../../components/ImageViewer";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import {
  addlangAsset,
  bin2Asset,
  notFoundAsset,
  uploadAsset,
  WarningAsset,
} from "../../assets";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";
import langKey from "../../localization/locale.json";
import validationsKey from "../../localization/validationsLocale.json";

const AddLanguage = (props) => {
  const { keywordTranslation, language_direction: defaultLanguageDirection } =
    useSelector((state) => state.localization?.selectedLanguage);
  const [languageImage, setLanguageImage] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      (keywordTranslation && keywordTranslation["langNameRequired"]) ||
        validationsKey.langNameRequired
    ),
    abbrevation: Yup.string().required(
      (keywordTranslation && keywordTranslation["abbrevationRequired"]) ||
        validationsKey.abbrevationRequired
    ),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      lang_status: 1,
      abbrevation: "",
      language_direction: 0,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = methods;

  const onSubmit = (data) => {
    let id = null;
    let formData = new FormData();
    if (typeof languageImage !== "string") {
      formData.append("flag_icon", languageImage);
    }

    for (const field in data) {
      formData.append(`${field}`, data[field]);
    }

    if (data.id) {
      id = data.id;
      formData.append("_method", "put");
    }
    props.action(formData, id);
  };

  const languageDirectionHandler = (value) => {
    setValue("language_direction", value);
  };

  const imageUploadHandler = (e) => {
    let file = e.target.files[0];
    setLanguageImage(file);
  };

  const removeImg = () => {
    setLanguageImage(null);
  };

  useEffect(() => {
    if (props.data) {
      let {
        id,
        flag_icon,
        name,
        lang_status,
        abbrevation,
        language_direction,
      } = props.data;
      setLanguageImage(flag_icon);
      reset({
        id,
        name,
        lang_status,
        abbrevation,
        language_direction,
      });
    }
  }, []);
  let { language_direction } = watch();
  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.languageModelHandler}
        title={
          (keywordTranslation &&
            keywordTranslation[props.data ? "editLanguage" : "addLanguage"]) ||
          (props.data ? langKey.editLanguage : langKey.addLanguage)
        }
        // icon={addlangAsset}
      >
        <Modal.Body>
          <label className="modalLabel mb-0">
            {(keywordTranslation && keywordTranslation["language"]) ||
              langKey.language}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="inputfield form-control fs-12"
            {...register("name")}
          />
          {errors.name && <ErrorViewer message={errors.name.message} />}
          <div className="upload_div" style={{ top: "45px" }}>
            {languageImage && (
              <>
                {" "}
                <ImageViewer
                  src={languageImage}
                  width="25px"
                  height="25px"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = notFoundAsset;
                  }}
                />
                <img
                  src={bin2Asset}
                  alt=""
                  className="ml-2 pointer"
                  onClick={removeImg}
                />
                <Button
                  buttonStyle="cancel"
                  onClick={props.languageModelHandler}
                />
              </>
            )}
            <img src={uploadAsset} alt="" width="24px" height="17px" />
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              name="imageupload"
              className="typefile"
              onInput={imageUploadHandler}
            />
          </div>
          <label className="modalLabel mb-0 mt-2">
            {(keywordTranslation && keywordTranslation["abbreviation"]) ||
              langKey.abbreviation}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="inputfield form-control fontsize-12"
            {...register("abbrevation")}
          />
          {errors.abbrevation && (
            <ErrorViewer message={errors.abbrevation.message} />
          )}
          {/* <div className="d-flex justify-content-between mt-4">
            <label className="modalLabel mb-0">{keywordTranslation && keywordTranslation["RTL LANGUAGE"] || "RTL LANGUAGE"}</label>
            <ToggleSlide
              checked={language_direction}
              onChangeHandler={(value) => setValue('language_direction', value)}
            />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Cancel"
            buttonStyle="cancel mr-2"
            onClick={props.languageModelHandler}
          />
          <Button
            loading={props.loading}
            label={
              props.data
                ? (keywordTranslation && keywordTranslation["updatebtn"]) ||
                  langKey.updatebtn
                : (keywordTranslation && keywordTranslation["add"]) ||
                  langKey.add
            }
            buttonStyle={props.data ? "updateBtn" : "createbtn"}
            onClick={handleSubmit(onSubmit)}
          />
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default AddLanguage;
