import { operacaoTypes } from './operacao.types';
import Operacao from '../../model/Operacao';


const initialState = {
  loading: false,
  operacao: Operacao,
  data: [],
  filteredData: [],
  lastId: 0,
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
      filteredData: action.data,
      lastId: action.lastId,
    }

    case operacaoTypes.OPERACOES_GET_LAST_ID:
    return {
      ...state,
      lastId: action.lastId,
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
