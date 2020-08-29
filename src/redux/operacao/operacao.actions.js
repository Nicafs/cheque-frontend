import { operacaoTypes } from './operacao.types';
import api from '../../core/services/api';
import { toast } from "react-toastify";

export const findById = id => dispatch => {
  api.get(`/operacoes/${id}`)
    .then(response => {

      return dispatch({
        type: operacaoTypes.OPERACOES_GET,
        payload: response.data,
      });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const findLastId = () => dispatch => {
  api.get('/operacoes/lastId')
    .then((response)=>{
      dispatch({
        type: operacaoTypes.OPERACOES_GET_LAST_ID,
        lastId: response.id,
      });
    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const find = () => dispatch => {
  api.get('/operacoes')
    .then((response)=>{

      const max = response.data.reduce((prev, current) =>
        prev.id > current.id ? prev : current,
      );

      dispatch({
        type: operacaoTypes.OPERACOES_GET_ALL,
        data: response.data,
        lastId: max.id,
      });
    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const filter = (data) => dispatch => {
    dispatch({
      type: operacaoTypes.OPERACOES_FILTER,
      data: data,
    });
}

export const update = (id, formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.put(`/operacoes/${id}`, formData, config)
  .then(response => {
    toast.success('Foi Alterado com Sucesso !!', {
      position: toast.POSITION.BOTTOM_LEFT
    });

    return dispatch({
      type: operacaoTypes.OPERACOES_UPDATE,
      payload: response.data,
    });

  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}

export const create = (formData, history, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    api.post('/operacoes', formData, config)
    .then(response => {

      toast.success('Foi Criado com Sucesso !!', {
        onClose: () => history.push(`/operacoes/crud/${response.data?.operacao?.id}`),
        position: toast.POSITION.BOTTOM_LEFT
      });

      return dispatch({
          type: operacaoTypes.OPERACOES_CREATE,
          payload: response.data,
      });

    }).catch(err => {
      toast.error(err?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.log(err.response)
    });
}

export const deleteById = (id, history, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  api.delete(`/operacoes/${id}`, config)
  .then((response)=>{

      toast.warn('Foi Deletado com Sucesso !!', {
        onClose: () => history.push(`/operacoes`),
        position: toast.POSITION.BOTTOM_LEFT
      });

      dispatch({
        type: operacaoTypes.OPERACOES_DELETE,
        cheque: null,
      });
  }).catch(err => {
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    console.log(err.response)
  });
}
