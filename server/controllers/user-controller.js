const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ username, email, password }) {
    const user = await User.create({ username, email, password });

    if (!user) {
      throw new Error('Something went wrong!');
    }
    const token = signToken(user);
    return { token, user };
  },

  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ email, password }) {
    const user = await User.findOne({ $or: [{ username: email }, { email }] });
    if (!user) {
      throw new Error("Can't find this user");
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new Error('Wrong password!');
    }
    const token = signToken(user);
    return { token, user };
  },

  // other methods...
};