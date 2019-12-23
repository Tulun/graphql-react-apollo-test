import { gql } from "apollo-boost";

export default gql`
  {
    posts {
      id
      content
      likes
      userId
    }
  }
`;
