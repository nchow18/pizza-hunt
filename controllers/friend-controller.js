const { Friend, User } = require('../models');

const friendController = {

  // add FRIEND to USER
  addFriend({ params, body }, res) {
    console.log(body);
    Friend.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No USER found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove FRIEND from USER
  removeFriend({ params }, res) {
    Friend.findOneAndDelete({ _id: params.friendId })
      .then(deletedFriend => {
        if (!deletedFriend) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No USER found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = friendController;

