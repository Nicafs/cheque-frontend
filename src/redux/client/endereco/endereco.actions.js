import { enderecoClientTypes } from './endereco.types';

import axios from '../../axios';

export const findById = id => dispatch => {
  axios.get(`/enderecoClient/`&{id})
    .then(payload => {
     
      return dispatch({
        type: enderecoClientTypes.ENDERECO_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/enderecoClient')
    .then((response)=>{
        dispatch({
          type: enderecoClientTypes.ENDERECO_CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: enderecoClientTypes.ENDERECO_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/enderecoClient', formData, config)
  .then(payload => {

    return dispatch({
      type: enderecoClientTypes.ENDERECO_CLIENT_UPDATE,
      payload,
    });

  })
  .catch(err => console.log(err)); 
}

export const create = (formData, token) => dispatch => {
  console.log("Entrou no create do Endfereço");
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    console.log("Fazendo requisição post");
    axios.post('/enderecoClient', formData, config)
    .then(payload => {

    return dispatch({
        type: enderecoClientTypes.ENDERECO_CLIENT_CREATE,
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

  axios.delete(`/enderecoClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: enderecoClientTypes.ENDERECO_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}