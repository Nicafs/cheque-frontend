import { referenciaClientTypes } from './referencia.types';
import api from '../../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/referenciaClient/`&{id})
    .then(payload => {

      return dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  api.get('/referenciaClient')
    .then((response)=>{
        dispatch({
          type: referenciaClientTypes.REFERENCIA_CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: referenciaClientTypes.REFERENCIA_CLIENT_FILTER,
      data: data,
    });
}

export const update = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put('/referenciaClient', formData, config)
  .then(payload => {

    return dispatch({
      type: referenciaClientTypes.REFERENCIA_CLIENT_UPDATE,
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

    api.post('/referenciaClient', formData, config)
    .then(payload => {

    return dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_CREATE,
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

  api.delete(`/referenciaClient/${id}`, config)
  .then((response)=>{
      dispatch({
        type: referenciaClientTypes.REFERENCIA_CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
