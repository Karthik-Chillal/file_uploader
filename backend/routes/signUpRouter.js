import { Router } from 'express';
import {
  getSignUpPage,
  postSignUpPage,
} from '../controllers/mainController.js';
const signUpRouter = Router();
signUpRouter.get('/', getSignUpPage);
signUpRouter.post('/', postSignUpPage);
export default signUpRouter;
