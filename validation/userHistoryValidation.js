const { body, validationResult } = require('express-validator');

const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateManageInventory = [
  body('username').notEmpty().withMessage('Username is required'),
  body('action').isIn(['add', 'update', 'delete']).withMessage('Invalid action'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateLogin, validateManageInventory };
