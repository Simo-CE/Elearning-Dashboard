import React from "react";
import { Modal } from "react-bootstrap";
import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import ModelComponent from "../../components/Model/Model";
import { useSelector } from "react-redux";
import langKey from "../../localization/locale.json";
import { colorfullLoader } from "../../assets";

const ModifyPermissionsModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleCloseDeleteModal}
        title={
          (keywordTranslation && keywordTranslation["modifyPermission"]) ||
          langKey.modifyPermission
        }
        className="ml-0 modifyPermissionModal"
      >
        <Modal.Body>
          <p className="delete_text fontsize-12">
            {props.deleteMessage}
            <span className="lang"> "{props.targetName}"</span> {props.has}{" "}
            <span className="quesCount"> {props.quesCount}</span>.{" "}
            {(keywordTranslation && keywordTranslation["areYouSure"]) ||
              langKey.areYouSure}{" "}
            {(keywordTranslation && keywordTranslation["modifyIt"]) ||
              langKey.modifyIt}
            ?
          </p>
          <p className="del-text">{props.warningText}</p>
          <div className="d-flex justify-content-end">
            {/* <Button
              icon={colorfullLoader}
              buttonStyle="deleteanyway_btn"
              //   loading={props.loading}
              onClick={() => {
                  props.action(props.id);
                }}
            /> */}
            {props.loading ? (
              <img src={colorfullLoader} height="40px" />
            ) : (
              <Button
                label={
                  (keywordTranslation && keywordTranslation["modifyAnyway"]) ||
                  langKey.modifyAnyway
                }
                buttonStyle="deleteanyway_btn"
                //   loading={props.loading}
                onClick={() => {
                  props.action(props.id);
                }}
              />
            )}
          </div>
        </Modal.Body>
      </ModelComponent>
    </>
  );
};

export default ModifyPermissionsModal;
