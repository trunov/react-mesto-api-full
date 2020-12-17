const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: "Карточки не найдены" });
      } else {
        res.send(cards);
      }
    })
    .catch(() => {
      res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Нет карточки с таким id" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        res.status(404).send({ message: "карточка не найдена, код ошибки 404" });
      } else {
        res.send(deleted);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "карточка не найдена, код ошибки 404" });
      } else {
        res
          .status(200)
          .send({ message: "лайк был поставлен данной карточке", card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "карточка не найдена, код ошибки 404" });
      } else {
        res
          .status(200)
          .send({ message: "дизлайк был поставлен данной карточке", card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

// thanks for review :)
