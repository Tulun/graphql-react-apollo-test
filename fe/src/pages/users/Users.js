import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spin, Alert } from "antd";

import "./Users.scss";
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

  return (
    <div>
      <ul className="list">
        {data.posts.map(({ id, content, user }) => {
          return (
            <li className="list-item" key={id}>
              <span className="user-span">{user.firstName}:</span>
              {content}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
