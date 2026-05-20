import { Router } from 'express';
import {
  getSignUpPage,
  postSignUpPage,
} from '../controllers/authController.js';
import { redirectIfAuthenticated } from '../middlewares/authMiddleware.js';
const signUpRouter = Router();
signUpRouter.get('/', redirectIfAuthenticated, getSignUpPage);
signUpRouter.post('/', postSignUpPage);
export default signUpRouter;
