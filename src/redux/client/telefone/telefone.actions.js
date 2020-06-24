import { telefoneClientTypes } from './telefone.types';

import axios from '../../axios';

export const findById = id => dispatch => {
  axios.get(`/telefoneClient/`&{id})
    .then(payload => {
     
      return dispatch({
        type: telefoneClientTypes.TELEFONE_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/telefoneClient')
    .then((response)=>{
        dispatch({
          type: telefoneClientTypes.TELEFONE_CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: telefoneClientTypes.TELEFONE_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/telefoneClient', formData, config)
  .then(payload => {

    return dispatch({
      type: telefoneClientTypes.TELEFONE_CLIENT_UPDATE,
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

    axios.post('/telefoneClient', formData, config)
    .then(payload => {

    return dispatch({
        type: telefoneClientTypes.TELEFONE_CLIENT_CREATE,
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

  axios.delete(`/telefoneClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: telefoneClientTypes.TELEFONE_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}