import { emailClientTypes } from './email.types';
import EmailClient from '../../../model/EmailClient';

const initialState = {
  loading: false,
  emailClient: EmailClient,
  emailsClient: [EmailClient],
  filteredData: [],
}

export default function emailsClient(state = initialState, action){
  switch(action.type){
    case emailClientTypes.EMAIL_CLIENT_GET:
      return {
        ...state,
        loading: true,
        emailsClient: action.payload,
      }

    case emailClientTypes.EMAIL_CLIENT_GET_ALL:
    return {
      ...state,
      loading: true,
      emailsClient: action.data,
      filteredData: action.data
    }

    case emailClientTypes.EMAIL_CLIENT_FILTER:
    return {
      ...state,
      loading: true,
      filteredData: action.data
    }

    case emailClientTypes.EMAIL_CLIENT_UPDATE:
    return {
      ...state,
      loading: true,
      emailsClient: action.payload,
    }

    case emailClientTypes.EMAIL_CLIENT_CREATE:
    return {
      ...state,
      loading: true,
      emailsClient: action.payload,
    }
    default:
      return state;
  }
}