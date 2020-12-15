import { AUTH_ERROR, LOAD_USER, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT, LOAD_USERS, REGISTER_FAILED } from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  users: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: true,
      };

    case REGISTER_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
