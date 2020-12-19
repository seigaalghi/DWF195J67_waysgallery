import axios from 'axios';
import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  LOAD_USERS,
  APPROVE_HIRE,
  REJECT_HIRE,
  SEND_PROJECT,
  ADD_HIRING,
  EDIT_PROFILE,
  ADD_ART,
  APPROVEMENT,
  FOLLOW,
  UNFOLLOW,
  CHANGE_PROFILE,
} from '../types';
import { setAlert, setUpload } from './alert';
import setAuth from '../utility/setAuthToken';

// =====================================================================
// Load User
// =====================================================================

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token);
  }
  try {
    const res = await axios.get('/api/v1/auth/');
    dispatch({
      type: LOAD_USER,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Register
// =====================================================================

export const userRegister = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Registered Successfully', 'success'));
    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Login
// =====================================================================

export const userLogin = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Logged in Successfully', 'success'));
    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Logout
// =====================================================================

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =========================================================================================
// Load User
// =========================================================================================

export const loadUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users`);
    dispatch({
      type: LOAD_USERS,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// Approve Hire
// =========================================================================================

export const approveHire = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/hire/${id}`);
    dispatch({
      type: APPROVE_HIRE,
      payload: res.data.data.hire,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// Reject Hire
// =========================================================================================

export const rejectHire = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/hire/${id}`);
    dispatch({
      type: REJECT_HIRE,
      payload: res.data.data.hire,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// Send Project
// =========================================================================================

export const sendProject = (id, data) => async (dispatch) => {
  const { images, description } = data;
  const formData = new FormData();
  formData.append('images', images[0]);
  formData.append('images', images[1]);
  formData.append('images', images[2]);
  formData.append('images', images[4]);
  formData.append('images', images[5]);
  formData.append('description', description);

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      dispatch(setUpload(percentage));
    },
  };
  try {
    const res = await axios.post(`/api/v1/project/${id}`, formData, config);
    dispatch({
      type: SEND_PROJECT,
      payload: res.data.data.hire,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// Add Hiring
// =========================================================================================

export const addHiring = (id, data) => async (dispatch) => {
  const body = JSON.stringify({ ...data, orderTo: id });

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/v1/hire`, body, config);
    dispatch({
      type: ADD_HIRING,
      payload: res.data.data.hire,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =====================================================================
// Edit Profile
// =====================================================================

export const editProfile = (data) => async (dispatch) => {
  const { name, greeting, avatar } = data;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('greeting', greeting);
  if (avatar) {
    formData.append('avatar', avatar);
  }
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.put(`/api/v1/user/profile`, formData, config);
    dispatch({
      type: EDIT_PROFILE,
      payload: res.data.data.user,
    });
    dispatch({
      type: CHANGE_PROFILE,
      payload: res.data.data.user,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =====================================================================
// Add Art
// =====================================================================

export const addArt = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append('arts', data[0]);
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      dispatch(setUpload(percentage));
    },
  };
  try {
    const res = await axios.post(`/api/v1/user/art`, formData, config);
    dispatch({
      type: ADD_ART,
      payload: res.data.data.art,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =====================================================================
// Approvement
// =====================================================================

export const approvement = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/hire/approve/${id}`);
    dispatch({
      type: APPROVEMENT,
      payload: { hire: res.data.data.hire, id },
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =====================================================================
// Follow
// =====================================================================

export const follow = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/user/follow/${id}`);
    dispatch({
      type: FOLLOW,
      payload: res.data.data.follow,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =====================================================================
// Unfollow
// =====================================================================

export const unfollow = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/user/follow/${id}`);
    dispatch({
      type: UNFOLLOW,
      payload: id,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};
