import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Alert, List, Typography } from "antd";
import { Link } from "react-router-dom";

import fetchUsers from "../../queries/fetchUsers";
import AddUserForm from "./AddUserForm";
import "./Users.scss";

const { Item } = List;
const { Text } = Typography;

const Users = () => {
  const { loading, error, data } = useQuery(fetchUsers);
  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message={`Error with users fetch: ${error.message}`}
        type="error"
      />
    );

  return (
    <div>
      <List
        header={<div>Users</div>}
        bordered
        dataSource={data.users}
        renderItem={({ firstName, id }) => {
          return (
            <Item className="user-list-item">
              <Link to={`/user/${id}`}>
                <Text mark>{firstName}</Text>
                <Text className="user-span">{id}</Text>
              </Link>
            </Item>
          );
        }}
      />
      <AddUserForm />
    </div>
  );
};

export default Users;
