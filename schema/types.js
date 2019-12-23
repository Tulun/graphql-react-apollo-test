const { gql } = require("apollo-server");

const types = gql`
  type User {
    id: String!
    firstName: String!
    age: Int
  }

  type Post {
    id: String!
    content: String!
    userId: String!
    likes: Int
  }

  type Query {
    users: [User]
    posts: [Post]
    user(id: String!): User
  }
`;

module.exports = types;
