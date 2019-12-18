// Dependencies
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

// Components
import Navbar from "./components/Navbar";
import Index from "./pages/index/Index";
import Posts from "./pages/posts/Posts";
import Users from "./pages/users/Users";

const { Content } = Layout;

const Routes = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Switch>
          <Route path="/" exact>
            <Index />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/posts" exact>
            <Posts />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};

export default Routes;
