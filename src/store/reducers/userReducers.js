import { LOGGED_IN_USER_DETAILS, SELECTED_USER } from "../types"

const initialState = {
  userDetails: {},
}

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      }
      case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload
      }
    default:
      return state
  }
}

export default userReducers