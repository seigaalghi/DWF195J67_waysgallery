import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import profile from './profile';
import alert from './alert';

export default combineReducers({ auth, post, profile, alert });
