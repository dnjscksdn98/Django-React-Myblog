import React from "react";

import Layout from "../components/Layout";

function LayoutContainer(props) {
  const isAuthenticated = props;

  return <Layout isAuthenticated={isAuthenticated} {...props} />;
}

export default LayoutContainer;
