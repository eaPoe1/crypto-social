import { Router } from 'express';
import { createPost, deletePost, getPost, updatePost } from '../controllers/posts.js';

import checkAuth from '../middlewares/checkAuth.js';
const router = Router();

router.get('/', getPost);
router.post('/create-post', checkAuth, createPost);
router.put('/update-post/:id', checkAuth, updatePost);
router.delete('/remove-post/:id', checkAuth, deletePost);

export default router;
