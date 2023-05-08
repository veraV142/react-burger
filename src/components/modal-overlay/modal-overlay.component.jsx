import React from "react";
import styles from "./modal-overlay.styles.module.css";
import PropTypes from 'prop-types'

const ModalOverlay = (props) => {
  const { active, setActive } = props;
  return (
    <div className={active ? `${styles.on_overlay}` : `${styles.off_overlay}`} onClick = {() => setActive(false)} />
  );
};

ModalOverlay.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired
}

export default ModalOverlay;