import React, { useState } from "react";
import {
  deleteAsset,
  deletebasketAsset,
  delIconAsset,
  downloadAsset,
  downloadgreenAsset,
  downloadIconAsset,
  download_iconAsset,
  identityAsset,
  noyetAsset,
  purpleuploadAsset,
  shareAsset,
  statuspassedAsset,
  verifyAsset,
  viewblueAsset,
} from "../../assets";
import "./Competence.css";
import UploadDocumentModal from "./UploadDocumentModal";

const RequiredDocument = () => {
  const [showUploadDocument, setShowUploadDocument] = useState(false);

  const uploadDocumentModalHandler = () => {
    setShowUploadDocument((prev) => !prev);
  };

  return (
    <>
      <div className="ml-4 mr-4">
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="require_document_bg">
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="sm_heading fontsize-13">Required Documents</h4>
                  <p className="para_11 fontsize-11">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3">
                  <div className="document_card p-2">
                    <div
                      className="d-flex justify-content-end  align-items-center"
                      style={{ gap: "5px" }}
                    >
                      <img
                        src={verifyAsset}
                        alt="passed-icon"
                        width="16px"
                        height="16px"
                        className=""
                      />
                      <p className="verfied para_11 fontsize-11">Verified</p>
                      <img
                        src={noyetAsset}
                        alt="passed-icon"
                        width="16px"
                        height="16px"
                        className=""
                      />
                      <p className="not_yet para_11 fontsize-11">Not Yet</p>
                    </div>
                    <div className="mt-3">
                      <center>
                        <div className="identity_bg d-flex justify-content-center align-items-center">
                          <img src={identityAsset} width="35px" height="35px" />
                        </div>
                        <div>
                          <p className="assign_to_name mt-2 fontsize-12">
                            ID / Passport{" "}
                          </p>
                          <p className="para_11 mt-1 fontsize-11">
                            Internal & External
                          </p>
                        </div>
                      </center>
                    </div>
                    <div
                      className="d-flex justify-content-center mt-4"
                      style={{ gap: "10px" }}
                    >
                      <img
                        src={purpleuploadAsset}
                        width="20px"
                        height="14px"
                        onClick={() => uploadDocumentModalHandler()}
                      />
                      <img src={deletebasketAsset} width="13px" height="13px" />
                      <img src={shareAsset} width="15px" height="13.85px" />
                      <img
                        src={downloadgreenAsset}
                        width="12px"
                        height="13.5px"
                      />
                      <img
                        src={viewblueAsset}
                        width="16.87px"
                        height="12.38px"
                      />
                    </div>
                    {showUploadDocument && (
                      <UploadDocumentModal
                        uploadDocumentModalHandler={uploadDocumentModalHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequiredDocument;
