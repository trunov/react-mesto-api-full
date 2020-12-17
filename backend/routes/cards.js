const router = require("express").Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");

router.get("/cards", getCards);
router.get("/cards/:id", getCard);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id/likes", likeCard);
router.delete("/cards/:id/likes", dislikeCard);

module.exports = router;
