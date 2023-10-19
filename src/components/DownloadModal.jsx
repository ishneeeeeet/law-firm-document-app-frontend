
import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  Container,
  CardHeader,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip,
} from "reactstrap";

const downloadModal = (download, isOpen,setOpenModal) => {
  console.log("model called", isOpen, setOpenModal)
    return (
        <Modal
            isOpen={isOpen}
            toggle={() => {
              setOpenModal(!isOpen);
            }}
            backdrop={"static"}
            id="staticBackdrop"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setOpenModal(false);
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Process is completed, Please download the file. 
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Download & Update
              </button>
              <button type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </Modal>
    )
}

export default downloadModal