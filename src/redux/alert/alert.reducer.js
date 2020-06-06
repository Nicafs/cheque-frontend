import { alertTypes } from './alert.types';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
          ...state,
        type: 'alert-success',
        message: action.message
      };

    case alertTypes.ERROR:
      return {
        ...state,
        type: 'alert-danger',
        message: action.message
      };

    case alertTypes.CLEAR:
      return {
        ...state,
        type: '',
        message: null
    };

    default:
      return state
  }
}