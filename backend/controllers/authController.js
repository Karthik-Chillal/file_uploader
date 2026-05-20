import passport from 'passport';
import { pool } from '../db/pool.js';
import bcrypt from 'bcryptjs';

export const getSignUpPage = (req, res) => {
  res.render('signUpPage');
};

export const postSignUpPage = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await pool.query(
      'INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3)',
      [req.body.username, req.body.email, hashedPassword]
    );
    res.redirect('/home');
  } catch (err) {
    return next(err);
  }
};

export const getLoginPage = (req, res) => {
  const errors = req.session.messages || [];
  req.session.messages = [];
  res.render('loginPage', { errors });
};

export const postLoginPage = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureMessage: true,
});
