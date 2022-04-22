import { Router } from 'express';
import { confirm, login, profile, signup } from '../controllers/users.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirm);
router.post('/login', login);

router.get('/profile', checkAuth, profile);


export default router;