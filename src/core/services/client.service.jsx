import { CLIENT_GET, CLIENT_UPDATE, CLIENT_CREATE, CLIENT_GET_ALL } from '../../redux/client/client.types';

import axios from '../axios';

export const findById = id => dispatch => {
  axios.get(`/client/`&{id})
    .then(payload => {
     
      return dispatch({
        type: CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
    axios.get('/client')
      .then(payload => {
       
        return dispatch({
          type: CLIENT_GET_ALL,
          payload,
        });
  
      })
      .catch(err => console.log(err));
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
      type: CLIENT_UPDATE,
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

    axios.put('/client', formData, config)
    .then(payload => {

    return dispatch({
        type: CLIENT_CREATE,
        payload,
    });

    })
    .catch(err => console.log(err)); 
}