import { combineReducers } from 'redux';

import { users } from './user/user.reducer';
import clients from './client/client.reducer';
import { alert } from './alert/alert.reducer';
import { authentication } from './authentication/authentication.reducer';

export default combineReducers({
  user: users,
  client: clients,
  alert: alert,
  authentication: authentication
});