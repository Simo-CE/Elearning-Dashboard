import React, { useState } from "react";
import ModelComponent from "../../components/Model/Model"
import Button from "../../components/Button/Button"
import { Modal } from 'react-bootstrap';
import "../../components/Model/Modal.css"
import { deleteAsset, fileiconAsset, identityAsset, notFoundAsset, tickAsset, uploadAsset, uploadcertiAsset, uploaddocAsset } from "../../assets";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import ImageDetailDiv from "../../components/imageDetailDiv/ImageDetailDiv";
import langKey from "../../localization/locale.json";
import { useLocation } from "react-router-dom";
import { useGetSingleUserDetailQuery } from "../../services/api";
import ErrorViewer from "../../components/errorViewer/ErrorViewer";

const UploadCertificatesModal = (props) => {

  const CurrentUserID = useSelector((state) => state.auth?.userDetail?.user?.id);

  const [images, setImages] = useState();

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const validationSchema = Yup.object().shape({
    expiry_date: Yup.string().required("Expiry date is required"),
    photo: Yup
      .mixed()
      .test("required", "certification File is required", value => value.length > 0)
      .test("fileSize", "File Size is too large", (value) => {
        return value.length && value[0].size <= 4000;
      })
  });

  const location = useLocation();

  const {
    data: getSingleUserDetail
  } = useGetSingleUserDetailQuery({ params: { user_id: location?.state?.user_id } });

  const currentUserById = getSingleUserDetail?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {

    if (props.data) {
      values["_method"] = "post";
    }

    let formData = new FormData();
    for (const field in values) {
      formData.append(field, values[field]);
    }

    formData.append("user_id", currentUserById?.id ?? CurrentUserID);

    formData.append("document", images);

    formData.append("certificates_id", props?.data?.id);

    props.action(formData);
  };

  const imageUploadHandler = (e) => {
    setImages(e.target.files[0]);
  };

  const resetInputImage = () => {
    setImages("");
    document.getElementById("file-input").value = "";
  };
  return (
    <>
      <ModelComponent
        size="md"
        show={true}
        handleClose={props.uploadCertificateModalHandler}
        title={(keywordTranslation && keywordTranslation["uploadCert"]) || langKey.uploadCert}
      // icon={uploadcertiAsset}
      >
        <Modal.Body>
          <div className="row">
            <div className="col-lg-7">
              <label className="modalLabel fontsize-11">{(keywordTranslation && keywordTranslation["cerificate"]) || langKey.cerificate}</label>
              <div>
                <input
                  type="text"
                  placeholder="ID / Passport"
                  className="documentinput_bg w-100 pl-5"
                  value={props?.data?.name}
                  readOnly
                />

                <img
                  src={props?.data?.user_certificate[0]?.document || notFoundAsset}
                  width="20px"
                  height="20px"
                  className="identity_img"
                />
              </div>
            </div>

            <div className="col-lg-5">
              <label className="modalLabel fontsize-11">{(keywordTranslation && keywordTranslation["expiryDate"]) || langKey.expiryDate}</label>
              <div>
                <input
                  className="documentinput_bg w-100 pl-2 pr-2"
                  type="date"
                  {...register("expiry_date")}
                  name="expiry_date"
                />
              </div>
              {errors.expiry_date && <ErrorViewer message={errors.expiry_date.message} />}
            </div>

            <div className="col-lg-12 mt-3">
              <div className="d-flex">
                <label className="modalLabel fontsize-11">{(keywordTranslation && keywordTranslation["certFile"]) || langKey.certFile}</label>
                {/* <label className="modal_lables fontsize-11 ml-auto">*Only PDF files are allowed</label> */}
              </div>
            </div>
            <div className="col-12">
              <div className="csvfile_div ">
                <center>
                  <img src={uploadAsset} alt="" className="upload_csv" />
                  <input
                    type="file"
                    name="image"
                    id="file-input"
                    className="csvfile"
                    accept="application/pdf, image/*"
                    onInput={imageUploadHandler}
                    {...register("photo")}
                  />

                  <p className="csvtext">
                    {keywordTranslation && keywordTranslation["dragDropFile"] || langKey.dragDropFile} <br />
                    {keywordTranslation && keywordTranslation["or"] || langKey.or} <span className="browse_file"> {keywordTranslation && keywordTranslation["browseFiles"] || langKey.browseFiles}</span>
                  </p>

                </center>
              </div>
              {errors.photo && <ErrorViewer message={errors.photo.message} />}
            </div>

            {images && (
              <ImageDetailDiv
                name={images?.name}
                size={images?.size}
                onClick={()=>resetInputImage()}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button label={(keywordTranslation && keywordTranslation["cancel"]) || langKey.cancel} buttonStyle="cancel mr-2" onClick={props.uploadCertificateModalHandler} />
          <Button label={(keywordTranslation && keywordTranslation["upload"]) || langKey.upload} buttonStyle="createbtn pl-2 pr-2" onClick={handleSubmit(onSubmit)} loading={props.loading} />
        </Modal.Footer>
      </ModelComponent>
    </>
  )
}

export default UploadCertificatesModal;