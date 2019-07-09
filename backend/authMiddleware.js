const DB = require('./db');
const jwt = require('jsonwebtoken');

const varifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) res.status(401).send({ error: 'Forbidden' });
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

module.exports = {
  varifyUser
}