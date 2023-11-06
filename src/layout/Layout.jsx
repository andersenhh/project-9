import React from "react";
import Footer from "../components/navbar/Footer";
import NavBar from "../components/navbar/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
