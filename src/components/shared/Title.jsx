import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Ping!",
  description = "Hello This is A App where you can contact to your loved ones",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
