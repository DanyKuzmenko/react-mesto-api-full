const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound(`Карточки с id:${req.params.cardId} не существует`);
    })
    .then((user) => {
      if (user.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Вы не можете удалять чужие карточки');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((card) => res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          _id: card._id,
        }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound(`Карточки с id:${req.params.cardId} не существует`);
    })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound(`Карточки с id:${req.params.cardId} не существует`);
    })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные для снятия лайка'));
      } else {
        next(err);
      }
    });
};
