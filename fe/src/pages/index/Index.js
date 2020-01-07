import React from "react";
import useInfo from "../../subscriptions/useInfo";

const Index = () => {
  // Demonstrating that the basic subscription works.
  // You need to call this in the backend.
  const { data } = useInfo();
  console.log(data);
  return <div>Index route</div>;
};

export default Index;
