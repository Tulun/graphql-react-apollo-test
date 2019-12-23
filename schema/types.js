const { gql } = require("apollo-server");

const types = gql`
  type Subscription {
    postAdded: Post
  }

  type Mutation {
    addUser(firstName: String!, age: Int): User
    editUser(id: String!, firstName: String, age: Int): User
    deleteUser(id: String!): User
  }

  type User {
    id: String
    firstName: String
    age: Int
  }

  type Post {
    id: String
    content: String
    userId: String
    likes: Int
  }

  type Query {
    users: [User]
    user(id: String!): User
    posts: [Post]
    post(id: String!): Post
  }
`;

module.exports = types;
