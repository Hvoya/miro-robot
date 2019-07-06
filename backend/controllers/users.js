const DB = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await DB.User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: passwordHash,
      role: 0
    });

    return res.send({
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: data.username,
        email: newUser.email,
        role: 0
      }
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

const connect = app => {
  app.post('/users', createUser);
}

module.exports = {
  connect
}