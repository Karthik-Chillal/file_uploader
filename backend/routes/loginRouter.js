import { Router } from 'express';
import { getLoginPage, postLoginPage } from '../controllers/authController.js';
import { redirectIfAuthenticated } from '../middlewares/authMiddleware.js';
const loginRouter = Router();
loginRouter.get('/', redirectIfAuthenticated, getLoginPage);
loginRouter.post('/', postLoginPage);

export default loginRouter;
