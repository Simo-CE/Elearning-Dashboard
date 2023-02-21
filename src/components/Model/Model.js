import React, { Children, useState } from "react";
import "./Modal.css";
import "../ResponsiveText.css";
import { Modal, NavLink } from "react-bootstrap";
import paths from "../../routes/paths";
import { useNavigate } from "react-router-dom";

export default function ({
  show,
  size,
  icon,
  title,
  handleClose,
  children,
  className,
  state,
}) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <Modal
      size={size}
      show={visible}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className={className}
      centered
    >
      <Modal.Header closeButton>
      <img
          src={icon}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => navigate(paths.viewParticipant, { state })}
        />
        <Modal.Title className="d-flex">
          <h5 className="title fontsize-15">{title}</h5>
        </Modal.Title>
        
      </Modal.Header>
      {children}
    </Modal>
  );
}
