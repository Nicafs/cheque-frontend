import { emailClientTypes } from './email.types';

import axios from '../../axios';

export const findById = id => dispatch => {
  axios.get(`/emailClient/`&{id})
    .then(payload => {
     
      return dispatch({
        type: emailClientTypes.EMAIL_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  axios.get('/emailClient')
    .then((response)=>{
        dispatch({
          type: emailClientTypes.EMAIL_CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: emailClientTypes.EMAIL_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/emailClient', formData, config)
  .then(payload => {

    return dispatch({
      type: emailClientTypes.EMAIL_CLIENT_UPDATE,
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

    axios.post('/emailClient', formData, config)
    .then(payload => {

    return dispatch({
        type: emailClientTypes.EMAIL_CLIENT_CREATE,
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

  axios.delete(`/emailClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: emailClientTypes.EMAIL_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}