import React from "react";
import { useSelector } from "react-redux";
import "../../components/Model/Modal.css";
import { Modal } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { addlangAsset, uploadAsset, loaderAsset } from "../../assets";
import langKey from "../../localization/locale.json";

const UploadKeywordsModal = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  return (
    <>
      <Modal
        show={true}
        onHide={props.closeUploadKeywordsModalHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex">
            <img src={addlangAsset} alt="icon" className="mr-2" />
            <h5 className="title">
              {(keywordTranslation && keywordTranslation["uploadKeyword"]) ||
                langKey.uploadKeyword}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modalLabel mb-1">
            {(keywordTranslation && keywordTranslation["file"]) || langKey.file}
          </p>
          <div className="row">
            <div className="col-12">
              {props.loading ? (
                <div className="text-center">
                  <img src={loaderAsset} alt="" height="120px" width="120px" />
                </div>
              ) : (
                <div className="csvfile_div">
                  <center>
                    <img src={uploadAsset} alt="" className="upload_csv" />
                    <input
                      type="file"
                      name="profile_photo"
                      accept=".xlsx"
                      onInput={(e) => props.action(e.target.files[0])}
                      className="csvfile"
                    />
                    <p className="csvtext">
                      {(keywordTranslation &&
                        keywordTranslation["dragAndDropYourFileHere"]) ||
                        langKey.dragAndDropYourFileHere}{" "}
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
                </div>
              )}
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
              onClick={props.closeUploadKeywordsModalHandler}
            />
            {/* <Button
                            label={(keywordTranslation && keywordTranslation["save"]) || langKey.save}
                            buttonStyle="createbtn" loading={props.loading}
                        /> */}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadKeywordsModal;
