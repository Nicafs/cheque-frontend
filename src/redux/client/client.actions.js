import { clientTypes } from './client.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/client/`&{id})
    .then(payload => {
     
      return dispatch({
        type: clientTypes.CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  console.log("Entrou  mo find()");
  axios.get('/clients')
    .then((response)=>{
      console.log("Teve de resposta:", response);
        dispatch({
          type: clientTypes.CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
  }


export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/client', formData, config)
  .then(payload => {

    return dispatch({
      type: clientTypes.CLIENT_UPDATE,
      payload,
    });

  })
  .catch(err => console.log(err)); 
}

export const create = (formData, token) => dispatch => {
  console.log("Executando o create dos actions do client");
    const config = {
        headers: {
            'Authorization': token,
        }
    };
    console.log("Executando o create dos actions do client");

    axios.post('/clients', formData, config)
    .then(payload => {

      console.log("Resposta do axios:", payload);
    return dispatch({
        type: clientTypes.CLIENT_CREATE,
        payload,
    });

    })
    .catch(err => console.log(err)); 
}