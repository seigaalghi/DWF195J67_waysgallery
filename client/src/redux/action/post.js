import { LOAD_POSTS, LOAD_POST, ADD_POST } from '../types';
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
    console.log(error);
  }
};

export const loadPosts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts`);
    dispatch({
      type: LOAD_POSTS,
      payload: res.data.data.posts,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};
