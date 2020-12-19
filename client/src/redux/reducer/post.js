import { LOAD_POSTS, LOAD_POST, ADD_POST, LIKE_POST, DISLIKE_POST, COMMENT_POST, DELETE_COMMENT } from '../types';

const initialState = {
  post: null,
  posts: null,
  count: null,
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
        posts: payload.posts,
        count: payload.count,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case LIKE_POST:
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
    case COMMENT_POST:
      return {
        ...state,
        post: { ...state.post, comments: [payload, ...state.post.comments] },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: state.post.comments.filter((comment) => comment.id !== parseInt(payload)) },
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
