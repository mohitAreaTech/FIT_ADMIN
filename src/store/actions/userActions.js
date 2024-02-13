import { LOGGED_IN_USER_DETAILS, SELECTED_USER } from "../types"

export const userDetails = (payload) => {
  return {
    type: LOGGED_IN_USER_DETAILS,
    payload
  }
}

export const selectedUser = (payload) => {
  return {
    type: SELECTED_USER,
    payload
  }
}