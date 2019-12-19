import { gql } from "apollo-boost";

export default gql`
  query FindUser($id: String) {
    user(id: $id) {
      id
      firstName
      age
    }
  }
`;
