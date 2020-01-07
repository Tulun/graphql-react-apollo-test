// Dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { withRouter } from "react-router";

import "./Navbar.scss";

const { Item } = Menu;

const Navbar = ({ location }) => {
  const [currentView, setCurrentView] = useState(
    location.pathname !== "/" ? location.pathname.substring(1) : "index"
  );
  return (
    <Menu
      onClick={event => setCurrentView(event.key)}
      selectedKeys={[currentView]}
      mode="horizontal"
    >
      <Item key="index">
        <Link to="/">Home</Link>
      </Item>
      <Item key="users">
        <Link to="/users">Users</Link>
      </Item>
      <Item key="posts">
        <Link to="/posts">Posts</Link>
      </Item>
    </Menu>
  );
};

export default withRouter(Navbar);
