import { chequeTypes } from './cheque.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/cheques/`&{id})
    .then(payload => {
     
      return dispatch({
        type: chequeTypes.CHEQUE_GET,
        payload,
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
  .then(payload => {

    return dispatch({
      type: chequeTypes.CHEQUE_UPDATE,
      payload,
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
    .then(payload => {

    return dispatch({
        type: chequeTypes.CHEQUE_CREATE,
        payload,
    });

    })
    .catch(err => console.log(err)); 
}