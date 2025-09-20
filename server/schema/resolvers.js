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
      const user = args.input;
      // console.log("user = args.input works == chekcking by accessing user=", user);
      const lastId = UserList[UserList.length-1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent ,args) => {
      // const id = args.input.id;
      // const newUsername = args.input.newUsername;

      const {id, newUsername} = args.input    // clean code
      let updatedUser;
      UserList.forEach((user) => {
        if ( user.id === Number(id) ){
          user.username = newUsername;
          updatedUser = user;
        }
      }); 
      return updatedUser;
    },

    deleteUser: (parent ,args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },

    // deleteUserByUserName: (parent ,args) => {
    //   const { deleteUsername } = args.input
    
    // //  if ( user.id === Number(id) && user.username === deleteUsername ){
    // //     _.remove(UserList, (user) => user.id === Number(id));
    // //     return ("user with ${deleteUsername} deleted");
    // //   }

    // // const userIndex = UserList.findIndex(
    // //   (user) => user.username === deleteUsername );

    // //   if (userIndex === -1) return null; // user not found

    // //   // Remove user and return it
    // //   const deletedUser = UserList[userIndex];
    // //   _.remove(UserList, (u) => u.id === Number(id) && u.username === deleteUsername);

    // //   return deletedUser; // must return User type

    //   _.remove(UserList, (user) => user.username === deleteUsername )
    //   return deleteUsername;
    // },

    deleteUserByUserName: (parent, args) => {
      const { username } = args;
      const userIndex = UserList.findIndex((u) => u.username === username);
      if (userIndex === -1) return null;
      const deletedUser = UserList[userIndex];
      _.remove(UserList, (u) => u.username === username);
      return deletedUser;
    }
  }
};

module.exports = { resolvers };