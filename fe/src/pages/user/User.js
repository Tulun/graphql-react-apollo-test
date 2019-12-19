import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Alert, List, Typography } from "antd";
import fetchPosts from "../../queries/fetchPosts";
import findUser from "../../queries/fetchUser";
import AddPostForm from "./AddPostForm";

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
      <p>{data.user.firstName}</p>
      <p>{data.user.age || "Age not specified."}</p>
      <AddPostForm userId={match.params.id} />
      <List
        header={<div>Posts</div>}
        bordered
        dataSource={postsData.posts.filter(
          el => el.user.id === match.params.id
        )}
        renderItem={({ content, likes }) => {
          return (
            <Item className="user-list-item">
              <Text mark>{content}</Text>
              <Text className="user-span">{likes}</Text>
            </Item>
          );
        }}
      />
    </div>
  );
};

export default User;
