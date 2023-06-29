import React from "react";
import styles from "./modal-overlay.styles.module.css";

interface IModalOverlay {
  onClose: () => void,
  active: boolean
}

const ModalOverlay = (props:IModalOverlay) => {
  const { active, onClose } = props;
  return (
    <div className={active ? `${styles.on_overlay}` : `${styles.off_overlay}`} onClick = {() => onClose()} />
  );
};

export default ModalOverlay;