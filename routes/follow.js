import { Router } from 'express';
import { follow, followings, unfollow } from '../controllers/follow.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = new Router();

router.post('/:id', checkAuth, follow);
router.post('/unfollow/:id', checkAuth, unfollow);
router.get('/friends', checkAuth, followings);

export default router;