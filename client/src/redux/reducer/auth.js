import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  APPROVE_HIRE,
  REJECT_HIRE,
  SEND_PROJECT,
  ADD_HIRING,
  EDIT_PROFILE,
  ADD_ART,
  APPROVEMENT,
  FOLLOW,
  UNFOLLOW,
} from '../types';

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
    case APPROVE_HIRE:
      return {
        ...state,
        user: { ...state.user, orders: state.user.orders.map((order) => (order.id === payload.id ? payload : order)) },
      };
    case REJECT_HIRE:
      return {
        ...state,
        user: { ...state.user, orders: state.user.orders.map((order) => (order.id === payload.id ? payload : order)) },
      };
    case SEND_PROJECT:
      return {
        ...state,
        user: { ...state.user, orders: state.user.orders.map((order) => (order.id === payload.id ? payload : order)) },
      };
    case ADD_HIRING:
      return {
        ...state,
        user: { ...state.user, offers: [...state.user.offers, payload] },
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case ADD_ART:
      return {
        ...state,
        user: { ...state.user, arts: [...state.user.arts, payload] },
      };
    case APPROVEMENT:
      return {
        ...state,
        user: { ...state.user, offers: state.user.offers.map((offer) => (offer.id === payload.id ? payload.hire : offer)) },
      };
    case FOLLOW:
      return {
        ...state,
        user: { ...state.user, following: [...state.user.following, payload] },
      };
    case UNFOLLOW:
      console.log(payload);
      return {
        ...state,
        user: { ...state.user, following: state.user.following.filter((follow) => follow.followedUser.id !== parseInt(payload)) },
      };

    default:
      return state;
  }
};

export default authReducer;
