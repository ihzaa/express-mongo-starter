import { body } from "express-validator";
import User from "../../../models/User.js";

const auth = {
  register: [
    body("full_name").notEmpty().withMessage('is required.'),
    // body("status").notEmpty().withMessage('is required.').isIn(['active', 'inactive']),
    // body("role").notEmpty().withMessage('is required.').isIn(["admin", "casher", "employee"]),
    body("email")
      .notEmpty().withMessage('is required.')
      .isEmail()
      .custom(async (email) => {
        const getUser = await User.findOne({ email });
        if (getUser) {
          return Promise.reject("already in use.");
        }
      }),
    body("password").isLength({ min: 8 }),
    body("password_confirm").custom((value, { req }) => value === req.body.password).withMessage('is not match.')
  ],

  login: [
    body("email").notEmpty().withMessage('is required.').isEmail(),
    body("password").notEmpty().withMessage('is required.'),
  ],
  isEmailExist: [
    body("email")
      .notEmpty().withMessage('is required.')
      .isEmail()
      .custom(async (email) => {
        const getUser = await User.findOne({ email });
        if (getUser) {
          return Promise.reject("already in use.");
        }
      }),
  ]
};

export default auth;