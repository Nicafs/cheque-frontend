import { chequeTypes } from './cheque.types';


const initialState = {
  loading: false,
  data: [],
}

export default function cheques(state = initialState, action){
  switch(action.type){
    case chequeTypes.CHEQUES_GET:
      return {
        ...state,
        loading: true,
        data: {
          ...action.payload,
        }
      }

    case chequeTypes.CHEQUES_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case chequeTypes.CHEQUES_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case chequeTypes.CHEQUES_UPDATE:
    return {
      ...state,
      loading: true,
      data: {
        ...action.payload,
      }
    }

    case chequeTypes.CHEQUES_CREATE:
    return {
      ...state,
      loading: true,
      data: {
        ...action.payload,
      }
    }
    default:
      return state;
  }
}