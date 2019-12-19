// Dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { withRouter } from "react-router";

import "./Navbar.scss";

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
      <Menu.Item key="index">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="users">
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="posts">
        <Link to="/posts">Posts</Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navbar);
