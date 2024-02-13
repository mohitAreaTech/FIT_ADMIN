import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Layout from '../../Common/Layout'
import { useForm } from "react-hook-form";
import { changePasswordApi, sendErrorMessage, sendSuccessMessage } from '../../Services/userService';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleChangePassword = (data) => {
    let changePasswordData = {
      password: data.password,
      newPassword: data.newPassword
    }
    // console.log("data", changePasswordData);
    setLoader(true);
    changePasswordApi(changePasswordData)
      .then((response) => {
        if (response.status == true) {
          navigate('/dashboard');
          sendSuccessMessage(response);
          setLoader(false);
        } else {
          setLoader(false);
          sendErrorMessage(response);
        }
      })
  }

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
              <li className="item text-capitalize">Change Password</li>
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
        <div className="card border-0">
          <div className="card-body p-0 p-md-3">
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="row">
                <div className="col-12 col-lg-6 form-group mb-2">
                  <label className="form-label" htmlFor>
                    Current Password
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Current Password"
                    className="form-control control-form"
                    {...register("password", {
                      required: "Current Password is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.password && errors.password.message}
                  </span>
                </div>
                <div className="col-12 col-lg-6 form-group mb-2">
                  <label className="form-label" htmlFor>
                    New Password
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="New Password"
                    className="form-control control-form"
                    {...register("newPassword", {
                      required: "New Password is required",
                    })}
                  />
                  <span className="text-danger">
                    {errors.newPassword && errors.newPassword.message}
                  </span>
                </div>
                <div className="d-flex flex-column-reverse d-md-block text-end mt-3">
                  <button
                    className="btn btn-danger me-0 me-md-2"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary mb-2 mb-md-0">
                    {loader == true ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ChangePassword