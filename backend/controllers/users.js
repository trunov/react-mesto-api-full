const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const UnauthError = require("../errors/UnauthError");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        throw new NotFoundError("Нет пользователей");
      } else {
        res.status(200).send({ data: users });
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("invalid id"));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (req.body.password.length < 8) {
    throw new BadRequestError("Пароль менее 8 символов");
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((newUser) => {
        if (!newUser) {
          throw new NotFoundError("Неправильно переданы данные");
        } else {
          res.send({
            name: newUser.name,
            about: newUser.about,
            avatar: newUser.avatar,
            email: newUser.email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "ValidationError") {
          next(new BadRequestError("Ошибка валидации. Введены некорректные данные"));
        }
        next(err);
      });
  }
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", name: user.name, about: user.about });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthError("Авторизация не пройдена!");
      }
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", avatar: user.avatar });
      }
    })
    .catch(next);
};
