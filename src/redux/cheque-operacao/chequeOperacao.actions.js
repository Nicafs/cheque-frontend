import { chequeOperacaoTypes } from './chequeOperacao.types';
import api from '../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/chequeOperacao/`&{id})
    .then(response => {

      return dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_GET,
        payload: response.data,
      });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const find = () => dispatch => {
  api.get('/chequeOperacao')
    .then((response)=>{
        dispatch({
          type: chequeOperacaoTypes.CHEQUE_OPERACAO_GET_ALL,
          data: response.data,
        });
    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
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

  api.put('/chequeOperacao', formData, config)
  .then(response => {

    return dispatch({
      type: chequeOperacaoTypes.CHEQUE_OPERACAO_UPDATE,
      payload: response.data,
    });

  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}

export const create = (formData, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    api.post('/chequeOperacao', formData, config)
    .then(response => {

    return dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_CREATE,
        payload: response.data,
    });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const deleteById = (id, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/chequeOperacao/${id}`, config)
  .then((response)=>{
      dispatch({
        type: chequeOperacaoTypes.CHEQUE_OPERACAO_DELETE,
        cheque: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
