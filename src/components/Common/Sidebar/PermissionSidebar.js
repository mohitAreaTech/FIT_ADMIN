import React from "react";
import { useLocation, Link } from "react-router-dom";

const PermissionSidebar = () => {
  const location = useLocation();
  const PermissionLinks = ["/add-permission", "/all-permission"];

  const checkPermissionSideBarActive = () => {
    let check = PermissionLinks.includes(location.pathname);
    if (check) {
      return true;
    } else {
      return false;
    }
  };
  const checkAddPermisionActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check == "/add-permission") {
      return true;
    } else {
      return false;
    }
  };
  const checkAllPermissionActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check == "/all-permission") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <li className="nav-item nav-item-2" aria-expanded="false">
        <a
          href="javascript:void(0)"
          className={
            checkPermissionSideBarActive() === true
              ? "collapsed-nav-link nav-link active"
              : "collapsed-nav-link nav-link"
          }
        >
          <span className="nav-icon">
            {/* <i className="fa fa-ravelry" aria-hidden="true"></i> */}
            <img src={"./assets/img/permissions.png"} alt="Employee Desk" />
          </span>
          <span className="nav-title">Permission Desk</span>
        </a>
        <ul
          className="sidemenu-nav-second-level mm-collapse"
          style={
            checkPermissionSideBarActive() === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <li className="nav-item">
            <Link
              to="/add-permission"
              className={
                checkAddPermisionActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">Add Permission</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/all-permission"
              className={
                checkAllPermissionActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">All Permission</span>
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default PermissionSidebar;
