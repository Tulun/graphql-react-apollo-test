import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spin, Alert, List, Typography } from "antd";

const query = gql`
  query FindUser($id: String) {
    user(id: $id) {
      id
      firstName
      age
    }
  }
`;
const User = ({ match }) => {
  const { loading, error, data } = useQuery(query, {
    variables: { id: match.params.id }
  });

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
      <p>{data.user.firstName}</p>
      <p>{data.user.age || "Age not specified."}</p>
    </div>
  );
};

export default User;
