import { bancoClientTypes } from './banco.types';
import BancoClient from '../../../model/BancoClient';

const initialState = {
  loading: false,
  bancoClient: BancoClient,
  bancosClient: [BancoClient],
  filteredData: [],
}

export default function bancosClient(state = initialState, action){
  switch(action.type){
    case bancoClientTypes.BANCO_CLIENT_GET:
      return {
        ...state,
        loading: true,
        bancosClient: action.payload,
      }

    case bancoClientTypes.BANCO_CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      bancosClient: action.data,
      filteredData: action.data
    }

    case bancoClientTypes.BANCO_CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case bancoClientTypes.BANCO_CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      bancosClient: action.payload,
    }

    case bancoClientTypes.BANCO_CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      bancosClient: action.payload,
    }
    default:
      return state;
  }
}