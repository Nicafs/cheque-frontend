import { bancoTypes } from './banco.types';
import api from '../../core/services/api';

export const findById = (id) => dispatch => {
  api.get(`/bancos/${id}`)
  .then((response)=>{
    dispatch({
      type: bancoTypes.BANCO_GET,
      data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const find = () => dispatch => {
  api.get('/bancos')
    .then((response)=>{
        dispatch({
          type: bancoTypes.BANCO_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: bancoTypes.BANCO_FILTER,
      data: data,
    });
}

export const update = (id, formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put(`/bancos/${id}`, formData, config)
  .then(response => {

    return dispatch({
      type: bancoTypes.BANCO_UPDATE,
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

    api.post('/bancos', formData, config)
    .then((response)=>{
      return dispatch({
                  type: bancoTypes.BANCO_CREATE,
                  banco: response.data,
                });
            }).catch((err)=>{
                console.log(err);
            })
}

export const deleteById = (id, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/bancos/${id}`, config)
  .then((response)=>{
      dispatch({
        type: bancoTypes.BANCO_DELETE,
        banco: null,
      });
  }).catch((err)=>{
      console.log(err);
  })
}
