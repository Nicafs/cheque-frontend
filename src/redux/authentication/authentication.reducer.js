import { userTypes } from '../user/user.types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
          ...state,
        loggingIn: true,
        user: action.user
      };

    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };

    case userTypes.LOGIN_FAILURE:
      return {
          ...state,
        loggingIn: null,
        user: null
      };

    case userTypes.LOGOUT:
      return {
        ...state,
      loggingIn: null,
      user: null
    };

    default:
      return state
  }
}