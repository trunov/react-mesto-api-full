const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes/index");

const PORT = 3001;
const app = express();

const allowedCors = [
  "https://concept.students.nomoredomains.work",
  "http://localhost:3000",
];

app.use(cors({
  origin: allowedCors,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => { console.log(`listening to port: ${PORT}`); });
