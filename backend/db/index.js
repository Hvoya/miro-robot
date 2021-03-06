require("pg").defaults.parseInt8 = true;

const Sequelize = require("sequelize");

const config =
  process.env.NODE_ENV === "production"
    ? require("./config").production
    : require("./config").development;

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: "postgres"
});

const User = require("./models/user")(sequelize, Sequelize);
const Project = require("./models/project")(sequelize, Sequelize);
const Image = require("./models/image")(sequelize, Sequelize);
const File = require("./models/file")(sequelize, Sequelize);
const Comment = require("./models/comment")(sequelize, Sequelize);
const Like = require("./models/like")(sequelize, Sequelize);

User.hasMany(Project, { foreignKey: "user_id", targetKey: "id" });
User.hasOne(Image, { foreignKey: "user_id", targetKey: "id" });

Project.hasMany(Image, { foreignKey: "project_id", targetKey: "id", onDelete: "cascade" });
Project.hasMany(File, { foreignKey: "project_id", targetKey: "id" });
Project.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
Project.hasMany(Comment, { foreignKey: "project_id", targetKey: "id" });

// Image.hasOne(Project, { foreignKey: "main_image_id", as: "MainImage" });
// Image.belongsTo(Project, {
//   foreignKey: "project_id",
//   targetKey: "id",
//   onDelete: "NO ACTION"
// });
Image.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

File.belongsTo(Project, { foreignKey: "project_id", targetKey: "id" });

Comment.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

Like.belongsTo(User, { foreignKey: "user_id", targetKey: "id", onDelete: "cascade" });
Project.hasMany(Like, { foreignKey: "project_id", targetKey: "id", onDelete: "cascade" });

module.exports = {
  User,
  Project,
  Image,
  File,
  Comment,
  Like
};
