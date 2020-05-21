import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {
  const el = document.createElement("div");

  const appendChild = useCallback(() => {
    modalRoot.appendChild(el);
  }, [el]);

  useEffect(() => {
    appendChild();
  }, [appendChild]);

  return ReactDOM.createPortal(props.children, el);
};

export default Modal;
