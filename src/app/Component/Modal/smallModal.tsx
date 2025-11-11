import React from "react";
import { Modal, Button } from "react-bootstrap";

type SmallModalProps = {
  title: string;
  smallModalView: React.ReactNode;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  show: boolean;
};

const SmallModal: React.FC<SmallModalProps> = ({
  title,
  smallModalView,
  onClose,
  onSave,
  show,
}) => {
  return (
    <>
      <Modal show={show} onHide={onClose} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{smallModalView}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" className="btn-custom" onClick={onSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SmallModal;
