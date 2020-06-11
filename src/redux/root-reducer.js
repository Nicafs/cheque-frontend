import { combineReducers } from 'redux';

import { users } from './user/user.reducer';
import clients from './client/client.reducer';
import cheques from './cheque/cheque.reducer';
import bancos from './banco/banco.reducer';
import { alert } from './alert/alert.reducer';
import { authentication } from './authentication/authentication.reducer';

export default combineReducers({
  user: users,
  client: clients,
  cheques: cheques,
  bancos: bancos,
  alert: alert,
  authentication: authentication
});