import React from "react";
import styles from "./modal-overlay.styles.module.css";

const ModalOverlay = ({ active, setActive }) => {
  
  return (
    <div className={active ? `${styles.on_overlay}` : `${styles.off_overlay}`} onClick = {() => setActive(false)} />
  );
};

export default ModalOverlay;