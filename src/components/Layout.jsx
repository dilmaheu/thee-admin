import React from "react";

import "../styles/style.css";

const Layout = ({ children }) => {
  return <main className="mx-auto max-w-2xl">{children}</main>;
};

export default Layout;
