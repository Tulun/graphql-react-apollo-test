import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spin, Alert, List, Typography } from "antd";
import { Link } from "react-router-dom";

import AddUserForm from "./AddUserForm";
import "./Users.scss";

const { Item } = List;
const { Text } = Typography;

const query = gql`
  {
    users {
      id
      firstName
      age
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(query);
  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message={`Error with users fetch: ${error.message}`}
        type="error"
      />
    );

  console.log("data", data);

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
