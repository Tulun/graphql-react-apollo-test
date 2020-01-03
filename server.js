const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const http = require("http");

// schema
const resolvers = require("./schema/resolvers");
const types = require("./schema/types");
const PORT = 4000;

const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs: types,
  resolvers,
  tracing: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      console.log("hit onConnect", webSocket);
      return true;
      // if (connectionParams.authToken) {
      //   return validateToken(connectionParams.authToken)
      //     .then(findUser(connectionParams.authToken))
      //     .then(user => {
      //       return {
      //         currentUser: user
      //       };
      //     });
      // }

      // throw new Error("Missing auth token!");
    }
  },
  context: async ({ req, connection }) => {
    console.log("Hit here: Connection param:", connection);
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  }
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// The `listen` method launches a web server.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
