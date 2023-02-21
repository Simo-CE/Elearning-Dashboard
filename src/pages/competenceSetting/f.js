import React, { useEffect } from "react";
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
import formDataConverter from "../../utils/formDataConverter";

const CategoryModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category is required"),
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

  let { image } = watch();

  const onSubmit = (values) => {


    if (typeof image == "string") {
      let { image, ...rest } = values;
      values = { ...rest };
    }
    if (props.data) {
      values["_method"] = "put";
    }

    if (props.data) {
      props.action(values.id, formDataConverter(values)); // getting values fron common method
    } else {
      props.action(values); // getting values fron common method
    }
  };

  const categoryImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  };

  const removeImg = () => {
    setValue("image", null);
  };

  useEffect(() => {
    if (props.data) {
      let { id, name, image } = props.data;
      reset({ id, name, image });
    }
  }, []);

  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleCloseAddCategoryModal}
        title={
          (keywordTranslation &&
            keywordTranslation[
              props.data ? "Edit Category" : "Add Category"
            ]) ||
          (props?.data ? "Edit Category" : "Add Category")
        }
        // icon={addtopicAsset}
      >
        {props.children}
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label className="clientlabels fontsize-11">
                {(keywordTranslation && keywordTranslation["CATEGORY"]) ||
                  "CATEGORY"}
              </label>
              <br />
              <input
                type="text"
                {...register("name")}
                className="typetext mr-2 form-control paddingRight"
                placeholder="Safety"
              />
              {errors.name && <ErrorViewer message={errors.name.message} />}
              <div className="upload_div_cs mt-1">
                {image && (
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
                  name="image"
                  className="typefile"
                  onInput={categoryImageUploadHandler}
                />
              </div>
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
              onClick={props.handleCloseAddCategoryModal}
            />

            <Button
              label={
                (keywordTranslation &&
                  keywordTranslation[props.data ? "Update" : "Create"]) ||
                (props.data ? "Update" : "Create")
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
