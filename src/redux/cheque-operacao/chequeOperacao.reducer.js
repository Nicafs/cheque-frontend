import { chequeOperacaoTypes } from './chequeOperacao.types';


const initialState = {
  loading: false,
  chequeOperacao: {
    banco_id: '',
    banco_nome: '',
    tipo: '',
    agencia: '',
    conta: '',
    numero: '',
    dias: '',
    data_vencimento: null,
    valor: '',
    emitente: ''
  },
  data: [],
  filteredData: [],
}

export default function cheques(state = initialState, action){
  switch(action.type){
    case chequeOperacaoTypes.CHEQUES_OPERACAO_GET:
      return {
        ...state,
        loading: true,
        chequeOperacao: action.payload,
      }

    case chequeOperacaoTypes.CHEQUES_OPERACAO_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case chequeOperacaoTypes.CHEQUES_OPERACAO_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case chequeOperacaoTypes.CHEQUES_OPERACAO_UPDATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }

    case chequeOperacaoTypes.CHEQUES_OPERACAO_CREATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }
    default:
      return state;
  }
}