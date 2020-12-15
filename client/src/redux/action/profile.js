import { LOAD_PROFILE } from '../types';
import axios from 'axios';

export const loadProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: LOAD_PROFILE,
      payload: res.data.data.profile,
    });
  } catch (error) {
    console.log(error);
  }
};
