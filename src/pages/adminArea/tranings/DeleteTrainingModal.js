import React, { Children, useState } from "react";
import "../../../components/Model/Modal.css";
import "../../../components/ResponsiveText.css";
import { Modal } from "react-bootstrap";
import { deleteBlankAsset } from "../../../assets";
import Button from "../../../components/Button/Button";
import {
  useDeleteSeriesTrainingMutation,
  useDeleteTrainingMutation,
} from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";

const DeleteTrainingModal = (props) => {
  const [firstCheck, setFirstCheck] = useState();
  const [secondCheck, setSecondCheck] = useState();

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  return (
    <>
      <ToastContainer />
      <Modal
        size="md"
        show={true}
        onHide={props.handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
        //   className={className}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex">
            <h5 className="title fontsize-15">
              {(keywordTranslation && keywordTranslation["delConfirmation"]) ||
                langKey.delConfirmation}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3 mt-3">
            <div>
              <span className=" fs-12 fw-500">{props.confirmationTextOne}</span>
              <span className=" fs-12 fw-500" style={{ color: "#2C8EFF" }}>
                {props.trainingName}
              </span>
              <span className=" fs-12 fw-500">{props.confirmationTextTwo}</span>
            </div>
            <p className="mt-3 fs-12 fw-700">
              {(keywordTranslation && keywordTranslation["understand"]) ||
                langKey.understand}
            </p>
            <p className="del-text">{props.warningText}</p>
            <div className="mt-3" style={{ display: "flex" }}>
              <input
                type="checkbox"
                name=""
                id="true"
                onClick={(e) => setFirstCheck(e.target.checked)}
              />
              <p className="ml-2 fs-12 fw-500">{props?.firstCheckBoxText}</p>
            </div>

            {!props?.trainingName && (
              <div className="mt-3" style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  name=""
                  id="true"
                  onClick={(e) => setSecondCheck(e.target.checked)}
                />
                <p className="ml-2 fs-12 fw-500">{props?.secondCheckBoxText}</p>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <p
                className="mr-3 mt-1 cursor"
                style={{ color: "#A5A5A5" }}
                onClick={props.handleCloseDeleteModal}
              >
                {(keywordTranslation && keywordTranslation["cancel"]) ||
                  langKey.cancel}
              </p>
              {props?.trainingName ? (
                <>
                  {firstCheck ? (
                    <Button
                      label={props?.deleteButtonText}
                      buttonStyle="deleteTrainingButton"
                      loading={props.loading}
                      // onClick={handleDeleteTraining}
                      onClick={() => {
                        props.action(props.id);
                      }}
                    />
                  ) : (
                    <Button
                      label={props?.deleteButtonText}
                      buttonStyle="deleteDisableTrainingButton"
                      loading={props.loading}
                    />
                  )}
                </>
              ) : (
                <>
                  {firstCheck && secondCheck ? (
                    <Button
                      label={props?.deleteButtonText}
                      buttonStyle="deleteTrainingButton"
                      loading={props.loading}
                      // onClick={handleDeleteTraining}
                      onClick={() => {
                        props.action(props.id);
                      }}
                    />
                  ) : (
                    <Button
                      label={props?.deleteButtonText}
                      buttonStyle="deleteDisableTrainingButton"
                      loading={props.loading}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteTrainingModal;
