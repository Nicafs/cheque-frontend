import { referenciaClientTypes } from './referencia.types';
import api from '../../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/referenciaClient/`&{id})
    .then(payload => {

      return dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_GET,
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
  api.get('/referenciaClient')
    .then((response)=>{
        dispatch({
          type: referenciaClientTypes.REFERENCIA_CLIENT_GET_ALL,
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
      type: referenciaClientTypes.REFERENCIA_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put('/referenciaClient', formData, config)
  .then(payload => {

    return dispatch({
      type: referenciaClientTypes.REFERENCIA_CLIENT_UPDATE,
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

    api.post('/referenciaClient', formData, config)
    .then(payload => {

    return dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_CREATE,
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

  api.delete(`/referenciaClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_DELETE,
        client: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
