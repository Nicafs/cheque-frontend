import { configuracaoTypes } from './configuracao.types';
import api from '../../core/services/api';

export const save = (formData) => {
  return dispatch => {
    dispatch(request(formData));
    
    if (formData.id) {
      api.put('/configuracao', formData)
        .then(
          user => {
              dispatch(success(user.data));
          },
          error => {
              dispatch(failure(error.toString()));
          }
      );
    } else {
      api.post('/configuracao', formData)
        .then(
          user => {
              dispatch(success(user.data));
          },
          error => {
              dispatch(failure(error.toString()));
          }
        );
      };
    }

  function request(configuracao) { return { type: configuracaoTypes.CONFIGURACAO_SAVE_REQUEST, configuracao } }
  function success(configuracao) { return { type: configuracaoTypes.CONFIGURACAO_SAVE_SUCCESS, configuracao } }
  function failure(error) { return { type: configuracaoTypes.CONFIGURACAO_SAVE_FAILURE, error } }
}

export const getData = () => {
  return dispatch => {
    dispatch(request());

    api.get(`/configuracao`)
        .then(
            configuracao => dispatch(success(configuracao.data)),
            error => dispatch(failure(error.toString()))
        );
  };

  function request() { return { type: configuracaoTypes.CONFIGURACAO_GET_REQUEST } }
  function success(configuracao) { return { type: configuracaoTypes.CONFIGURACAO_GET_SUCCESS, configuracao } }
  function failure(error) { return { type: configuracaoTypes.CONFIGURACAO_GET_FAILURE, error } }
}