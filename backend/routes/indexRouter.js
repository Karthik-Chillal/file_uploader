import { Router } from 'express';
import loginRouter from './loginRouter.js';
import signUpRouter from './signUpRouter.js';
import folderRouter from './folderRouter.js';
import fileRouter from './fileRouter.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { displayFolder } from '../controllers/folderController.js';

const indexRouter = Router();

indexRouter.use('/login', loginRouter);
indexRouter.use('/sign-up', signUpRouter);

indexRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

indexRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

indexRouter.get('/home', requireAuth, displayFolder);
indexRouter.use('/folders', requireAuth, folderRouter);
indexRouter.use('/files', requireAuth, fileRouter);

export default indexRouter;
