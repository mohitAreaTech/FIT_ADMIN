import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  callNavLink,
} from "../../Services/userService";
import EmployeeSideBar from "./EmployeeSideBar";
import UtilitySidebar from "./UtilitySidebar";
import MisSidebar from "./misSidebar";


const Sidebar = () => {



  const DashboardLink = ["/dashboard"];


  const location = useLocation();
  const checkDashboardSideBarActive = () => {
    let check = DashboardLink.includes(location.pathname);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const checkPosReqActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/new-pos")
    if (check === "/new-pos") {
      return true;
    } else {
      return false;
    }
  };
  const checkPosUTActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-underTraining")
    if (check === "/pos-underTraining") {
      return true;
    } else {
      return false;
    }
  };
  const checkPosCertifiedActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/pos-certified") {
      return true;
    } else {
      return false;
    }
  };
  const checkPosRejectedActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/pos-rejected") {
      return true;
    } else {
      return false;
    }
  };
  const checkPosIncompleteActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/pos-incomplete") {
      return true;
    } else {
      return false;
    }
  };
  const checkAddPosActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/add-pos") {
      return true;
    } else {
      return false;
    }
  };
  const checkAllPosActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/all-pos") {
      return true;
    } else {
      return false;
    }
  };

 
  const checkOpsActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/all-ops") {
      return true;
    } else {
      return false;
    }
  };

  const checkAddOpsActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/add-ops") {
      return true;
    } else {
      return false;
    }
  };
  const checkAddUMisActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/add-mis") {
      return true;
    } else {
      return false;
    }
  };
  const checkOpsPendingActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/ops-pending-leads") {
      return true;
    } else {
      return false;
    }
  };
  const checkOpsPoolActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/ops-pool") {
      return true;
    } else {
      return false;
    }
  };

  
  
  const checkMisPendingActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/mis-pending-lead") {
      return true;
    } else {
      return false;
    }
  };
  const checkMisPoolActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/mis-pool") {
      return true;
    } else {
      return false;
    }
  };
  const PosLinks = [
    "/new-pos",
    "/pos-underTraining",
    "/pos-certified",
    "/pos-rejected",
    "/pos-incomplete",
    "/all-pos",
    "/add-pos",
  ];
  const checkPosSideBarActive = () => {
    let check = PosLinks.includes(location.pathname);
    if (check) {
      return true;
    } else {
      return false;
    }
  };
  

 
 



 


  useEffect(() => {
    callNavLink();
  }, []);

  return (
    <>
      {/* sidebar-menu start */}
      <div className="sidebar-menu">
        {/* sidebar-menu header start */}
        <div className="side-header">
          {/* site logo start */}
          <Link
            to="/dashboard"
            className="brand-logo d-flex align-items-center"
          >
            <img src="./assets/img/fit_logo.png" alt="logo-img" />
          </Link>
          {/* site logo end */}
          {/* toggle button start */}
          <div className="burger-toggle d-none d-xl-block">
            <span className="top-line" />
            <span className="middle-line" />
            <span className="bottom-line" />
          </div>
          <div className="burger-toggle-responsive d-block d-xl-none">
            <span className="top-line" />
            <span className="middle-line" />
            <span className="bottom-line" />
          </div>

          {/* toggle button end */}
        </div>
        {/* sidebar-menu header end */}
        {/* sidebar-menu body start */}
        <div className="side-body">
          <ul className="sidebody-nav h-100 metismenu" data-sidebar="init">
            <div className="sidebar-wrapper">
              <div className="sidebar-mask">
                <div
                  className="sidebar-offset"
                  style={{ bottom: "0px", right: "-17px" }}
                >
                  <div
                    className="sidebar-content-wrapper"
                    style={{ height: "100%", overflow: "hidden scroll" }}
                  >
                    <div
                      className="sidebar-content"
                      style={{ padding: "20px 0px" }}
                    >
                      <li className="nav-item active">
                        <Link
                          to="/dashboard"
                          className={
                            checkDashboardSideBarActive() === true
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          <span className="nav-icon">
                            <i
                              className="fa fa-th-large"
                              aria-hidden="true"
                            ></i>
                            <img
                              src={
                                "./assets/img/Dashboard-icon-removebg-preview.png"
                              }
                              alt="Dashboard"
                            />
                          </span>
                          <span className="nav-title">Dashboard</span>
                        </Link>
                      </li>
                      <EmployeeSideBar />
                      <MisSidebar />

                      {/* pos */}
                      <li className="nav-item">
                        <Link
                          to="/all-pos"
                          className={
                            checkPosSideBarActive() === true
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          <span className="nav-icon">
                            {/* <i
                              className="fa fa-first-order"
                              aria-hidden="true"
                            ></i> */}
                            <img
                              src={"./assets/img/pos-icon-removebg-preview.png"}
                              alt="POS Desk"
                            />
                          </span>
                          <span className="nav-title">POS Desk</span>
                        </Link>
                      </li>

                      <UtilitySidebar />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        {/* sidebar-menu body end */}
      </div>
      {/* sidebar-menu end */}
    </>
  );
};

export default Sidebar;
