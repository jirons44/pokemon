/* eslint-disable no-use-before-define, func-names, eqeqeq, consistent-return, no-underscore-dangle, max-len */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  pokemon: [{ type: mongoose.Schema.ObjectId, ref: 'Pokemon' }],
  dateCreated: { type: Date, default: Date.now },
});

schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.token = function () {
  const subscriber = this._id;
  const expDate = (Date.now() / 1000) + 60;
  const secretPhrase = process.env.SECRET;
  return jwt.encode({ subscriber, expDate }, secretPhrase);
};

schema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('User', schema);
