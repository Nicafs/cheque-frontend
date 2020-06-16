import { operacaoTypes } from './operacao.types';


const initialState = {
  loading: false,
  operacao: {
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
    case operacaoTypes.OPERACOES_GET:
      return {
        ...state,
        loading: true,
        operacao: action.payload,
      }

    case operacaoTypes.OPERACOES_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case operacaoTypes.OPERACOES_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case operacaoTypes.OPERACOES_UPDATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }

    case operacaoTypes.OPERACOES_CREATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }
    default:
      return state;
  }
}