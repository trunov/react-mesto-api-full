const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: "Нет пользователей" });
      } else {
        res.status(200).send({ data: users });
      }
    })
    .catch(() => {
      res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.send(user);
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

module.exports.createUser = (req, res) => {

  const { email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      email: email,
      password: hash,
    }))
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(400).send(err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", name: user.name, about: user.about });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" }
      );

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", avatar: user.avatar });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
