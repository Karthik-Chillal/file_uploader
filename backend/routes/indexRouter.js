import { Router } from 'express';
import loginRouter from './loginRouter.js';
import signUpRouter from './signUpRouter.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const indexRouter = Router();

indexRouter.use('/login', loginRouter);
indexRouter.use('/sign-up', signUpRouter);

indexRouter.get('/', requireAuth, (req, res) => {
  res.render('index');
});

indexRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default indexRouter;
