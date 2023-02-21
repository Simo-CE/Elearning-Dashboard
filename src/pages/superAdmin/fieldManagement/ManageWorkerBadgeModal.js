import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import ModalComponent from "../../../components/Model/Model";
import { Modal } from "react-bootstrap";
import {
  addContactAsset,
  aidAsset,
  deleteAsset,
  deleteBlankAsset,
  editAsset,
  englishAsset,
  fileUploadIconAsset,
  flagAsset,
  franceAsset,
  iconAsset,
  nederlandsAsset,
  newlecLogoAsset,
  phycoProfileAsset,
  profilePageAsset,
  qrcodeAsset,
  uploadAsset,
  uploadCamAsset,
  workerprofileAsset,
} from "../../../assets";
import Toggle from "../../../components/ToggleSlide/ToggleSlide";

const ManageWorkerBadge = (props) => {
  const [showCompanyLogo, setShowCompanyLogo] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWorkerName, setShowWorkerName] = useState(false);
  const [showFunction, setShowFunction] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [showNativeLanguage, setShowNativeLanguage] = useState(false);
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [showCompletedTraining, setShowCompletedTraining] = useState(false);
  const [showPsychologistName, setShowPsychologistName] = useState(false);
  const [showPsychologistPhoto, setShowPsychologistPhoto] = useState(false);
  const [showPsychologistNumber, setShowPsychologistNumber] = useState(false);
  const [showEmergencyIcon, setShowEmergencyIcon] = useState(false);
  const [showEmergencyNumber, setShowEmergencyNumber] = useState(false);
  const [showBadgeVisible, setShowBadgeVisible] = useState(false);

  return (
    <>
      <ModalComponent
        size="lg"
        show={true}
        handleClose={props.manageWorkerModalHandler}
        title="Manage worker badge"
        // icon={reassignAsset}
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="fs-12 fw-500" style={{ color: "#AEAEAE" }}>
                    BADGE VISIBILITY
                  </h4>
                  <div className="d-flex align-items-center mt-2">
                    <p className="fs-11 fw-500">Disabled/Enabled</p>
                    <div className="ms-auto">
                      <Toggle
                        className="Medium"
                        onChangeHandler={() =>
                          setShowBadgeVisible(!showBadgeVisible)
                        }
                      />
                    </div>
                  </div>
                </div>

                {showBadgeVisible && (
                  <div className="col-lg-12 mt-3">
                    <h4 className="fs-12 fw-500" style={{ color: "#AEAEAE" }}>
                      BADGE INFO
                    </h4>
                    <div className="d-flex align-items-center mt-2">
                      <p className="fs-11 fw-500 black">Company logo</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowCompanyLogo(!showCompanyLogo)
                          }
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Worker photo</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() => setShowProfile(!showProfile)}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Worker full name</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowWorkerName(!showWorkerName)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Function</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() => setShowFunction(!showFunction)}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Phone number</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowPhoneNumber(!showPhoneNumber)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Email</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() => setShowEmail(!showEmail)}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Site</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() => setShowSite(!showSite)}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Native language</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowNativeLanguage(!showNativeLanguage)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Other languages</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowOtherLanguage(!showOtherLanguage)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Completed trainings</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowCompletedTraining(!showCompletedTraining)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Psychologist name</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowPsychologistName(!showPsychologistName)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">Psychologist photo</p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowPsychologistPhoto(!showPsychologistPhoto)
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        Psychologist phone number
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowPsychologistNumber(!showPsychologistNumber)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <div className="d-flex gap-2">
                          <p className="fs-11 fw-500 black">Emergency icon </p>
                          <img src={editAsset} width="12px" height="12px" />
                          <img
                            src={deleteBlankAsset}
                            width="11px"
                            height="11.69px"
                            className="pointer"
                          />
                        </div>
                        <div className="ms-auto">
                          <Toggle
                            className="Medium"
                            onChangeHandler={() =>
                              setShowEmergencyIcon(!showEmergencyIcon)
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center pt-2 pb-2 choosefileDiv mt-2">
                        <input type="file" className="choosefile" />
                        <div className="d-flex gap-3">
                          <p
                            className="fs-10 fw-400 text-center"
                            style={{ color: "#AAAAAA" }}
                          >
                            Drag and drop your default icon here
                            <br />
                            Or browse files
                          </p>
                          <img src={uploadAsset} width="30px" height="21px" />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <p className="fs-11 fw-500 black">
                          Emergency phone number{" "}
                        </p>
                      </div>
                      <div className="ms-auto">
                        <Toggle
                          className="Medium"
                          onChangeHandler={() =>
                            setShowEmergencyNumber(!showEmergencyNumber)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-7">
              {!showBadgeVisible && (
                <div className="row">
                  <div className="col-lg-12">
                    <p
                      className="fs-14 fw-500 text-center mt-4"
                      style={{ color: "#AEAEAE", fontStyle: "italic" }}
                    >
                      Badge is disabled for this company!
                    </p>
                  </div>
                </div>
              )}

              {showBadgeVisible && (
                <div>
                  <div className="row">
                    <div className="col-lg-12">
                      <label
                        className="fs-12 fw-550"
                        style={{ color: "#AEAEAE" }}
                      >
                        Front
                      </label>
                      <div
                        className="border p-3 bg-white"
                        style={{ height: "180px" }}
                      >
                        <div className="row">
                          <div className="col-lg-6 mt-3">
                            <div>
                              <div className="media d-flex">
                                {showProfile && (
                                  <img
                                    className="me-3"
                                    src={profilePageAsset}
                                    width="50px"
                                    height="50px"
                                    alt="profile"
                                  />
                                )}
                                <div className="media-body">
                                  {showWorkerName && (
                                    <h5 className="mt-0 fs-12 fw-500">
                                      Blaise DEFLOO
                                    </h5>
                                  )}
                                  {showFunction && (
                                    <div>
                                      <p className="function">Electrician</p>
                                      <p
                                        className="border-bottom"
                                        style={{ width: "17px" }}
                                      ></p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="media d-flex mt-2">
                                {showProfile && (
                                  <img
                                    className="me-3"
                                    src={qrcodeAsset}
                                    width="50px"
                                    height="50px"
                                    alt="profile"
                                  />
                                )}

                                <div
                                  className="media-body"
                                  style={{ marginTop: "-18px" }}
                                >
                                  {showPhoneNumber && (
                                    <h5 className="mt-0 contactDetail">
                                      +32 4 227 18 08{" "}
                                    </h5>
                                  )}
                                  {showEmail && (
                                    <h5 className="mt-0 contactDetail">
                                      info@newelec.be
                                    </h5>
                                  )}
                                  {showSite && (
                                    <h5 className="mt-0 contactDetail">
                                      Site: Hainaut
                                    </h5>
                                  )}
                                  {showOtherLanguage && (
                                    <div className="d-flex gap-2">
                                      <img
                                        src={englishAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                      <img
                                        src={franceAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                      <img
                                        src={nederlandsAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 ">
                            <div>
                              {showCompanyLogo && (
                                <div className="d-flex">
                                  <img
                                    src={newlecLogoAsset}
                                    width="80px"
                                    height="24px"
                                    className="ms-auto"
                                  />
                                </div>
                              )}
                              {showCompletedTraining && (
                                <div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <label
                        className="fs-12 fw-550"
                        style={{ color: "#AEAEAE" }}
                      >
                        Back
                      </label>
                      <div
                        className="border p-3 bg-white"
                        style={{ height: "200px" }}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="d-flex align-items-start">
                              <div className="media d-flex">
                                {showPsychologistPhoto && (
                                  <img
                                    className="me-3"
                                    src={phycoProfileAsset}
                                    width="48px"
                                    height="48px"
                                    alt="profile"
                                  />
                                )}
                                <div className="media-body">
                                  {showPsychologistName && (
                                    <div>
                                      <h5 className="mt-0 fs-12 fw-500">
                                        Fletcher LABROSSE
                                      </h5>
                                      <p className="function">Psychologist</p>
                                      <p
                                        className="border-bottom mb-0"
                                        style={{ width: "17px" }}
                                      ></p>
                                    </div>
                                  )}
                                  {showPsychologistNumber && (
                                    <div>
                                      <p className="contactDetail">
                                        06 11 00 00 00{" "}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="media d-flex align-items-center ms-auto">
                                {showEmergencyIcon && (
                                  <img
                                    className="me-2"
                                    src={aidAsset}
                                    width="18px"
                                    height="20px"
                                    alt="profile"
                                  />
                                )}
                                {showEmergencyNumber && (
                                  <div className="media-body">
                                    <h5
                                      className="mt-0 contactDetail"
                                      style={{ lineHeight: "1" }}
                                    >
                                      06 11 22 33 44
                                    </h5>
                                    <p className="function">Call for help</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 ">
                            <div>
                              <div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div>
            <img src={newlecLogoAsset} width="90px" height="27px" />
          </div>
          <div className="d-flex gap-3">
            <Button
              label="Cancel"
              buttonStyle="cancel mr-2"
              onClick={props.manageWorkerModalHandler}
            />
            <Button label="Done" buttonStyle="addnew_btn pe-3 ps-3" />
          </div>
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default ManageWorkerBadge;
