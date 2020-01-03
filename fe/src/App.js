// Dependencies
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apolloClient";

// Components
import Routes from "./Routes";

// Styles
import "./App.css";

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
