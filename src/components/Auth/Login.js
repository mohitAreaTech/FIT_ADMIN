import React, { useState, useEffect } from "react";
import cookie from "react-cookies";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PostData } from "../../apiHelper/ApiHelper";

import { userDetails } from "../../store/actions/userActions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [loader, setLoader] = useState(false);
  const [fcmToken, setFcmToken] = useState();
  const [isTokenFound, setTokenFound] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setLoader(true);
    PostData("auth/login", data).then((response) => {
      const roleTransform = JSON.parse(response?.data?.role)
      if (response?.success === true) {
   
          cookie.save("token", response?.access_token);
          cookie.save("userDetails", response?.data);
          dispatch(userDetails(response?.data));
          navigate("/dashboard");
          setLoader(false);
       
      } else {
        setLoader(false);
      }
    });
  };
  return (
    <>
      {/* Main-Container for login  start */}
      <div className="login-wrapper wrapper-img">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="login-form">
              <a href="#" className="brand-logo">
                <figure>
                  <img
                    src="./assets/img/fit_logo.png"
                    alt="logo-img"
                    width="50px"
                  />
                </figure>
              </a>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Email"
                    {...register("emailAddress", {
                      // required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <span className="label-title">
                    <i className="fa fa-user" aria-hidden="true" />
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    {...register("password", {
                      // required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <span className="label-title">
                    <i className="fa fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="form-group d-none">
                  <div className="remember-forgot">
                    <label className="checkbox-box text-dark">
                      Remember me
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <button type="submit" className="login-btn">
                  {loader == true ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Main-Container for login  end */}
    </>
  );
};

export default Login;
