import React from "react";
import Ok from "./svg/Ok";
import Error from "./svg/Error";

function InfoToolTip({ isOpen, onClose, title, icon }) {
  
  return (
    <div className={`popup popup-info ${isOpen && "popup_open"}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        {icon ? <Ok /> : <Error /> }
        <h2 className="popup__title popup__title_info">{title}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
