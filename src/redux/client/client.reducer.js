import { clientTypes } from './client.types';


const initialState = {
  loading: false,
  data: [],
}

export default function clients(state = initialState, action){
  console.log("Entrou no reducer do client");
  switch(action.type){
    case clientTypes.CLIENT_GET:
      return {
        ...state,
        loading: true,
        data: {
          ...action.payload,
        }
      }

    case clientTypes.CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      data: action.data
    }

    case clientTypes.CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      data: {
        ...action.payload,
      }
    }

    case clientTypes.CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      data: {
        ...action.payload,
      }
    }
    default:
      return state;
  }
}