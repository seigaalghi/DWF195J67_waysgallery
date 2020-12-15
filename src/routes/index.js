const express = require('express');
const router = express.Router();

const { register, login, loadUser } = require('../controllers/auth');
const { getPosts, getPost, addPost } = require('../controllers/posts');
const { putUser, getUsers, loadUserById } = require('../controllers/user');
const { addProject } = require('../controllers/project');
const { auth } = require('../middlewares/auth');
const { fileDownload } = require('../middlewares/file');
const { fileUpload } = require('../middlewares/upload');
const { approveHire, rejectHire } = require('../controllers/hire');

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
router.post('/post/', fileUpload('photos', null), auth, addPost);

// ==================================================================
// User
// ==================================================================
router.put('/user/profile/', fileUpload('avatar', 'arts'), auth, putUser);
router.get('/users/', getUsers);
router.get('/user/:id', loadUserById);

// ==================================================================
// Project
// ==================================================================

router.post('/project/:hireId', fileUpload('images', null), auth, addProject);

// ==================================================================
// Hire
// ==================================================================

router.put('/hire/:id', auth, approveHire);
router.delete('/hire/:id', auth, rejectHire);

// ==================================================================
// File
// ==================================================================
router.get('/files/:file', fileDownload);

module.exports = router;
