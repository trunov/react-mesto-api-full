import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonTitle={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__text popup__text_type_link"
        id="link-input"
        ref={avatarRef}
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
