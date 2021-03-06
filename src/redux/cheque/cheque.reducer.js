import { chequeTypes } from './cheque.types';


const initialState = {
  loading: false,
  cheque: {
    banco_id: '',
    client_id: '',
    agencia: '',
    conta: '',
    numero: '',
    situacao: '',
    dias: '',
    data_vencimento: null,
    data_quitacao: null,
    valor_operacao: '',
    valor_encargos: '',
    emitente: ''
  },
  data: [],
  filteredData: [],
}

export default function cheques(state = initialState, action){
  switch(action.type){
    case chequeTypes.CHEQUES_GET:
      return {
        ...state,
        loading: true,
        cheque: action.payload,
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
      data: action.payload,
    }

    case chequeTypes.CHEQUES_CREATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }
    default:
      return state;
  }
}