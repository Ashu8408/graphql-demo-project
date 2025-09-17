const { UserList } = require("../TestData");

const resolvers = {

  Query: {
    users: () => {
      return UserList; 
    },
  },
};

module.exports = { resolvers };