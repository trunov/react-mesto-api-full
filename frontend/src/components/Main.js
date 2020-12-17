import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              owner={item.owner}
              src={item.link}
              alt={item.alt}
              title={item.name}
              likes={item.likes}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;