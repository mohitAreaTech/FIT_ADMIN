import cookie from "react-cookies";
export const isAuthenticated = () => {
  if (cookie.load('token')) {
    return true
  } else {
    return false;
  }
};