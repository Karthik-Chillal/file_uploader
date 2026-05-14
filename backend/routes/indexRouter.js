import { Router } from 'express';
import loginRouter from './loginRouter.js';
import signUpRouter from './signUpRouter.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: './uploads' });
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
indexRouter.get('/home', requireAuth, (req, res) => {
  console.log(req.session);
  res.render('index');
});
indexRouter.post('/home', upload.single('uploaded_file'), function (req, res) {
  console.log(req.file, req.body);
  res.redirect('/home');
  // next();
});

export default indexRouter;
