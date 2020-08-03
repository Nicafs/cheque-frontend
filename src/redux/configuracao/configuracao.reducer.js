import { configuracaoTypes } from './configuracao.types';

const initialState = {
  loading: false,
  configuracao: null,
  error: '',
}

export default function configuracao(state = initialState, action) {
  switch (action.type) {
    case configuracaoTypes.CONFIGURACAO_SAVE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case configuracaoTypes.CONFIGURACAO_SAVE_SUCCESS:
      return {
        ...state,
        configuracao: action.configuracao,
        loading: false
      };

    case configuracaoTypes.CONFIGURACAO_SAVE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case configuracaoTypes.CONFIGURACAO_GET_REQUEST:
      return {
        ...state,
        loading: true
      };

    case configuracaoTypes.CONFIGURACAO_GET_SUCCESS:
      return {
        ...state,
        configuracao: action.configuracao,
        loading: false
      };

    case configuracaoTypes.CONFIGURACAO_GET_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state
  }
}
