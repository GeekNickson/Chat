const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { verify, verifyToken } = require('../utils/verification/verify-token');
const { registerValidation, loginValidation } = require('../utils/validation/validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userExists = await User.findOne({ name: req.body.name });
  if (userExists) {
    return res.status(400).send('User with such a name already exists');
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
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send('Username is not found');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Wrong password');
  }

  const token = jwt.sign({ _id: user.id }, process.env.SECRET);
  res.header('auth-token', token).send(token);
});

router.get('/user', verifyToken, (req, res) => {
  res.send(req.user);
});
module.exports = router;
