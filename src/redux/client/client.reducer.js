import { clientTypes } from './client.types';
import Client from '../../model/Client';

const initialState = {
  loading: false,
  client: Client,
  data: [],
  clients: [Client],
  filteredData: [],
}

export default function clients(state = initialState, action){
  switch(action.type){
    case clientTypes.CLIENT_GET:
      return {
        ...state,
        loading: true,
        data: action.payload,
      }

    case clientTypes.CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data,
      filteredData: action.data
    }

    case clientTypes.CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case clientTypes.CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }

    case clientTypes.CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      data: action.payload,
    }
    default:
      return state;
  }
}
