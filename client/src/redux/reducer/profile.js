import { LOAD_PROFILE } from '../types';

const initialState = {
  profile: null,
  profiles: null,
  loading: true,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
