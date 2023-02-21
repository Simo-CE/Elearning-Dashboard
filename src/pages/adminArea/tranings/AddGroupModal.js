import React, { useState } from "react";
import ModalComponent from "../../../components/Model/Model";
import Button from "../../../components/Button/Button";
import { Modal } from "react-bootstrap";
import { transparentAsset, uploadAsset } from "../../../assets";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";
import { useSelector } from "react-redux";
import ImageViewer from "../../../components/ImageViewer";
import ImageDetailDiv from "../../../components/imageDetailDiv/ImageDetailDiv";
import langKey from "../../../localization/locale.json";
import { toast } from "react-toastify";

const AddGroupModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [image, setImage] = useState();
  const [sectionName, setSectionName] = useState();

  const company_id = useSelector(
    (user) => user?.auth.userDetail.user?.company_id
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      (keywordTranslation && keywordTranslation["groupTitleReq"]) ||
        langKey.groupTitleReq
    ),
    description: Yup.string(),
  });

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

  const handleImage = (e) => {
    if (e.target.files[0].size <= 2097152) {
      setImage(e.target.files[0]);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    data?.name && formData.append("name", data?.name);
    data?.description && formData.append("desc", data?.description);
    formData.append("valid_for", "two year");
    company_id && formData.append("company_id", company_id);
    image && formData.append("image", image);
    sectionName && formData.append("section[0]", sectionName);

    props.action(formData);

    props.addGroupModalHandler();
  };

  const removeImg = () => {
    setImage("");
  };
  return (
    <>
      <ModalComponent
        size="md"
        show={true}
        handleClose={props.addGroupModalHandler}
        title={
          (keywordTranslation && keywordTranslation["addGroup"]) ||
          langKey.addGroup
        }
        // className="traningDetailModal"
        // icon={reassignAsset}
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-12">
              <p className="smModalLabel">
                {(keywordTranslation && keywordTranslation["groupTitle"]) ||
                  langKey.groupTitle}
              </p>
              <input
                type="text"
                {...register("name")}
                className="addgroupInput w-100"
                placeholder={
                  (keywordTranslation &&
                    keywordTranslation["InternationHealth"]) ||
                  langKey.InternationHealth
                }
              />
            </div>
            {errors.name && (
              <ErrorViewer className="mt-2" message={errors.name.message} />
            )}

            <div className="col-12 mt-2">
              <p className="smModalLabel">
                {(keywordTranslation && keywordTranslation["sectionName"]) ||
                  langKey.sectionName}
              </p>
              <input
                type="text"
                className="addgroupInput w-100"
                placeholder={
                  (keywordTranslation && keywordTranslation["section"]) ||
                  langKey.section
                }
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </div>
            <div className="col-12 mt-3">
              <div className="d-flex">
                <p className="smModalLabel">
                  {(keywordTranslation && keywordTranslation["image"]) ||
                    langKey.image}
                </p>
                <p
                  className="fs-11 fw-400 ml-auto"
                  style={{ color: "#B4B4B4" }}
                >
                  {(keywordTranslation && keywordTranslation["lessThen"]) ||
                    langKey.lessThen}
                </p>
              </div>

              <div className="csvfile_div ">
                {image ? (
                  <div className="classiImgPrev">
                    <ImageViewer
                      src={image || transparentAsset}
                      width="98%"
                      height="110px"
                    />
                  </div>
                ) : (
                  <center style={{ zIndex: "13" }}>
                    <img src={uploadAsset} alt="" className="upload_csv" />
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      name="image"
                      className="csvfile"
                      onChange={(e) => handleImage(e)}
                    />
                    <p className="csvtext">
                      {(keywordTranslation &&
                        keywordTranslation["dragDropImg"]) ||
                        langKey.dragDropImg}{" "}
                      <br />
                      {(keywordTranslation && keywordTranslation["or"]) ||
                        langKey.or}{" "}
                      <span className="browse_file">
                        {" "}
                        {(keywordTranslation &&
                          keywordTranslation["browseFiles"]) ||
                          langKey.browseFiles}
                      </span>
                    </p>
                  </center>
                )}
              </div>

              {image?.name && (
                <ImageDetailDiv
                  name={image?.name}
                  size={image?.size}
                  onClick={removeImg}
                />
              )}
            </div>
            <div className="col-12 mt-3">
              <p className="smModalLabel">
                {(keywordTranslation && keywordTranslation["description"]) ||
                  langKey.description}
              </p>
              <textarea
                rows="5"
                {...register("description")}
                className="addgrouptextarea w-100"
                placeholder={
                  (keywordTranslation && keywordTranslation["typeHere"]) ||
                  langKey.typeHere
                }
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label={
              (keywordTranslation && keywordTranslation["cancel"]) ||
              langKey.cancel
            }
            buttonStyle="cancel mr-2"
            onClick={props.addGroupModalHandler}
          />

          <Button
            label={
              (keywordTranslation && keywordTranslation["upload"]) ||
              langKey.upload
            }
            buttonStyle="addnew_btn pe-3 ps-3"
            onClick={handleSubmit(onSubmit)}
            loading={props.loading}
          />
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default AddGroupModal;
