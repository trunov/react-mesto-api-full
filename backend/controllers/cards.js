const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError("Карточки не найдены");
      } else {
        res.send(cards);
      }
    })
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карточки с таким id");
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("invalid id"));
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Ошибка валидации. Введены некорректные данные"));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .select("+owner")
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Нельзя удалить чужую карточку!");
      }
    })
    .then(() => {
      Card.findByIdAndRemove(req.params.id)
        .then((card) => {
          if (!card) {
            throw new NotFoundError("Запрашиваемый ресурс не найден");
          }
          res.send(card);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("карточка не найдена, код ошибки 404");
      } else {
        res
          .status(200)
          .send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("invalid id"));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("карточка не найдена, код ошибки 404");
      } else {
        res
          .status(200)
          .send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("invalid id"));
      }
      next(err);
    });
};
