import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spin, Alert } from "antd";

const query = gql`
  {
    posts {
      id
      content
      user {
        id
        firstName
      }
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
  return <div>Users route</div>;
};

export default Users;
