const express = require('express');
const router = express.Router();

const { register, login, loadUser } = require('../controllers/auth');
const { getPosts } = require('../controllers/posts');
const { auth } = require('../middlewares/auth');

// ==================================================================
// Auth
// ==================================================================
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth', auth, loadUser);

// ==================================================================
// Posts
// ==================================================================
// router.post('/auth/register', register);
// router.post('/auth/login', login);
router.get('/posts', getPosts);

module.exports = router;
