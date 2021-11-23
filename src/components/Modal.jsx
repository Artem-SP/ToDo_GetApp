import React from "react";
import "./Modal.css";

export const Modal = (props) => {
  return (
    <div
      className={`modal__wrapper ${props.isOpened ? "open" : "close"}`}
      style={{ ...props.style }}
    >
      <div>
        <div className="modal__body">
          <div className="modal__close" onClick={props.onModalClose}>
            ×
          </div>
          <h2>{props.title}</h2>
          <hr />
          {props.children}
        </div>
      </div>
    </div>
  );
};
