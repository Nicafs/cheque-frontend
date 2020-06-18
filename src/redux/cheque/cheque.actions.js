import { chequeTypes } from './cheque.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/cheques/`&{id})
    .then(response => {
     
      return dispatch({
        type: chequeTypes.CHEQUE_GET,
        payload: response.data,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/cheques')
    .then((response)=>{
        dispatch({
          type: chequeTypes.CHEQUE_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
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

  axios.put('/cheques', formData, config)
  .then(response => {

    return dispatch({
      type: chequeTypes.CHEQUE_UPDATE,
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

    axios.post('/cheques', formData, config)
    .then(response => {

    return dispatch({
        type: chequeTypes.CHEQUE_CREATE,
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

  axios.delete(`/cheques/${id}`, config)
  .then((response)=>{
      dispatch({
        type: chequeTypes.CHEQUE_DELETE,
        cheque: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}