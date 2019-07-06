require('pg').defaults.parseInt8 = true

const Sequelize = require('sequelize');

const config = process.env.NODE_ENV === 'production' ? require('./config').production : require('./config').development;

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: 'postgres'
});

const User = require("./models/user")(sequelize, Sequelize);
const Project = require("./models/project")(sequelize, Sequelize);
const Image = require("./models/image")(sequelize, Sequelize);
const File = require("./models/file")(sequelize, Sequelize);

User.hasMany(Project);

Project.hasMany(Image);
Project.hasMany(File);
Project.belongsTo(User);

Image.belongsTo(Project);

File.belongsTo(Project);

module.exports = {
  User,
  Project,
  Image,
  File
}