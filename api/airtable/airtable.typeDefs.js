const { gql } = require('apollo-server-lambda');

const airtableTypeDefs = gql`
  type User {
    id: ID!
    age: Int!
    name: String!
    email: String!
  }

  #Input
  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }
  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    age: Int
  }

  #Queries
  type Query {
    getUsers: [User!]!
    getUserById(id: ID!): User
  }

  #Mutation
  type Mutation {
    createUser(createUserInput: CreateUserInput): User!
    updateUser(updateUserInput: UpdateUserInput): User!
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = airtableTypeDefs;
