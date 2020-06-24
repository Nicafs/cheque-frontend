import { bancoClientTypes } from './banco.types';

import axios from '../../axios';

export const findById = id => dispatch => {
  axios.get(`/bancoClient/`&{id})
    .then(payload => {
     
      return dispatch({
        type: bancoClientTypes.BANCO_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/bancoClient')
    .then((response)=>{
        dispatch({
          type: bancoClientTypes.BANCO_CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
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

  axios.put('/bancoClient', formData, config)
  .then(payload => {

    return dispatch({
      type: bancoClientTypes.BANCO_CLIENT_UPDATE,
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

    axios.post('/bancoClient', formData, config)
    .then(payload => {

    return dispatch({
        type: bancoClientTypes.BANCO_CLIENT_CREATE,
        payload,
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

  axios.delete(`/bancoClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: bancoClientTypes.BANCO_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}