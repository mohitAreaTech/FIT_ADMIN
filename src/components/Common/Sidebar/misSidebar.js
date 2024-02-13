import React from 'react'
import { useLocation, Link } from 'react-router-dom';

const MisSidebar = () => {
  const MisLinks = ["/mis", "/pending-leads", "/my-pool", '/total-booked'];

  const location = useLocation();

  const checkMisBarActive = () => {
    let check = MisLinks.includes(location.pathname);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const checkMisActive = () => {
    let check = location.pathname;
    if (check === "/mis") {
      return true;
    } else {
      return false;
    }
  };

  const checkPendingLeadsActive = () => {
    let check = location.pathname;
    if (check === "/pending-leads") {
      return true;
    } else {
      return false;
    }
  };

  const checkMyPoolActive = () => {
    let check = location.pathname;
    if (check == "/my-pool") {
      return true;
    } else {
      return false;
    }
  };

  const checkTotalBookedActive = () => {
    let check = location.pathname;
    if (check == "/total-booked") {
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
            checkMisBarActive() === true
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
              alt="MIS Desk"
            />
          </span>
          <span className="nav-title">MIS Desk</span>
        </a>
        <ul
          className="sidemenu-nav-second-level mm-collapse"
          style={
            checkMisBarActive() === true
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <li className="nav-item">
            <Link
              to="/mis"
              className={
                checkMisActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">All MIS</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/pending-leads"
              className={
                checkPendingLeadsActive() === true
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span className="nav-title">Pending Leads</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/my-pool"
              className={
                checkMyPoolActive() === true ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-title">My Pool</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/total-booked"
              className={
                checkTotalBookedActive() === true ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-title">Total Booked</span>
            </Link>
          </li>
         
        </ul>
      </li>
    </>
  )
}

export default MisSidebar