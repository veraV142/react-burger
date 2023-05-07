import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.styles.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay.component";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

const Modal = (props) => {
    const { children, header, onClose, showed } = props;
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const closePopupWithEsc = (evt) => {
          if (evt.key === "Escape") {
            onClose();
          }
        };
        window.addEventListener("keydown", closePopupWithEsc);

        return () => document.removeEventListener("keydown", closePopupWithEsc) 
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={styles.panel}>
            <div className={` ${showed ? `${styles.on_content}` : `${styles.off_content}`}`}>
                <button className={styles.close_btn} onClick={() => onClose()}>
                    <CloseIcon type="primary" />
                </button>
                <h3 className={`mt-10 ml-10 mr-10 text text_type_main-large ${styles.header}`}>{header}</h3>
                {children}
            </div>
            <ModalOverlay active={showed} setActive={onClose} />
        </div>
        , 
        modalRoot
    );
  }

  Modal.propTypes = {
    children: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    showed: PropTypes.bool.isRequired
  }

  export default Modal;