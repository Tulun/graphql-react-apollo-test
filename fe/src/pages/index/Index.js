import React from "react";
import useInfo from "../../subscriptions/useInfo";

const Index = () => {
  const { data } = useInfo();
  console.log(data);
  return <div>Index route</div>;
};

export default Index;
