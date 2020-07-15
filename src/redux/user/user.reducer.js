import { userTypes } from './user.types';
import User from '../../model/User';

const initialState = {
  loading: false,
  user: User,
  data: [],
  filteredData: [],
  error: '',
}

export function users(state = initialState, action) {
  switch (action.type) {
    case userTypes.USERS_GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userTypes.USERS_GETALL_SUCCESS:
      return {
        ...state,
        data: action.users,
        filteredData: action.users,
        loading: false
      };

    case userTypes.USERS_GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case userTypes.USERS_GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userTypes.USERS_GETBYID__SUCCESS:
      return {
        ...state,
        user: action.users,
        loading: false
      };

    case userTypes.USERS_GETBYID__FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case userTypes.USERS_DELETE_REQUEST:
      return {
        ...state,
        data: state.data.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        ),
        loading: true
      };

    case userTypes.USERS_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(user => user.id !== action.id),
        loading: false
      };

    case userTypes.USERS_DELETE_FAILURE:
      return {
        ...state,
        data: state.data.map(user => {
          if (user.id === action.id) {
            const { deleting, ...userCopy } = user;

            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
        loading: false
      };

      case userTypes.USERS_CREATE_REQUEST:
        return {
          ...state,
          loading: true
        };

      case userTypes.USERS_CREATE_SUCCESS:
        return {
          ...state,
          user: action.users,
          loading: false
        };

      case userTypes.USERS_CREATE_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false
        };

      case userTypes.USERS_UPDATE_REQUEST:
        return {
          ...state,
          loading: true
        };

      case userTypes.USERS_UPDATE_SUCCESS:
        return {
          ...state,
          user: action.users,
          loading: false
        };

      case userTypes.USERS_UPDATE_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false
        };

      case userTypes.USERS_FILTER_REQUEST:
        return {
          ...state,
          filteredData: action.users
        };

    default:
      return state
  }
}
