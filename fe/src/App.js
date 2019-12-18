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

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
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
