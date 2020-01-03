import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

export const subscription = gql`
  subscription {
    info
  }
`;
export default () => useSubscription(subscription);
