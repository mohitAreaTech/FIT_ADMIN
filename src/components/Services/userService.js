
import $ from 'jquery'
import { getPosAddons , posEndPoint , createPosEndPoint ,getPermissionsEndPoint,opsLeadsEndPoints,getUserEndPoint,editUserEndPoint } from '../../apiHelper/ApiEndsPoints'
import { GetDataWithToken, PostDataWithToken } from '../../apiHelper/ApiHelper'
import Swal from "sweetalert";






export const callNavLink = () => {
  setTimeout(() => {
    $('.burger-toggle').on('click', function () {
      $(this).toggleClass('active')

      $('.page-content').toggleClass('hide-sidemenu-area')
      $('.sidebar-menu').toggleClass('toggle-sidemenu-area')
      $('.top-navbar').toggleClass('toggle-navbar-area')
      $('.footer-area').toggleClass('toggle-navbar-area')
    })
    $('.burger-toggle-responsive').on('click', function () {
      $('.burger-toggle-responsive').toggleClass('active')
      $('.sidebar-menu').toggleClass('active-sidemenu-area')
    })
    $('.collapsed-nav-link').on('click', function () {
      if ($(this).hasClass('active') == false) {
        $('.collapsed-nav-link').removeClass('active')
        $('.sidemenu-nav-second-level').css('display', 'none')
        $(this).toggleClass('active')
        $(this).next().slideToggle(200)
      } else {
        $(this).removeClass('active')
        $('.sidemenu-nav-second-level').css('display', 'none')
      }
    })
  }, 1000)
}
///pos

export const allPos = async (data) => {
  try {
    const response = await GetDataWithToken(posEndPoint.GETALLPOS + data, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPosDetails = async (userId) => {
  try {
    const response = await GetDataWithToken(
      posEndPoint.POSDETAILS + "/" + userId,
      ""
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const actionOnPosRequest = async (userId, data) => {
  try {
    const response = await PostDataWithToken(
      posEndPoint.actionOnRequest + "/" + userId,
      data
    );

    console.log(response, 'response on action of ')
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createPos = async (data) => {
  try {
    const response = await PostDataWithToken(createPosEndPoint.CREATEPOS, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getAddons = async (data) => {
  try {
    const response = await GetDataWithToken(getPosAddons.POSADDONS, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPermissions = async () => {
  try {
    const response = await GetDataWithToken(getPermissionsEndPoint.GETPERMISSION, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getPosDistrict = async (districtId) => {
  try {
    const response = await GetDataWithToken(
      opsLeadsEndPoints.DISTRICT + "/" + districtId,
      ""
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPosState = async (stateId) => {
  try {
    const response = await GetDataWithToken(
      opsLeadsEndPoints.STATE + "/" + stateId,
      ""
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPosZone = async () => {
  try {
    const response = await GetDataWithToken(opsLeadsEndPoints.ZONE, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (data) => {
  try {
    const response = await GetDataWithToken(getUserEndPoint.GETEMPLOYEES + data, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendErrorMessage = (response) => {
  Swal.fire("Error", response.data.message, "error");
};
export const sendSuccessMessage = (response) => {
  Swal.fire("Success", response.message, "success");
};

export const editUser = async (data) => {
  try {
    console.log("profile picture :-",data)
    const response = await PostDataWithToken(editUserEndPoint.DETAILS, data);
    // const response2 = await PostDataWithToken(editUserEndPoint.DOCUMENT , data)
    return response;
  } catch (error) {
    console.log("///---======-----=========/////",editUser);
  }
};
export const editMarksheet = async (data) => {
  try {
    const response = await PostDataWithToken(editUserEndPoint.DOCUMENT, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editPan = async (data) => {
  try {
    const response = await PostDataWithToken(editUserEndPoint.DOCUMENT, data);
    const response2 = await PostDataWithToken(editUserEndPoint.DETAILS, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editBank = async (data) => {
  try {
    const response = await PostDataWithToken(editUserEndPoint.BANK, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editAddhar = async (data) => {
  try {
    // console.log("data for aadhar edit:-",data)
    const response = await PostDataWithToken(editUserEndPoint.DETAILS, data);
    // console.log("======edit aadhar ===============",response)
    const response2 = await PostDataWithToken(editUserEndPoint.DOCUMENT , data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editUserProfilePicture = async (data) => {
  try {
    const response = await PostDataWithToken(editUserEndPoint.DOCUMENT, data);
    return response;
  } catch (error) {
    console.log('error in updating the profile picture of user', error);
  }
}