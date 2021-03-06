import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Alert, List, Typography } from "antd";
import fetchPosts from "../../queries/fetchPosts";

import "./Posts.scss";

const { Item } = List;
const { Text } = Typography;

const Posts = () => {
  const { loading, error, data } = useQuery(fetchPosts);
  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message={`Error with posts fetch: ${error.message}`}
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
        renderItem={({ content, userId }) => {
          return (
            <Item className="list-item">
              <Text mark>{content}</Text>
              <Text className="user-span">User: {userId}</Text>
            </Item>
          );
        }}
      />
    </div>
  );
};

export default Posts;
