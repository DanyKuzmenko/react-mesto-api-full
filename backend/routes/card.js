const express = require('express');
const {
  celebrate,
  Joi, Segments,
} = require('celebrate');

const router = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
