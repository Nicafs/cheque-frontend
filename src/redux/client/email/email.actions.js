import { emailClientTypes } from './email.types';
import api from '../../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/emailClient/`&{id})
    .then(payload => {

      return dispatch({
        type: emailClientTypes.EMAIL_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  api.get('/emailClient')
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

  api.put('/emailClient', formData, config)
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

    api.post('/emailClient', formData, config)
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

  api.delete(`/emailClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: emailClientTypes.EMAIL_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
