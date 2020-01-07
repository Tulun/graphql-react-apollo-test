const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const http = require("http");

// schema
const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/types");
const PORT = 4000;

// Basic Node server.
const app = express();
app.use(cors());

// Setup for the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      // Do something when they connect
    }
  },
  onDisconnect: (webSocket, context) => {
    // Do something when they disconnect
  },
  context: async ({ req, connection }) => {
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
