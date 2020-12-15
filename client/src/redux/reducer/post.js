import { LOAD_POSTS, LOAD_POST } from '../types';

const initialState = {
  post: null,
  posts: null,
  loading: true,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
