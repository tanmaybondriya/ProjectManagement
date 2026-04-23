import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("name")
    .isLength({ min: 6 })
    .withMessage("Enter a valid name (more than 2 character)"),
  body("password").isLength({ min: 6 }).withMessage("More than 6 characters"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 characters required"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array });
    }
    next();
  },
];
