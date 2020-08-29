import { bancoTypes } from './banco.types';
import api from '../../core/services/api';
import { toast } from "react-toastify";

export const findById = (id) => dispatch => {
  api.get(`/bancos/${id}`)
  .then((response)=>{
    dispatch({
      type: bancoTypes.BANCO_GET,
      data: response.data,
        });
    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const find = () => dispatch => {
  api.get('/bancos')
    .then((response)=>{
        dispatch({
          type: bancoTypes.BANCO_GET_ALL,
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
      type: bancoTypes.BANCO_FILTER,
      data: data,
    });
}

export const update = (id, formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put(`/bancos/${id}`, formData, config)
  .then(response => {
    toast.success('Foi Alterado com Sucesso !!', {
      position: toast.POSITION.BOTTOM_LEFT
    });

    return dispatch({
      type: bancoTypes.BANCO_UPDATE,
      payload: response.data,
    });

  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}

export const create = (formData, history, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

  api.post('/bancos', formData, config)
  .then((response)=>{

    toast.success('Foi Criado com Sucesso !!', {
      onClose: () => history.push(`/bancos/crud/${response.data?.banco?.id}`),
      position: toast.POSITION.BOTTOM_LEFT
    });

    return dispatch({
        type: bancoTypes.BANCO_CREATE,
        banco: response.data,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}

export const deleteById = (id, history, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/bancos/${id}`, config)
  .then((response)=>{
      toast.warn('Foi Deletado com Sucesso !!', {
        onClose: () => history.push(`/bancos`),
        position: toast.POSITION.BOTTOM_LEFT
      });

      dispatch({
        type: bancoTypes.BANCO_DELETE,
        banco: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
