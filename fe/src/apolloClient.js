import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";

// What this does is track ALL your data by a unique id. You inform Apollo what will uniquely identify each data point
// In our case, each record has a unique id property.
// If it's different, then specify a different id.
// This will NOT work on added or deleted data, as this is done on initialization; you will have to do extra work around this.
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id || null
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const subClient = new SubscriptionClient(`ws://localhost:4000/graphql`, {
  reconnect: true,
  timeout: 20000,
  lazy: true
});

// const subClient = new SubscriptionClient({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//     timeout: 20000,
//     lazy: true
//   }
// });

const wsLink = new WebSocketLink(subClient);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    console.log("definition", definition.operation);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache
});

export default client;
