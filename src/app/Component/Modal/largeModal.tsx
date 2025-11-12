import React from "react";
import { Modal, Button } from "react-bootstrap";

type LargeModalProps = {
  title: string;
  largeModalView: React.ReactNode;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  show: boolean;
};

const LargeModal: React.FC<LargeModalProps> = ({ title, largeModalView, onClose, onSave, show }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{largeModalView}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="btn-custom" onClick={onSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LargeModal;
