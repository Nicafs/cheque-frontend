import { bancoTypes } from './banco.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/bancos/`&{id})
    .then(payload => {
     
      return dispatch({
        type: bancoTypes.BANCO_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/bancos')
    .then((response)=>{
        dispatch({
          type: bancoTypes.BANCO_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
  }

export const filter = (data) => dispatch => {
    dispatch({
      type: bancoTypes.BANCO_FILTER,
      data: data,
    });
  }


export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/bancos', formData, config)
  .then(payload => {

    return dispatch({
      type: bancoTypes.BANCO_UPDATE,
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

    axios.post('/bancos', formData, config)
    .then(payload => {

    return dispatch({
        type: bancoTypes.BANCO_CREATE,
        payload,
    });

    })
    .catch(err => console.log(err)); 
}