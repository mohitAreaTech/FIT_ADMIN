import axios from "axios";
import cookie from "react-cookies";


// export const mainUrl = "https://ibmsapi.flaskitsolutions.com/api/v1/";
// export const mainUrl = "http://localhost:7685/api/v1/";
export const mainUrl = "http://localhost:3341/api/v2/";


const appUrl = "";

export const APPURL = () => {
  return appUrl;
};

export const PostData = (url, data) => {
  let headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
  };
  return axios
    .post(mainUrl + url, data, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export const GetData = (url, data) => {
  let headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "123",
  };
  return axios
    .get(mainUrl + url, data, { headers: headers })
    .then((resposne) => {
      return resposne.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export const PostDataWithToken = (url, data) => {
  console.log("data :-",data)
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  let headers = {
    Authorization: "Bearer " + tokens,
    "Content-Type": "application/json",
  };
  return axios
    .post(mainUrl + url, data, { headers: headers })
    .then((response) => {
      console.log("///====edit user response====/////", response)
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export const PostImageDataWithToken = (url, data) => {
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + tokens,
  };
  return axios
    .post(mainUrl + url, data, { headers: headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};

export const GetDataWithToken = (url) => {
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  let config = {
    headers: {
      Authorization: "Bearer " + tokens,
      "ngrok-skip-browser-warning": "123",
    },
    params: {},
  };
  return axios
    .get(mainUrl + url, config)
    .then((resposne) => {
      return resposne.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      return errorStatus;
    });
};
