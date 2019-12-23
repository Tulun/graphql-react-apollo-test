import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Alert, List, Typography } from "antd";
import fetchPosts from "../../queries/fetchPosts";
import findUser from "../../queries/fetchUser";
import AddPostForm from "./AddPostForm";
import EditUserForm from "./EditUserForm";

import "./User.scss";
const { Item } = List;
const { Text } = Typography;

const User = ({ match }) => {
  // Small gotcha; can't just destructure with multiple calls.
  const {
    data: postsData,
    error: postsError,
    loading: postsLoading
  } = useQuery(fetchPosts);
  const { loading, error, data } = useQuery(findUser, {
    variables: { id: match.params.id }
  });

  if (loading || postsLoading) return <Spin size="large" />;
  if (error || postsError)
    return (
      <Alert
        message={`Error with data fetch: ${error.message ||
          postsError.message} `}
        type="error"
      />
    );

  return (
    <div>
      <p className="text">Name: {data.user.firstName}</p>
      <p className="text">Age: {data.user.age || "Age not specified."} </p>
      <EditUserForm
        currentAge={data.user.age || 0}
        currentFirstName={data.user.firstName}
        userId={match.params.id}
      />
      <AddPostForm userId={match.params.id} />
      <List
        header={<div>Posts</div>}
        bordered
        dataSource={postsData.posts.filter(el => el.userId === match.params.id)}
        renderItem={({ content, likes }) => {
          return (
            <Item className="user-list-item">
              <Text mark>Content: {content}</Text> <br />
              <Text className="user-span">Likes: {likes}</Text>
            </Item>
          );
        }}
      />
    </div>
  );
};

export default User;
