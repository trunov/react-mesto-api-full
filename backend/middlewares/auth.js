const jwt = require("jsonwebtoken");

const UnauthError = require("../errors/UnauthError");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthError("Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === "production" ? JWT_SECRET : "dev-secret"}`);
  } catch (err) {
    throw new UnauthError("Необходима авторизация");
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
