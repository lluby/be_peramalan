// validations/forecastValidation.js
const { body } = require("express-validator");

const validateForecastData = [
  body('data')
    .isArray()
    .withMessage('Data harus berupa array.')
    .notEmpty()
    .withMessage('Data tidak boleh kosong.')
    .isLength({ min: 2 })
    .withMessage('Data harus berisi lebih dari satu nilai.')
    .custom((value) => value.every(item => typeof item === 'number'))
    .withMessage('Setiap item dalam data harus berupa angka.'),
  body('alpha')
    .isFloat({ min: 0, max: 1 })
    .withMessage('Alpha harus berupa angka antara 0 dan 1.')
];

module.exports = { validateForecastData };
