import React from "react";
import { Modal } from "react-bootstrap";
import "./Modal.css";
import Button from "../Button/Button";
import ModelComponent from "../../components/Model/Model";

const DeleteModal = (props) => {
  
  return (
    <>
      <ModelComponent
        size="sm"
        show={true}
        handleClose={props.handleCloseDeleteModal}
        title="Delete Confirmation"
      >
      {props.children}
        <Modal.Body>
          <p className="delete_text fontsize-12">
            {props.deleteMessage}
            <span className="lang"> "{props.targetName}"</span>. Are you sure you
            want to delete it?
          </p>
          <p className="del-text">{props.warningText}</p>
          <div className="d-flex justify-content-end">
            <Button
              label="Delete Anyway"
              buttonStyle="deleteanyway_btn"
              loading={props.loading}
              status="delete"
              onClick={() => {
                props.action(props)
                
              }}
            />
          </div>
        </Modal.Body>
      </ModelComponent>
    </>
  );
};

export default DeleteModal;

//props.handleCloseDeleteModal()