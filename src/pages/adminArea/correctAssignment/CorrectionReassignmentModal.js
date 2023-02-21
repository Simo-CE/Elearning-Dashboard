import React from "react";
import ModalComponent from "../../../components/Model/Model";
import Button from "../../../components/Button/Button";
import { Modal } from "react-bootstrap";
import { infoAsset, profilePageAsset } from "../../../assets";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const CorrectionReassignmentModal = (props) => {
  const renderTooltip = (props) => (
    <Popover id="popover-basic" {...props}>
      <Popover.Body>
        You can assign only <br />
        managers working on <br />
        the same department <br />
        of the current assignee
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <ModalComponent
        size="md"
        show={true}
        handleClose={props.correctionReassignmentModalHandler}
        title="Correction Reassignment"
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-lg-4">
              <p className="fs-12 fw-500" style={{ color: "#7C7C7C" }}>
                Current Assignee
              </p>
              <div className="d-flex gap-2 align-items-center mt-2">
                <img
                  src={profilePageAsset}
                  width="35px"
                  height="35px"
                  className="rounded-circle"
                  alt=""
                />
                <div>
                  <p className="fs-12 fw-500">Auriville Savoie</p>
                  <p className="fs-11 fw-500" style={{ color: "#ADADAD" }}>
                    QHSE
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex">
                <p className="fs-12 fw-500" style={{ color: "#7C7C7C" }}>
                  Current Assignee
                </p>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <img
                    src={infoAsset}
                    width="16px"
                    height="16px"
                    className="ml-auto"
                    alt=""
                  />
                </OverlayTrigger>
              </div>
              <select className="form-select w-100 mt-2">
                <option value="">Select manager</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Cancel"
            buttonStyle="cancel mr-2"
            onClick={props.correctionReassignmentModalHandler}
          />
          <Button label="Submit" buttonStyle="addnew_btn pe-3 ps-3" />
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default CorrectionReassignmentModal;
