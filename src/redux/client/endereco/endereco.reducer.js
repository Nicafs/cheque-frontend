import { enderecoClientTypes } from './endereco.types';
import EnderecoClient from '../../../model/EnderecoClient';

const initialState = {
  loading: false,
  enderecoClient: EnderecoClient,
  enderecosClient: [EnderecoClient],
  filteredData: [],
}

export default function enderecosClient(state = initialState, action){
  switch(action.type){
    case enderecoClientTypes.ENDERECO_CLIENT_GET:
      return {
        ...state,
        loading: true,
        enderecosClient: action.payload,
      }

    case enderecoClientTypes.ENDERECO_CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      enderecosClient: action.data,
      filteredData: action.data
    }

    case enderecoClientTypes.ENDERECO_CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case enderecoClientTypes.ENDERECO_CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      enderecosClient: action.payload,
    }

    case enderecoClientTypes.ENDERECO_CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      enderecosClient: action.payload,
    }
    default:
      return state;
  }
}