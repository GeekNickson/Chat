const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const messageConstants = require('../utils/constants');
const validation = require('../utils/validation/validation');
const verifyToken = require('../utils/verification/verify-token');

router.post('/register', async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userExists = await User.findOne({ name: req.body.name });
  if (userExists) {
    return res.status(400).send(messageConstants.USER_ALREADY_EXISTS);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send(messageConstants.AUTH_ERROR_MSG);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send(messageConstants.AUTH_ERROR_MSG);
  }

  const token = jwt.sign({ _id: user.id }, process.env.SECRET);
  res.header('auth-token', token).send({ token, msg: messageConstants.AUTH_SUCCESS_MSG });
});

router.get('/user', verifyToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
