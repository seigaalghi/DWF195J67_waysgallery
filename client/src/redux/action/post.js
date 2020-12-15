import { LOAD_POSTS, LOAD_POST } from '../types';
import axios from 'axios';

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
