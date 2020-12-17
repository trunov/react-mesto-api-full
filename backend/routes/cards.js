const router = require("express").Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");

const auth = require("../middlewares/auth");

router.get("/cards", auth, getCards);
router.get("/cards/:id", auth, getCard);
router.post("/cards", auth, createCard);
router.delete("/cards/:id", auth, deleteCard);
router.put("/cards/:id/likes", auth, likeCard);
router.delete("/cards/:id/likes", auth, dislikeCard);

module.exports = router;
