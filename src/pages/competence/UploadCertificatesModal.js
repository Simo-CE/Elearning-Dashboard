import React from "react";
import ModelComponent from "../../components/Model/Model"
import Button from "../../components/Button/Button"
import { Modal } from 'react-bootstrap';
import "../../components/Model/Modal.css"
import { deleteAsset, fileiconAsset, identityAsset, tickAsset, uploadAsset, uploadcertiAsset, uploaddocAsset } from "../../assets";

const UploadCertificatesModal = (props) => {
    return (
        <>

            <ModelComponent
                size="md"
                show={true}
                handleClose={props.uploadCertificateModalHandler}
                title="Upload Certification"
                icon={uploadcertiAsset}
            >
                <Modal.Body>
                    <div className="row">
                        {/* <div className="col-lg-5">
                            <div>
                                <div className="d-flex align-items-center">
                                    <label className="modalLabel fontsize-11">CATEGORY</label>
                                    <p className="addNew mb-0 ml-auto">+ Add new</p>
                                </div>
                                <div>
                                    <select className="w-100 typetext">
                                        <option>Safety</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div>
                                <div className="d-flex align-items-center">
                                    <label className="modalLabel fontsize-11">CATEGORY</label>
                                    <p className="addNew mb-0 ml-auto">+ Add new</p>
                                </div>
                                <div>
                                    <select className="w-100 typetext">
                                        <option>VCA</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-lg-7">
                            <label className="modalLabel fontsize-11">DOCUMENT</label>
                            <div>
                                <input type="text" placeholder="ID / Passport" className="documentinput_bg w-100 pl-5" />
                                <img src={identityAsset} width="20px" height="20px" className="identity_img" />
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <label className="modalLabel fontsize-11">EXPIRE DATE</label>
                            <div>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="col-lg-12 mt-3">
                            <div className="d-flex">
                                <label className="modalLabel fontsize-11">DOCUMENT FILE</label>
                                <label className="modalLabel fontsize-11 ml-auto">*Only PDF files are allowed</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="csvfile_div ">
                                <center>
                                    <img src={uploadAsset} alt="" className="upload_csv" />
                                    <input
                                        type="file" name="image" className="csvfile"
                                    />
                                    <p className="csvtext">
                                        Drag and drop your file here
                                        <br />
                                        <span className="browse_file">browse files</span>
                                    </p>
                                </center>
                            </div>
                        </div>

                        <div className="col-lg-12 mt-3 mb-4">
                            <div className="d-flex">
                                <div className="media">
                                    <img className="mr-2" src={fileiconAsset} alt="" width="35px" height="35px" />
                                    <div className="media-body">
                                        <h5 className="mt-0 assign_to_name fontsize-12">id-passport.pdf</h5>
                                        <p className='function fontsize-11'>900Kb</p>
                                    </div>
                                </div>

                                <div className="ml-auto d-flex align-items-center" style={{ gap: "10px" }}>
                                    <img src={tickAsset} alt="" width="13px" height="9.75px" />
                                    <img src={deleteAsset} alt="" width="20px" height="20px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button label="Cancel" buttonStyle="cancel mr-2" onClick={props.uploadCertificateModalHandler} />
                    <Button label="Upload" buttonStyle="createbtn pl-2 pr-2" />


                </Modal.Footer>
            </ModelComponent>
        </>
    )
}

export default UploadCertificatesModal