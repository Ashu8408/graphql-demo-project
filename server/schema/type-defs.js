const { gql } = require("apollo-server");

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
        friends: [User]
        companyWorkingIn: [Company]
    }

    type Company {
        id: ID!
        name: String!
        dateOfJoining: String!
        isWorking: Boolean!
    }


    type Query {
        users: [User!]!
        user(id: ID!): User!

        companies: [Company!]!
        company(name: String!): Company!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int = 18           # this makes it default set to 18 if not given input
        nationality: Nationality = INDIA
        # friends: [User]
        # companyWorkingIn: [Company]
        # passing friends and company here is not good and not possiblem find anaother way to pass
    }

    input updateUsernameInput {
        id: ID!
        newUsername: String!
    }

    input deleteUsernameInput {
        username: String!
    }

    type Mutation {
        # whenever we run a mutation we return it's new updated values
        # createUser( name: String!, age: Int! ==all other fields here== ): User!     // one way of defining
        
        createUser( input: CreateUserInput! ): User        # smart way of mutating by taking details as input
        updateUsername( input: updateUsernameInput! ): User
        deleteUser( id: ID! ): User
        deleteUserByUserName(username: String!): User

    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
        UKRAINE
    }
`;


module.exports = { typeDefs }