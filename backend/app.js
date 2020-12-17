const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const routes = require("./routes/index");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "5fbd1f588f56df5d4559932d",
  };

  next();
});

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => { console.log(`listening to port: ${PORT}`); });
