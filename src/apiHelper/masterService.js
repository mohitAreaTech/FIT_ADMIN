import { mastersEndPoint } from "./ApiEndsPoints";
import { GetDataWithToken, PostDataWithToken } from "./ApiHelper";

export const getVehicleMake = async (data) => {
  try {
    const response = await PostDataWithToken(mastersEndPoint.make, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getVehicleModel = async (data) => {
  try {
    const response = await PostDataWithToken(mastersEndPoint.model, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getVehicleVariant = async (data) => {
  try {
    const response = await PostDataWithToken(mastersEndPoint.variant, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getVehicleRto = async () => {
  try {
    const response = await GetDataWithToken(mastersEndPoint.rto, "");
    return response;
  } catch (error) {
    return error;
  }
};

export const getVehiclePreviousInsurer = async () => {
  try {
    const response = await GetDataWithToken(
      mastersEndPoint.previousInsurer,
      ""
    );
    return response;
  } catch (error) {
    return error;
  }
};
