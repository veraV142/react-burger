import React, {useEffect, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.styles.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay.component";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IModal {
  children?: ReactNode,
  header?: string,
  onClose: () => void,
  showed: boolean
}

const Modal = (props:IModal) => {
    const { children, header, onClose, showed } = props;
    const modalRoot:Element|DocumentFragment = document.getElementById("react-modals")??new HTMLElement();

    useEffect(() => {
        const closePopupWithEsc = (evt:KeyboardEvent) => {
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
                <button className={styles.close_btn} onClick={() => onClose()} data-cy={`close-modal-button`}>
                    <CloseIcon type="primary" />
                </button>
                <h3 className={`mt-10 ml-10 mr-10 text text_type_main-large ${styles.header}`}>{header}</h3>
                {children}
            </div>
            <ModalOverlay active={showed} onClose={onClose} />
        </div>
        , 
        modalRoot
    );
  }


  export default Modal;