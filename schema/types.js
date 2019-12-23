const { gql } = require("apollo-server");

const types = gql`
  type User {
    id: String
    firstName: String
    age: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;

module.exports = types;
