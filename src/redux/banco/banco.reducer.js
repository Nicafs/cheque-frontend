import { bancoTypes } from './banco.types';


const initialState = {
  loading: false,
  banco: {id: '',
          codigo: '',
          descricao: '',
          juros: '',
          prazo: ''
  },
  data: [],
  filteredData: [],
}

export default function bancos(state = initialState, action){
  switch(action.type){
    case bancoTypes.BANCO_GET:
      return {
        ...state,
        banco: action.data
      }

    case bancoTypes.BANCO_GET_ALL:
    return {
      ...state,
      data: action.data,
      filteredData: action.data
    }

    case bancoTypes.BANCO_FILTER:
    return {
      ...state,
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

    case bancoTypes.BANCO_DELETE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }

    default:
      return state;
  }
}