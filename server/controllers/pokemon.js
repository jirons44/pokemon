/* eslint-disable new-cap, consistent-return */

import express from 'express';
import Pokemon from '../models/pokemon';

const router = module.exports = express.Router();

// create
router.post('/', (req, res) => {
  const pokemon = new Pokemon(req.body);
  console.log('req.body********: ', req.body);
  pokemon.save(() => {
    console.log('pokeman1111: ', { pokemon });
    res.send({ pokemon });
  });
});

router.get('/', (req, res) => {
  Pokemon.find().exec((err, pokemon) => {
    res.send({ pokemon });
  });
});
