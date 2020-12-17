import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name={"image"}
      title={"Новое место"}
      buttonTitle={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="1"
        maxLength="30"
        autoComplete="off"
        name="title"
        type="text"
        placeholder="Название"
        className="popup__text popup__text_type_title"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="title-error"></span>
      <input
        required
        autoComplete="off"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__text popup__text_type_link"
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
