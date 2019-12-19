import { gql } from "apollo-boost";

export default gql`
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
