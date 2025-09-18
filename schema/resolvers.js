const { UserList } = require("../TestData");
const _ = require("lodash");

const resolvers = {

  Query: {
    users: () => {
      return UserList; 
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      // id: Number(id) typecasting forcefully here because if don't, we will get id as a string which will give error
      return user;
    },
  },
};

module.exports = { resolvers };