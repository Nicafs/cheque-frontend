import { enderecoClientTypes } from './endereco.types';
import api from '../../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/enderecoClient/`&{id})
    .then(payload => {

      return dispatch({
        type: enderecoClientTypes.ENDERECO_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  api.get('/enderecoClient')
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

  api.put('/enderecoClient', formData, config)
  .then(payload => {

    return dispatch({
      type: enderecoClientTypes.ENDERECO_CLIENT_UPDATE,
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

    api.post('/enderecoClient', formData, config)
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

  api.delete(`/enderecoClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: enderecoClientTypes.ENDERECO_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
