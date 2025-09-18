const { gql } = require("apollo-server");

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
        friends: [User]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
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