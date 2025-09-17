const { UserList } = require("../TestData");

const resolvers = {
    // Query: {
    //     // USER RESOLVERS
    //     users: () => {
    //     return UserList;
    //     },
    //     user: (parent, args) => {
    //     const id = args.id;
    //     const user = _.find(UserList, { id: Number(id) });
    //     return user;
    //     },
    // }

     Query: {
        // USER RESOLVERS
        users () {
            return UserList;
        },
    },
};