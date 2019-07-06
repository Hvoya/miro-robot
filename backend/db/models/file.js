module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('file', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    original_name: DataTypes.STRING,
    type: DataTypes.STRING,
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
  return User;
}