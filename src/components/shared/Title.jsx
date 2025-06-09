import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Kisan Samvad",
  description = "this is the Chat App called Kisan Samvad",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
