import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      buttonTitle={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        name="name"
        type="text"
        placeholder="Жак-Ив Кусто"
        className="popup__text popup__text_type_name"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="name-error"></span>
      <input
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        name="description"
        type="text"
        placeholder="Исследователь океана"
        className="popup__text popup__text_type_description"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error" id="description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
