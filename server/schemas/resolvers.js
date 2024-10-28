const {
    createUser,
    getSingleUser,
    saveBook,
    deleteBook,
    login,
  } = require('../controllers/user-controller'); // Ensure this path is correct
  
  const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        return getSingleUser(context);
      },
    },
    Mutation: {
      login: async (parent, { email, password }) => {
        return login({ email, password });
      },
      createUser: async (parent, { username, email, password }) => {
        return createUser({ username, email, password });
      },
      saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
        return saveBook({ bookId, authors, description, title, image, link }, context);
      },
      deleteBook: async (parent, { bookId }, context) => {
        return deleteBook({ bookId }, context);
      },
    },
  };
  
  module.exports = resolvers;