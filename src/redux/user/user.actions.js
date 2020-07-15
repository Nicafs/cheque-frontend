import { userTypes } from './user.types';
import api from '../../core/services/api';
import { logout as logoutService } from '../../core/services/auth.service';
import { history } from '../../core/helpers/history';

export const userActions = {
    login,
    logout,
    getAll,
    getById,
    create,
    update,
    filter,
    deleteById
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        api.post('/sessions', { username, password })
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userTypes.LOGIN_FAILURE, error } }
}

function logout() {
  logoutService();
  return { type: userTypes.LOGOUT };
}

function create(formData, token) {
    return dispatch => {
      const config = {
        headers: {
          'Authorization': token,
        }
      };

        dispatch(request(formData));

        api.post('/users', formData, config)
            .then(
                user => {
                    dispatch(success(user.data));
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(users) { return { type: userTypes.USERS_CREATE_REQUEST, users } }
    function success(users) { return { type: userTypes.USERS_CREATE_SUCCESS, users } }
    function failure(error) { return { type: userTypes.USERS_CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        api.get('/users')
            .then(
                users => dispatch(success(users.data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userTypes.USERS_GETALL_REQUEST } }
    function success(users) { return { type: userTypes.USERS_GETALL_SUCCESS, users } }
    function failure(error) { return { type: userTypes.USERS_GETALL_FAILURE, error } }
}

function getById(id) {
  return dispatch => {
      dispatch(request());

      api.get(`/users/${id}`)
          .then(
              users => dispatch(success(users.data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userTypes.USERS_GETBYID_REQUEST } }
  function success(users) { return { type: userTypes.USERS_GETBYID_SUCCESS, users } }
  function failure(error) { return { type: userTypes.USERS_GETBYID_FAILURE, error } }
}

function update(id, formData, token) {
  return dispatch => {
      dispatch(request());
      const config = {
        headers: {
          'Authorization': token,
        }
      };

      api.put(`/users/${id}`, formData, config)
          .then(
              users => dispatch(success(users.data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userTypes.USERS_UPDATE_REQUEST } }
  function success(users) { return { type: userTypes.USERS_UPDATE_SUCCESS, users } }
  function failure(error) { return { type: userTypes.USERS_UPDATE_FAILURE, error } }
}

function filter(data) {
  return dispatch => {
      dispatch(request(data));
  };

  function request(data) { return { type: userTypes.USERS_FILTER_REQUEST, data } }
}

function deleteById(id, token) {
    return dispatch => {
        dispatch(request(id));
        const config = {
          headers: {
            'Authorization': token,
          }
        };

        api.delete(`/users/${id}`, config)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userTypes.USERS_DELETE_REQUEST, id } }
    function success(id) { return { type: userTypes.USERS_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userTypes.USERS_DELETE_FAILURE, id, error } }
}
