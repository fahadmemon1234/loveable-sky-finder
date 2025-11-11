// import React from "react";

// type LargeModalProps = {
//   title: string;
//   largeModalView: React.ReactNode;
//   onClose: () => void;
//   onSave: (e: React.FormEvent) => void;
//   show: boolean;
// };

// const LargeModal: React.FC<LargeModalProps> = ({
//   title,
//   largeModalView,
//   onClose,
//   onSave,
//   show,
// }) => {
//   const handleOutsideClick = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <>
//       <div
//         className={`modal fade ${show ? "show" : ""}`}
//         id="largeModal"
//         tabIndex={-1}
//         aria-modal="true"
//         role="dialog"
//         style={{ display: show ? "block" : "none" }}
//         onClick={handleOutsideClick}
//       >
//         <div className="modal-dialog modal-lg d-flex align-items-center justify-content-center" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel2">
//                 {title}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={onClose}
//               ></button>
//             </div>
//             <div className="modal-body">{largeModalView}</div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-label-secondary waves-effect"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary waves-effect waves-light"
//                 onClick={onSave}
//               >
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {show && <div className="modal-backdrop fade show"></div>}
//     </>
//   );
// };

// export default LargeModal;


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
        <Button variant="primary" onClick={onSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LargeModal;
