import { clientTypes } from './client.types';
import api from '../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/clients/`&{id})
    .then(payload => {

      return dispatch({
        type: clientTypes.CLIENT_GET,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  console.log("Get ALl Clientes - 1");
  api.get('/clients')
    .then((response)=>{
      console.log("Get ALl Clientes - response.data:", response.data);
        dispatch({
          type: clientTypes.CLIENT_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: clientTypes.CLIENT_FILTER,
      data: data,
    });
}

export const update = (id, formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put(`/clients/${id}`, formData, config)
  .then(response => {

    return dispatch({
      type: clientTypes.CLIENT_UPDATE,
      payload: response.data,
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

    api.post('/clients', formData, config)
    .then(payload => {

    return dispatch({
        type: clientTypes.CLIENT_CREATE,
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

  api.delete(`/clients/${id}`, config)
  .then((response)=>{
      dispatch({
        type: clientTypes.CLIENT_DELETE,
        client: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
