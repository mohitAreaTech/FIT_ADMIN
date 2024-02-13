import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-container" id="exampleImage">
        <Sidebar />
        {/* main-content-wrapper start */}
        <div className="page-content d-flex flex-column">
          {/* page-content nav start */}
          <Header />

          {children}
          <Footer />
          {/* page-content main section end */}
        </div>
        {/* main-content-wrapper end */}
      </div>
      {/* Main-Container end */}
    </>
  );
};

export default Layout;
