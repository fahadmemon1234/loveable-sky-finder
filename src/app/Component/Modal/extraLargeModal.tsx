import React from "react";
import { Modal, Button } from "react-bootstrap";

type ExtraLargeModalProps = {
  title: string;
  extralargeModalView: React.ReactNode;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  show: boolean;
};

const ExtraLargeModal: React.FC<ExtraLargeModalProps> = ({
  title,
  extralargeModalView,
  onClose,
  onSave,
  show,
}) => {
  return (
    <>
      <Modal show={show} onHide={onClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{extralargeModalView}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExtraLargeModal;
