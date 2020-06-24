import { combineReducers } from 'redux';

import { users } from './user/user.reducer';
import clients from './client/client.reducer';
import enderecosClient from './client/endereco/endereco.reducer';
import telefonesClient from './client/telefone/telefone.reducer';
import emailsClient from './client/email/email.reducer';
import bancosClient from './client/banco/banco.reducer';
import referenciasClient from './client/referencia/referencia.reducer';
import cheques from './cheque/cheque.reducer';
import chequesOperacao from './cheque-operacao/chequeOperacao.reducer';
import bancos from './banco/banco.reducer';
import operacoes from './operacao/operacao.reducer';
import { alert } from './alert/alert.reducer';
import { authentication } from './authentication/authentication.reducer';

export default combineReducers({
  user: users,
  clients: clients,
  enderecosClient: enderecosClient,
  telefonesClient: telefonesClient,
  emailsClient: emailsClient,
  bancosClient: bancosClient,
  referenciasClient: referenciasClient,
  cheques: cheques,
  chequesOperacao: chequesOperacao,
  bancos: bancos,
  operacoes: operacoes,
  alert: alert,
  authentication: authentication
});