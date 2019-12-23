const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server");
const myGraphQLSchema = require("./express-graphql-be/schema/schema");
const cors = require("cors");

// schema
const resolvers = require("./schema/resolvers");
const types = require("./schema/types");
const PORT = 4000;

const app = express();
app.use(cors());

// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     author: "J.K. Rowling"
//   },
//   {
//     title: "Jurassic Park",
//     author: "Michael Crichton"
//   }
// ];

// // Resolvers define the technique for fetching the types defined in the
// // schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books
//   }
// };

const server = new ApolloServer({ typeDefs: types, resolvers });

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
