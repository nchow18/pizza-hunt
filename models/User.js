const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      validate: /[a-z]/
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      validate: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Friend'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// // get total count of thoughts
// UserSchema.virtual('thoughtCount').get(function() {
//   return this.thoughts.reduce((total, thoughts) => total + thoughts.length + 1, 0);
// });

// get total count of thoughts
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// UserSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')

const User = model('User', UserSchema);


module.exports = User;