const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  updateAvatar
} = require("../controllers/users");

const auth = require("../middlewares/auth");

usersRouter.get("/users", auth, getUsers);
usersRouter.get("/users/me", auth, getUser);
usersRouter.post('/signup', createUser);
usersRouter.post('/signin', login);
usersRouter.patch("/users/me", auth, updateUser);
usersRouter.patch("/users/me/avatar", auth, updateAvatar);



module.exports = usersRouter;
