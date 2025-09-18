const { UserList, CompanyList } = require("../TestData");
const _ = require("lodash");

const resolvers = {

  Query: {
    //User resolvers
    users: () => {
      return UserList; 
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      // id: Number(id) typecasting forcefully here because if don't, we will get id as a string which will give error
      return user;
    },

    //Company resolvers
    companies: () => {
      return CompanyList;
    },
    company: (parent, args) => {
      const name = args.name;
      const company = _.find(CompanyList, { name });
      return company;

    },
  },
};

module.exports = { resolvers };