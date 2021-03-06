import { chequeTypes } from './cheque.types';
import api from '../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/cheques/`&{id})
    .then(response => {

      return dispatch({
        type: chequeTypes.CHEQUE_GET,
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
  api.get('/cheques')
    .then((response)=>{
        dispatch({
          type: chequeTypes.CHEQUE_GET_ALL,
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
      type: chequeTypes.CHEQUE_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put('/cheques', formData, config)
  .then(response => {

    return dispatch({
      type: chequeTypes.CHEQUE_UPDATE,
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

    api.post('/cheques', formData, config)
    .then(response => {

    return dispatch({
        type: chequeTypes.CHEQUE_CREATE,
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

  api.delete(`/cheques/${id}`, config)
  .then((response)=>{
      dispatch({
        type: chequeTypes.CHEQUE_DELETE,
        cheque: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
