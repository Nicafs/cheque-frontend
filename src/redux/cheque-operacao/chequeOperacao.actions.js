import { chequeOperacaoTypes } from './chequeOperacao.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/chequesoperacao/`&{id})
    .then(response => {
     
      return dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_GET,
        payload: response.data,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/chequesoperacao')
    .then((response)=>{
        dispatch({
          type: chequeOperacaoTypes.CHEQUE_OPERACAO_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: chequeOperacaoTypes.CHEQUE_OPERACAO_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/chequesoperacao', formData, config)
  .then(response => {

    return dispatch({
      type: chequeOperacaoTypes.CHEQUE_OPERACAO_UPDATE,
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

    axios.post('/chequesoperacao', formData, config)
    .then(response => {

    return dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_CREATE,
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

  axios.delete(`/chequesoperacao/${id}`, config)
  .then((response)=>{
      dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_DELETE,
        cheque: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
