import React from "react";

function PopupWithForm({
  name,
  title,
  buttonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen && "popup_open"}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>

        <form
          action="#"
          name="popup-form"
          className={`popup__form popup-${name}__form`}
          noValidate
          onSubmit={onSubmit}
        >
          <fieldset className="popup__input-container">
            {children}
            <button type="submit" className="popup__submit-button">
              {buttonTitle}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
