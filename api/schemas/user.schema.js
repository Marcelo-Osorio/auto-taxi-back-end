const joi = require('joi');

const id = joi.number().integer();
const username = joi.string().min(4).max(90);
const password = joi.string().min(7).max(100);
const email = joi.string().email({tlds: {allow: ['com']}}).max(100);
const birthdate = joi.date();

const createUserSchema = joi.object({
  username: username.required(),
  password: password.required(),
  email: email.required(),
  birthdate: birthdate.required(),
});

const getUserEmailSchema = joi.object({
  email: email.required()
});

const loginUserSchema = joi.object({
  email: email.required(),
  password: password.required()
});

const getUserSchema = joi.object({
  id: id.required()
});

const updateUserSchema = joi.object( {
  username: username,
  password: password,
  birthdate: birthdate
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema, getUserEmailSchema, loginUserSchema };


