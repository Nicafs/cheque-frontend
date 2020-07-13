import { operacaoTypes } from './operacao.types';
import api from '../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/operacoes/${id}`)
    .then(response => {

      return dispatch({
        type: operacaoTypes.OPERACOES_GET,
        payload: response.data,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  api.get('/operacoes')
    .then((response)=>{
        dispatch({
          type: operacaoTypes.OPERACOES_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: operacaoTypes.OPERACOES_FILTER,
      data: data,
    });
}

export const update = (id, formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put(`/operacoes/${id}`, formData, config)
  .then(response => {

    return dispatch({
      type: operacaoTypes.OPERACOES_UPDATE,
      payload: response.data,
    });

  })
  .catch(err => console.log(err));
}

export const create = (formData, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    api.post('/operacoes', formData, config)
    .then(response => {

    return dispatch({
        type: operacaoTypes.OPERACOES_CREATE,
        payload: response.data,
    });

    })
    .catch(err => console.log(err));
}

export const deleteById = (id, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/operacoes/${id}`, config)
  .then((response)=>{
      dispatch({
        type: operacaoTypes.OPERACOES_DELETE,
        cheque: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
