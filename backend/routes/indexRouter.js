import { Router } from 'express';
import loginRouter from './loginRouter.js';
import signUpRouter from './signUpRouter.js';
const indexRouter = Router();

indexRouter.use('/login', loginRouter);
indexRouter.use('/sign-up', signUpRouter);
indexRouter.get('/', (req, res) => {
  res.send('hello world');
});
export default indexRouter;
