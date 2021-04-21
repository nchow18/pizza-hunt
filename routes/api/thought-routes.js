const router = require('express').Router();

const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<user-id>
router
  .route('/:userId')
  .post(addThought);

// /api/thoughts/<user-id>/<thought-id>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought);

// /api/thoughts/<user-id>/<thought-id>/<reaction-id>
router
  .route('/:userId/:thoughtId/:reactionId')
  .delete(removeReaction);

module.exports = router;
