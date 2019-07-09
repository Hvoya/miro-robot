module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    original_name: DataTypes.STRING,
    type: DataTypes.STRING,
    avatar: DataTypes.BOOLEAN,
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.BIGINT,
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
  return User;
}