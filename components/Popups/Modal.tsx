import React, { ReactNode } from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
  open: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
  if (!open) return null;

  return (
    <div className={styles.overlayStyle}>
      <div className={styles.modal}>
        {/* <button onClick={onClose}>Close Modal</button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
