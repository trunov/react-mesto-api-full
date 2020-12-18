const usersRouter = require("express").Router();
const { celebrate, Joi, CelebrateError } = require("celebrate");
const validator = require("validator");

const {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  updateAvatar,
  getUserById,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.required().custom((url) => {
      if (!validator.isUrl(url)) {
        throw new CelebrateError("Неверный url");
      }
      return url;
    }),
  }),
});

usersRouter.get("/users", auth, getUsers);
usersRouter.get("/users/me", auth, validateId, getUser);
usersRouter.get("/users/:_id", auth, validateId, getUserById);
usersRouter.post("/signup", validateUser, createUser);
usersRouter.post("/signin", validateUser, login);
usersRouter.patch("/users/me", auth, validateUserUpdate, updateUser);
usersRouter.patch("/users/me/avatar", auth, validateUserAvatar, updateAvatar);

module.exports = usersRouter;
