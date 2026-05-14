import session from 'express-session';
import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import indexRouter from './routes/indexRouter.js';
import { pool } from './db/pool.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = [];
  next();
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username =$1',
        [username]
      );
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: 'no such username exists' });
      }
      const match = bcrypt.compareSync(password, user.password_hash);
      if (!match) {
        return done(null, false, { message: 'wrong password, try again.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: 'no user found' });
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ============================================================

app.use('/', indexRouter);

app.listen(port, () => {
  console.log('server listening on http://localhost:3000');
});
