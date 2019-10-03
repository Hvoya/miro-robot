module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(),
    }
  }, {
      timestamps: false
    });
  return Comment;
}