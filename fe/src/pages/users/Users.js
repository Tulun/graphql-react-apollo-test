import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Alert, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import fetchUsers from "../../queries/fetchUsers";
import useUserAdded from "../../subscriptions/useUserAdded";

import AddUserForm from "./AddUserForm";
import "./Users.scss";

const { Item } = List;
const { Text } = Typography;

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      firstName
      age
    }
  }
`;

const Users = () => {
  const { data: subscriptionData } = useUserAdded();
  console.log("subscriptionData", subscriptionData);
  const { loading, error, data } = useQuery(fetchUsers);
  const [deletedUserId, setDeletedUserId] = useState("");
  // Update the cache when you create a new user
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: fetchUsers });
      cache.writeQuery({
        query: fetchUsers,
        data: { users: users.filter(user => user.id !== deletedUserId) }
      });
      setDeletedUserId("");
    }
  });

  // Delete userID to the value set
  useEffect(() => {
    if (deletedUserId !== "") {
      deleteUser({
        variables: { id: deletedUserId }
      });
    }
  }, [deletedUserId, deleteUser]);

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
      <AddUserForm />
      <List
        header={<div>Users</div>}
        bordered
        dataSource={data.users}
        renderItem={({ firstName, id }) => {
          return (
            <Item className="user-list-item">
              <Link className="link" to={`/user/${id}`}>
                <Text mark>
                  {firstName} {id}
                </Text>
              </Link>
              <Text
                onClick={() => setDeletedUserId(id)}
                className="user-span delete"
              >
                X
              </Text>
            </Item>
          );
        }}
      />
    </div>
  );
};

export default Users;
