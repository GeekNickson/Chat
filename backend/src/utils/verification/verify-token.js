const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied!');
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;
