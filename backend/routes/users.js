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

usersRouter.get("/users", getUsers);
usersRouter.get("/users/:id", getUser);
usersRouter.post('/signup', createUser);
usersRouter.post('/signin', login);
usersRouter.patch("/users/me", updateUser);
usersRouter.patch("/users/me/avatar", updateAvatar);



module.exports = usersRouter;
