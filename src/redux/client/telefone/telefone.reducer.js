import { telefoneClientTypes } from './telefone.types';
import TelefoneClient from '../../../model/TelefoneClient';

const initialState = {
  loading: false,
  telefoneClient: TelefoneClient,
  telefonesClient: [TelefoneClient],
  filteredData: [],
}

export default function telefonesClient(state = initialState, action){
  switch(action.type){
    case telefoneClientTypes.TELEFONE_CLIENT_GET:
      return {
        ...state,
        loading: true,
        telefonesClient: action.payload,
      }

    case telefoneClientTypes.TELEFONE_CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      telefonesClient: action.data,
      filteredData: action.data
    }

    case telefoneClientTypes.TELEFONE_CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case telefoneClientTypes.TELEFONE_CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      telefonesClient: action.payload,
    }

    case telefoneClientTypes.TELEFONE_CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      telefonesClient: action.payload,
    }
    default:
      return state;
  }
}