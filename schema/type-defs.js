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