const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv").config();

const {
  errors,
  celebrate,
  Joi,
  CelebrateError,
} = require("celebrate");

const validator = require("validator");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { login, createUser } = require("./controllers/users.js");

const routes = require("./routes/index");

const NotFoundError = require("./errors/NotFoundError");

const PORT = 3001;
const app = express();

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError("Неверный URL");
      }
      return url;
    }),
  }),
});

const allowedCors = [
  "https://concept.students.nomoredomains.work",
  "http://localhost:3000",
];

app.use(cors({
  origin: allowedCors,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb2", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", validateUserLogin, login);
app.post("/signup", validateUserSignup, createUser);

app.use(routes);

app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => { console.log(`listening to port: ${PORT}`); });
