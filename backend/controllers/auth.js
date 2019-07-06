const DB = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const data = req.body;

    const user = await DB.User.findOne({ where: { email: data.email } });


    if (!user) return res.status(404).send({ error: 'not found' });

    const accepted = await bcrypt.compare(data.password, user.password);

    if (!accepted) return res.status(404).send({ error: 'wrong password' });

    const payload = {
      id: user.id,
      role: user.role,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at
    }

    const token = await jwt.sign(payload, process.env.SECRET_KEY);

    return res.send({ token })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
}

const connect = app => {
  app.post('/login', login);
}

module.exports = {
  connect
}