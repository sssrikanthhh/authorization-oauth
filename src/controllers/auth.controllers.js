const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const User = require('../models/user.models');


router.post('/register',
  body('name')
    .not()
    .isEmpty()
    .withMessage('name cannot be empty'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('name cannot be empty')
    .isEmail()
    .withMessage('please enter a valid email')
    .custom(async (userEmail) => {
      let userCheck = await User.find({ email: userEmail });

      if (userCheck) {
        throw new Error('email is already taken');
      }
      return true;
    }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be atleast 6 characters')
  , async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create(req.body);
      const token = jwt.sign({ user }, process.env.JWT_SCREAT);
      return res.status(201).send({ user, token });
    } catch (err) {
      return res.status(501).send({ err });
    }
  });


router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ msg: "user doesn't exists, please register" });
    }
    const check = user.verifyPassword(req.body.password);
    if (!check) {
      return res.status(400).send({ msg: "wrong email or password" });
    }
    const token = jwt.sign({ user }, process.env.JWT_SCREAT);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(501).send({ err });
  }
});


module.exports = router;