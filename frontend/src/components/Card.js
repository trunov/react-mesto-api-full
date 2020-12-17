import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  src,
  alt,
  title,
  likes,
  owner,
  id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const card = {
    _id: id,
    link: src,
    name: title,
    owner: owner,
    likes: likes,
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const deleteButton = `cards__element-remove ${
    isOwn ? "" : "cards__element-remove_hidden"
  }`;
  const likeButton = `cards__element-button ${
    isLiked ? "cards__element-button_active" : ""
  }`;

  function handleClick() {
    onCardClick({ link: src, name: title });
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className="cards__element">
      <img
        className="cards__element-img"
        src={src}
        alt={alt}
        onClick={handleClick}
      />
      <button
        className={deleteButton}
        type="button"
        title="Удалить"
        onClick={handleDelete}
      ></button>
      <div className="cards__description">
        <h2 className="cards__element-title">{title}</h2>
        <div className="cards__element-wrap">
          <button
            className={likeButton}
            type="button"
            title="Нравится"
            onClick={handleLike}
          ></button>
          <p className="cards__element-like">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
