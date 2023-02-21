import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModelComponent from "../../components/Model/Model";
import langKey from "../../localization/locale.json";
import Button from "../../components/Button/Button";
import { qrAltAsset } from "../../assets";

const QRModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleShowQR}
        title={
          (keywordTranslation && keywordTranslation["userQRCode"]) ||
          langKey.userQRCode
        }
        // icon={totalUsersAsset}
      >
        {props.children}
        <Modal.Body className="overflow">
          <div className="d-flex justify-content-center     ">
            <img src={props?.data || qrAltAsset} width="120px" height="120px" />
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button
            label={
              (keywordTranslation && keywordTranslation["close"]) ||
              langKey.close
            }
            buttonStyle="cancel"
            onClick={props.handleShowQR}
          />
        </Modal.Footer>
      </ModelComponent>
    </>
  );
};

export default QRModal;
