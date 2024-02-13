import React from 'react'
import { useLocation, Link } from 'react-router-dom';

const EmployeeSideBar = () => {
  const EmployeeLinks = ["/employee", "/add-employee", "/active-employee", "/deactivated-employee"];

  const location = useLocation();
  const checkEmployeeBarActive = () => {
    let check = EmployeeLinks.includes(location.pathname);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const checkEmployeeActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/employee") {
      return true;
    } else {
      return false;
    }
  };

  const checkAddEmplyeeActive = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check === "/add-employee") {
      return true;
    } else {
      return false;
    }
  };

  const checkActivatedEmp = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check == "/active-employee") {
      return true;
    } else {
      return false;
    }
  };

  const checkDeactivatedEmp = () => {
    let check = location.pathname;
    // console.log("check", check === "/pos-certified")
    if (check == "/deactivated-employee") {
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
            checkEmployeeBarActive() === true
              ? "collapsed-nav-link nav-link active"
              : "collapsed-nav-link nav-link"
          }
        >
          <span className="nav-icon">
            {/* <i className="fa fa-users" aria-hidden="true"></i> */}
            <img
              src={
                "./assets/img/employee-desk-removebg-preview.png"
              }
              alt="Employee Desk"
            />
          </span>
          <span className="nav-title">Employee Desk</span>
        </a>
        <ul
          className="sidemenu-nav-second-level mm-collapse"
          style={
            checkEmployeeBarActive() === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <li className="nav-item">
            <Link
              to="/add-employee"
              className={
                checkAddEmplyeeActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">Add Employees</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/employee"
              className={
                checkEmployeeActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">All Employees</span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link
              to="/active-employee"
              className={
                checkActivatedEmp() === true ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-title">Active Employees</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/deactivated-employee"
              className={
                checkDeactivatedEmp() === true ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-title">De-Activated Employees</span>
            </Link>
          </li>
        </ul>
      </li>
    </>
  )
}

export default EmployeeSideBar