/* eslint-disable new-cap, consistent-return */

import express from 'express';
import User from '../models/user';
import passport from 'passport';

const router = module.exports = express.Router();

// // create

// router.post('/', (req, res) => {
//   const pokemon = new Pokemon(req.body);
//   console.log('req.body********: ', req.body);
//   pokemon.save(() => {
//     console.log('pokeman1111: ', { pokemon });
//     res.send({ pokemon });
//   });
// });

router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    if (!user) {
      return res.status(400).send();
    }
    return res.status(200).send();
  });
});

// session false is no cookies
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = req.user.token();
  res.send({ token });
});
