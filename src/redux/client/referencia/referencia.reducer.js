import { referenciaClientTypes } from './referencia.types';
import ReferenciaClient from '../../../model/ReferenciaClient';

const initialState = {
  loading: false,
  referenciaClient: ReferenciaClient,
  referenciasClient: [ReferenciaClient],
  filteredData: [],
}

export default function referenciasClient(state = initialState, action){
  switch(action.type){
    case referenciaClientTypes.REFERENCIA_CLIENT_GET:
      return {
        ...state,
        loading: true,
        referenciasClient: action.payload,
      }

    case referenciaClientTypes.REFERENCIA_CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      referenciasClient: action.data,
      filteredData: action.data
    }

    case referenciaClientTypes.REFERENCIA_CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case referenciaClientTypes.REFERENCIA_CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      referenciasClient: action.payload,
    }

    case referenciaClientTypes.REFERENCIA_CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      referenciasClient: action.payload,
    }
    default:
      return state;
  }
}