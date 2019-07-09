const DB = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const passwordHash = await bcrypt.hash(data.password, 10);

    const avatar = await DB.Image.findByPk(data.avatar_id);

    console.log(avatar)

    const newUser = await DB.User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: passwordHash,
      role: 0,
      avatar_id: data.avatar_id
    });

    avatar.avatar = true;
    avatar.user_id = newUser.id;

    await avatar.save();

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

const getUser = async (req, res) => {
  try {

    const user = await DB.User.findByPk(req.params.id, {
      attributes: ['username', 'first_name', 'email', 'last_name'],
      include: {
        model: DB.Image,
        attributes: ['name']
      }
    });

    if (!user) return res.status(404).send({ error: 'not_found' });

    return res.send({ data: user });

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

const connect = app => {
  app.post('/users', createUser);
  app.get('/users/:id', getUser);
}

module.exports = {
  connect
}