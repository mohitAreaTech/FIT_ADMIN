import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../Common/Layout";
import { getPermissionDataByToken } from "../../Services/userService";

const Profile = () => {
  const navigate = useNavigate();
  const [callApi, setCallApi] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (callApi) {
      getPermissionDataByToken()
        .then((response) => {
          if (response.status == true) {
            setCallApi(false);
            setUserDetails(response?.data);
          }
        });
      setCallApi(false);
    }
  }, [callApi]);
  return (
    <>
      <Layout>
        <div className="page-content-crumb">
          <div className="breadcrumb-area">
            <h1>Profile</h1>
            <ol className="breadcrumb">
              <li className="item">
                <Link to="/dashboard">
                  <i className="fa fa-home" aria-hidden="true" />
                </Link>
              </li>
              <li className="item text-capitalize">My Profile</li>
            </ol>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => navigate("/dashboard")}
          >
            <span className="d-none d-md-block">Back</span>
            <span className="d-block d-md-none">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="card mt-3">
          <h6>Profile Detail</h6>
          <div className="my-3">
            <div className="row">
              <ul className="col-12 col-md-6 col-lg-4 list-unstyled">
                <div className="row">
                  <li className="col-12">
                    <div className="d-md-flex text-center text-md-start align-items-center mb-2">
                      {userDetails?.profile_piture == null ?
                        <img
                          src="./assets/img/user-default.png"
                          className="admin-profile"
                          alt="img"
                        />
                        :
                        <img
                          src={userDetails?.profile_piture}
                          className="admin-profile"
                          alt="img"
                        />
                      }
                      <div className="overlay-layer">
                        <label
                          for="profilePiture"
                          className="btn btn-primary rounded profile-editbtn py-1 px-2 mt-2 mt-md-0 ms-0 ms-md-2"
                        >
                          <span className="me-2">
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Edit Profile
                        </label>
                        <input
                          type="file"
                          name="profilePiture"
                          id="profilePiture"
                          className="form-control d-none"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="col-12">
                    <p className="text-capitalize">
                      Name<span className="mx-1">-</span>
                      <span className="text-capitalize mb-1 text-muted fs-7">
                        {userDetails?.name}
                      </span>
                    </p>
                  </li>
                  <li className="col-12">
                    <p>
                      Email<span className="mx-1">-</span>
                      <span className="mb-1 text-muted fs-7">
                        {userDetails?.email}
                      </span>
                    </p>
                  </li>
                  <li className="col-12">
                    <p>
                      Phone No.<span className="mx-1">-</span>
                      <span className="text-capitalize mb-1 text-muted fs-7">
                        {userDetails?.phone}
                      </span>
                    </p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
