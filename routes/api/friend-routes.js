const router = require('express').Router();

const {
    addFriend,
    removeFriend
  } = require('../../controllers/friend-controller');

// /api/friends/<user-id>
router
  .route('/:userId')
  .post(addFriend);

// /api/friends/<user-id>/<friend-id>
router
  .route('/:userId/:friendId')
  .delete(removeFriend);

module.exports = router;