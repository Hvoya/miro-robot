const DB = require("../db");
const bcrypt = require("bcrypt");
const RandExp = require("randexp");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const notActiveUserWithSuchEmail = await DB.User.findOne({where:{email: data.email, active: false}});
    if(notActiveUserWithSuchEmail){
      await notActiveUserWithSuchEmail.destroy();
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const avatar = await DB.Image.findByPk(data.avatar_id);

    const newUser = await DB.User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: passwordHash,
      role: 1,
      avatar_id: data.avatar_id,
      active: false,
      activation_token: new RandExp(/[A-Z,1-9]{35}/i).gen()
    });

    if (avatar) {
      avatar.avatar = true;
      avatar.user_id = newUser.id;
      await avatar.save();
    }
    const mailjet = require ('node-mailjet')
    .connect('df2e30d6166998fd99eac3a34a9949c8', '90de94f4176090f706c47774c6f7cdbd')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "kirindanil73@gmail.com",
            "Name": "miro"
          },
          "To": [
            {
              "Email": data.email,
              "Name": "MiroRobot"
            }
          ],
          "Subject": "Активация аккаунта MiroRobot.",
          "HTMLPart": `
         <p>Для подтверждения регистрации перейдите по <a href="http://mirorobot.ru/projects/activation/${
                  newUser.activation_token
                }">ссылке.</a></p>
              `,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })


    // var transporter = nodemailer.createTransport({
    //   service: "Yandex",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "miromailer@yandex.ru",
    //     pass: "amazingmiro48",
    //   }
    // });
    //
    // var mailOptions = {
    //   from: "miromailer@yandex.ru",
    //   to: data.email,
    //   subject: "MiroRobot account activation!",
    //   html: `
    //     <p>Для подтверждения регистрации перейдите по <a href="http://mirorobot.ru/projects/activation/${
    //       newUser.activation_token + Math.random()
    //     }">ссылке.</a></p>
    //   `
    // };
    //
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    return res.send({
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: data.username,
        email: newUser.email,
        role: 0
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await DB.User.findByPk(req.params.id, {
      attributes: ["username", "first_name", "email", "last_name"],
      include: {
        model: DB.Image,
        attributes: ["name"]
      }
    });

    if (!user) return res.status(404).send({ error: "not_found" });

    return res.send({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const connect = app => {
  app.post("/users", createUser);
  app.get("/users/:id", getUser);
};

module.exports = {
  connect
};
