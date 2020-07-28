
import api from '../../core/services/api';

export default function interceptorMiddleware() {
  return ({ dispatch, getState }) => next => (action) => {
    const {
      request,
    } = action;

    if (!request) {
      return next(action);
    }

    const { tokens } = getState().auth;

    // 5 minutes from now
    const refreshThreshold = (new Date.getTime() + 300000);

    if (tokens.refresh_token && refreshThreshold > tokens.expires_at) {
      return api.post('/sessions/refresh')
        .end((err, { body } = {}) => {
          dispatch({ type: 'SET_TOKENS', payload: body });
          request(body);
        });
    }
    return request(tokens);
  };
}
