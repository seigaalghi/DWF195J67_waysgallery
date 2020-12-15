const express = require('express');
const router = express.Router();

const { register, login, loadUser } = require('../controllers/auth');
const { getPosts, getPost, addPost } = require('../controllers/posts');
const { putUser, getUsers } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const { fileUpload } = require('../middlewares/upload');

// ==================================================================
// Auth
// ==================================================================
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth', auth, loadUser);

// ==================================================================
// Posts
// ==================================================================
router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.post('/post/', fileUpload('images'), auth, addPost);

// ==================================================================
// User
// ==================================================================
router.put('/user/profile/', fileUpload('avatar'), auth, putUser);
router.get('/users/', getUsers);

module.exports = router;
