const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/type-defs");


const server = new ApolloServer({ typeDefs, resolvers });
// resolvers are the fn which deals with the data

server.listen().then( ({url}) => {
    console.log("API is running correctly from the URL===${url}==:", )
})
