/* eslint-disable no-use-before-define, func-names, eqeqeq, consistent-return, no-underscore-dangle, max-len */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Pokemon', schema);
