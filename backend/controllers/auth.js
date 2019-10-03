const DB = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const data = req.body;

    const user = await DB.User.findOne({ where: { email: data.email, active: true } });


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
    console.log(token)

    return res.send({ token })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
}

const activate = async(req, res) => {
  try{
    const user = await DB.User.findOne({where: {activation_token: req.params.token}});
    console.log(req.params)
    if(!user) return res.status(404).send({error: 'not found'});

    user.active = true;
    await user.save();

    return res.send({status: 0})

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
}

const validateEmail = async (req, res) => {
  try{

    const { email } = req.body;

    const user = await DB.User.findOne({where: {email, active: true}});

    return res.send({data: {isValid: user ? false : true}})

  } catch(error){
    console.error(error);
    return res.status(500).send({error});
  }
}

const connect = app => {
  app.post('/email/validate', validateEmail)
  app.post('/login', login);
  app.get('/user/activate/:token', activate);
}

module.exports = {
  connect
}
