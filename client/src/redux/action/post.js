import { LOAD_POSTS, LOAD_POST, ADD_POST, LIKE_POST, DISLIKE_POST } from '../types';
import axios from 'axios';
import { setAlert } from './alert';

export const loadPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: LOAD_POST,
      payload: res.data.data.post,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const loadPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts`);
    dispatch({
      type: LOAD_POSTS,
      payload: res.data.data.posts,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const addPost = (data) => async (dispatch) => {
  const { photos, title, description } = data;
  const formData = new FormData();
  formData.append('photos', photos[0]);
  formData.append('photos', photos[1]);
  formData.append('photos', photos[2]);
  formData.append('photos', photos[4]);
  formData.append('photos', photos[5]);
  formData.append('title', title);
  formData.append('description', description);

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.post(`/api/v1/post`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data.data.post,
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

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/post/like/${id}`);
    dispatch({
      type: LIKE_POST,
      payload: { like: res.data.data.like, id },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const dislikePost = (id, userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/like/${id}`);
    dispatch({
      type: DISLIKE_POST,
      payload: { id, userId },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};
