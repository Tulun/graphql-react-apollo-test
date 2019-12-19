// Dependencies
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-boost";

// Components
import Routes from "./Routes";

// Styles
import "./App.css";

// What this does is track ALL your data by a unique id. You inform Apollo what will uniquely identify each data point
// In our case, each record has a unique id property.
// If it's different, then specify a different id.
// This will NOT work on added or deleted data, as this is done on initialization; you will have to do extra work around this.
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id || null
});

const link = new HttpLink({
  uri: "http://localhost:4000/"
});

const client = new ApolloClient({
  // link,
  // uri: "http://localhost:4000",
  cache
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
