import React from "react";
import { Modal } from "react-bootstrap";
import ModelComponent from "../../../components/Model/Model";
import langKey from "../../../localization/locale.json";
import Button from "../../../components/Button/Button";
import { NavLink } from "react-router-dom";
import paths from "../../../routes/paths";
import { useSelector } from "react-redux";

const LockedModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  return (
    <>
      <ModelComponent
        size="md"
        show={true}
        handleClose={props.handleCancel}
        title={
          (keywordTranslation && keywordTranslation["cancelConfirmation"]) ||
          langKey.cancelConfirmation
        }
        // icon={totalUsersAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="d-flex justify-content-center">
            <h6>{props?.confirmatonText}</h6>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button
            label={
              (keywordTranslation && keywordTranslation["stayOnPage"]) ||
              langKey.stayOnPage
            }
            buttonStyle="cancel"
            onClick={props.handleCancel}
          />

          <NavLink to={paths.tranings}>
            <Button
              label={
                (keywordTranslation && keywordTranslation["leavePage"]) ||
                langKey.leavePage
              }
              buttonStyle="deleteTrainingButton"
            />
          </NavLink>
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default LockedModal;
