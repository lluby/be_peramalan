const Joi = require("joi");

// Validasi untuk register
const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "staff").required(), // Validasi role
});

// Validasi untuk login
const loginValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerValidation, loginValidation };
