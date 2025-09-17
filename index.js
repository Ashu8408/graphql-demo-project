const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");


const server = new ApolloServer({ typeDefs, resolvers });
// resolvers are the fn which deals with the data

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`API is running correctly at ${url}`);
});
