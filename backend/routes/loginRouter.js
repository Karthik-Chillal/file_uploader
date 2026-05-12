import { Router } from 'express';
import { getLoginPage, postLoginPage } from '../controllers/mainController.js';
const loginRouter = Router();
loginRouter.get('/', getLoginPage);
loginRouter.post('/', postLoginPage);
export default loginRouter;
