import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import fetchPosts from "../../queries/fetchPosts";

const ADD_POST = gql`
  mutation AddPost($content: String!, $userId: String!) {
    addPost(content: $content, userId: $userId) {
      id
      content
      likes
      user {
        id
      }
    }
  }
`;

const AddPostForm = ({ userId }) => {
  const [content, setContent] = useState("");

  // Update the cache when you create a new user
  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: fetchPosts });
      cache.writeQuery({
        query: fetchPosts,
        data: { posts: posts.concat([addPost]) }
      });
    }
  });

  const onSubmit = event => {
    event.preventDefault();
    addPost({ variables: { content, userId } });
    setContent("");
  };

  return (
    <form className="form" onSubmit={event => onSubmit(event)}>
      <h3>Add Post</h3>
      <label className="label">Content (required)</label>
      <input
        className="input"
        type="textarea"
        rows={4}
        onChange={event => setContent(event.target.value)}
        value={content}
      />
      <button className="button" onClick={event => onSubmit(event)}>
        Submit
      </button>
    </form>
  );
};

export default AddPostForm;
