const { ApolloServer, gql } = require('apollo-server-lambda');
const airtableResolvers = require('./airtable/airtable.resolvers');
const airtableTypeDefs = require('./airtable/airtable.typeDefs');

const server = new ApolloServer({
  typeDefs: airtableTypeDefs,
  resolvers: airtableResolvers,
});

exports.handler = server.createHandler();
