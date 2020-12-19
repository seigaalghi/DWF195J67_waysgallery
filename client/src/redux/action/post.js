import { LOAD_POSTS, LOAD_POST, ADD_POST, LIKE_POST, DISLIKE_POST, COMMENT_POST, DELETE_COMMENT } from '../types';
import axios from 'axios';
import { setAlert, setUpload } from './alert';

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

export const loadPosts = (limit) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${limit}`);
    dispatch({
      type: LOAD_POSTS,
      payload: { posts: res.data.data.posts.rows, count: res.data.data.posts.count },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const loadFollowedPosts = (limit, data) => async (dispatch) => {
  const body = JSON.stringify(data);
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/v1/posts/${limit}`, body, config);
    dispatch({
      type: LOAD_POSTS,
      payload: { posts: res.data.data.posts.rows, count: res.data.data.posts.count },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const loadPostByUser = (limit, userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${limit}/${userId}`);
    dispatch({
      type: LOAD_POSTS,
      payload: { posts: res.data.data.posts.rows, count: res.data.data.posts.count },
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
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      dispatch(setUpload(percentage));
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

export const addComment = (data, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post(`/api/v1/post/comment/${id}`, body, config);
    dispatch({
      type: COMMENT_POST,
      payload: res.data.data.comment,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/comment/${id}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: id,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};
