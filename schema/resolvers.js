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

  User: {
    companyWorkingIn: () => {
       return _.filter(CompanyList, (company) => {
        const year = new Date(company.dateOfJoining).getFullYear();
        return year >= 2000 && year <= 2010;
      });
    }
  },

  Mutation: {
    createUser: (parent ,args) => {
      const user = args.input
      // console.log("user = args.input works == chekcking by accessing user=", user);
      const lastId = UserList[UserList.length-1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    }
  }
};

module.exports = { resolvers };