import { clientTypes } from './client.types';
import api from '../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/clients/`&{id})
    .then(payload => {
      return dispatch({
        type: clientTypes.CLIENT_GET,
        payload,
      });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    }
  );
}

export const find = () => dispatch => {
  api.get('/clients')
    .then((response)=>{
      dispatch({
        type: clientTypes.CLIENT_GET_ALL,
        data: response.data,
      });
    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    }
  );
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

    toast.success('Foi Alterado com Sucesso !!', {
      position: toast.POSITION.BOTTOM_LEFT
    });
    
    return dispatch({
      type: clientTypes.CLIENT_UPDATE,
      payload: response.data,
    });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  }
);
}

export const create = (formData, history, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    api.post('/clients', formData, config)
    .then(payload => {

      toast.success('Foi Criado com Sucesso !!', {
        onClose: () => history.push(`/clientes/crud/${payload.data?.client?.id}`),
        position: toast.POSITION.BOTTOM_LEFT
      });

      return dispatch({
          type: clientTypes.CLIENT_CREATE,
          payload,
      });
    }).catch(err => {
        toast.error(err?.response?.data?.message, {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.log(err.response)
      }
    );
}

export const deleteById = (id,  history, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/clients/${id}`, config)
  .then((response)=>{
    
      toast.warn('Foi Deletado com Sucesso !!', {
        onClose: () => history.push(`/clientes`),
        position: toast.POSITION.BOTTOM_LEFT
      });

      return dispatch({
        type: clientTypes.CLIENT_DELETE,
        client: null,
      });
  }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    }
  );
}
