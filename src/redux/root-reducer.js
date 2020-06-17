import { combineReducers } from 'redux';

import { users } from './user/user.reducer';
import clients from './client/client.reducer';
import cheques from './cheque/cheque.reducer';
import chequesOperacao from './cheque-operacao/chequeOperacao.reducer';
import bancos from './banco/banco.reducer';
import operacoes from './operacao/operacao.reducer';
import { alert } from './alert/alert.reducer';
import { authentication } from './authentication/authentication.reducer';

export default combineReducers({
  user: users,
  clients: clients,
  cheques: cheques,
  chequesOperacao: chequesOperacao,
  bancos: bancos,
  operacoes: operacoes,
  alert: alert,
  authentication: authentication
});