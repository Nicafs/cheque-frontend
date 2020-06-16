import { operacaoTypes } from './operacao.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/operacoes/`&{id})
    .then(response => {
     
      return dispatch({
        type: operacaoTypes.OPERACOES_GET,
        payload: response.data,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/operacoes')
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

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/operacoes', formData, config)
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

    axios.post('/operacoes', formData, config)
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

  axios.delete(`/operacoes/${id}`, config)
  .then((response)=>{
      dispatch({
        type: operacaoTypes.OPERACOES_DELETE,
        cheque: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
