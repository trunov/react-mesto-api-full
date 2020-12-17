import React from "react";

function ImagePopup({ link, alt, title, isOpen, onClose }) {
  return (
    <div className={`popup popup-photo ${isOpen && "popup_open"}`}>
      <div className="popup__photo-container">
        <button
          aria-label="кнопка закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img className="popup__img" src={link} alt={alt} />
        <h2 className="popup__title-photo">{title}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
