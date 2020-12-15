import { REMOVE_ALERT, SET_ALERT, SET_UPLOAD } from '../types';

export const setAlert = (message, alertType) => (dispatch) => {
  try {
    dispatch({
      type: SET_ALERT,
      payload: { message, alertType },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAlert = () => (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ALERT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setUpload = (progress) => (dispatch) => {
  try {
    dispatch({
      type: SET_UPLOAD,
      payload: progress,
    });
  } catch (error) {
    console.log(error);
  }
};
