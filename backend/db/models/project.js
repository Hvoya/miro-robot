module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
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