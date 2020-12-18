import { LOAD_POSTS, LOAD_POST, ADD_POST, LIKE_POST, DISLIKE_POST } from '../types';

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
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case LIKE_POST:
      console.log(payload);
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === payload.id ? { ...post, likes: [...post.likes, payload.like] } : post)),
        loading: false,
      };
    case DISLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? { ...post, likes: post.likes.filter((like) => like.user.id !== payload.userId) } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
