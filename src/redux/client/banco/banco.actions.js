import { bancoClientTypes } from './banco.types';
import api from '../../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/bancoClient/`&{id})
    .then(payload => {

      return dispatch({
        type: bancoClientTypes.BANCO_CLIENT_GET,
        payload,
      });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const find = () => dispatch => {
  api.get('/bancoClient')
    .then((response)=>{
        dispatch({
          type: bancoClientTypes.BANCO_CLIENT_GET_ALL,
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
      type: bancoClientTypes.BANCO_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put('/bancoClient', formData, config)
  .then(payload => {

    return dispatch({
      type: bancoClientTypes.BANCO_CLIENT_UPDATE,
      payload,
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

    api.post('/bancoClient', formData, config)
    .then(payload => {

    return dispatch({
        type: bancoClientTypes.BANCO_CLIENT_CREATE,
        payload,
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

  api.delete(`/bancoClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: bancoClientTypes.BANCO_CLIENT_DELETE,
        client: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
