import { historicoOperacoesTypes } from './historico-operacoes.types';
import Operacao from '../../model/Operacao';

const initialState = {
  loading: false,
  Operacao: Operacao,
  data: [],
  filteredData: [],
}

export default function historicoOperacoes(state = initialState, action){
  switch(action.type){
    case historicoOperacoesTypes.HISTORICO_OPERACOES_GET:
      return {
        ...state,
        loading: true,
        Operacao: action.payload,
      }

    case historicoOperacoesTypes.HISTORICO_OPERACOES_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case historicoOperacoesTypes.HISTORICO_OPERACOES_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }
    
    default:
      return state;
  }
}
