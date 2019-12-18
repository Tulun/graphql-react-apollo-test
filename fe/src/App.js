// Dependencies
import React from "react";
import { BrowserRouter } from "react-router-dom";

// Components
import Routes from "./Routes";

// Styles
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
