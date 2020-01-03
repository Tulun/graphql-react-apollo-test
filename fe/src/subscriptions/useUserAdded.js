import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

export const subscription = gql`
  subscription UserAdded {
    userAdded {
      id
      firstName
      age
    }
  }
`;
export default () => useSubscription(subscription);
