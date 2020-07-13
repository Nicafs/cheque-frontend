import { historicoOperacoesTypes } from './historico-operacoes.types';
import api from '../../core/services/api';

export const findById = id => dispatch => {
  api.get(`/historicoOperacoes/`&{id})
    .then(response => {

      return dispatch({
        type: historicoOperacoesTypes.HISTORICO_OPERACOES_GET,
        historicoOperacao: response.data,
      });

    })
    .catch(err => console.log(err));
}

export const find = () => dispatch => {
  api.get('/historicoOperacoes')
    .then((response)=>{
        dispatch({
          type: historicoOperacoesTypes.HISTORICO_OPERACOES_GET_ALL,
          data: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })
}

export const filter = (data) => dispatch => {
    dispatch({
      type: historicoOperacoesTypes.HISTORICO_OPERACOES_FILTER,
      data: data,
    });
}
