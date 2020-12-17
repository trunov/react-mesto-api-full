import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../api/Auth";
import { api } from "../api/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isPopupInfo, setIsPopupInfo] = React.useState(false);
  const [isDataSet, setIsDataSet] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });

  const [infoData, setInfoData] = useState({
    title: "Что-то пошло не так! Попробуйте ещё раз.",
    icon: false,
  });

  const [userData, setUserData] = useState({
    email: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleProfile() {
    setIsProfilePopupOpen(true);
  }

  function handlePlace() {
    setIsPlacePopupOpen(true);
  }

  function handleAvatar() {
    setIsAvatarPopupOpen(true);
  }

  function handleInfo() {
    setIsPopupInfo(true);
  }

  function handleCard(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
      alt: card.alt,
    });
  }

  function setupCards(cards) {
    setCards(
      cards.map((item) => ({
        _id: item._id,
        link: item.link,
        name: item.name,
        owner: item.owner,
        likes: item.likes,
      }))
    );
  }

  function handleUpdateUser({ name, description }) {
    api
      .editProfile({ name, description })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);

        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then(handleResponse)
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({ email: "" });
    setLoggedIn(false);
  };

  const handleResponse = (data) => {
    auth
      .getContent(data.token)
      .then((res) => {
        setUserData({ email: res.data.email });
      })
      .catch((err) => console.log(err));

    localStorage.setItem("token", data.token);

    setLoggedIn(true);
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then(() => {
        setIsDataSet(true);
        history.push("/sign-in");
        setInfoData({ icon: true, title: "Вы успешно зарегистрировались!" });
        handleInfo();
      })
      .catch(() => {
        setIsDataSet(false);
        setInfoData({
          icon: false,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfo();
      });
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setUserData({ email: res.data.email });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function handleUpdateAvatar({ link }) {
    api
      .editAvatar({ link })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsPopupInfo(false);
    setSelectedCard({ isOpen: false });
  }

  React.useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then((results) => {
        setCurrentUser(results[0]);
        setupCards(results[1]);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleLogout={handleLogout} email={userData.email} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleProfile}
            onAddPlace={handlePlace}
            onEditAvatar={handleAvatar}
            onCardClick={handleCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} isDataSet={isDataSet} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoToolTip
          isOpen={isPopupInfo}
          onClose={closeAllPopups}
          title={infoData.title}
          icon={infoData.icon}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          link={selectedCard.link}
          title={selectedCard.title}
          isOpen={selectedCard.isOpen}
          alt={selectedCard.alt}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
