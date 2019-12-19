import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spin, Alert, List, Typography } from "antd";

import "./Posts.scss";

const { Item } = List;
const { Text } = Typography;

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

const Posts = () => {
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
        header={<div>Posts</div>}
        bordered
        dataSource={data.posts}
        renderItem={({ content, user }) => {
          return (
            <Item className="list-item">
              <Text mark>{content}</Text>
              <Text className="user-span">User: {user.id}</Text>
            </Item>
          );
        }}
      />
    </div>
  );
};

// {
//   data.posts.map(({ id, content, user }) => {
//     return (
//       <li className="list-item" key={id}>
//         {content}
//         <span className="user-span">User: {user.id}</span>
//       </li>
//     );
//   });
// }

export default Posts;
