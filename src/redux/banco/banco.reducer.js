import { bancoTypes } from './banco.types';


const initialState = {
  loading: false,
  data: [],
}

export default function bancos(state = initialState, action){
  switch(action.type){
    case bancoTypes.BANCO_GET:
      return {
        ...state,
        loading: true,
        data: {
          ...action.payload,
        }
      }

    case bancoTypes.BANCO_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case bancoTypes.BANCO_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case bancoTypes.BANCO_UPDATE:
    return {
      ...state,
      loading: true,
      data: {
        ...action.payload,
      }
    }

    case bancoTypes.BANCO_CREATE:
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