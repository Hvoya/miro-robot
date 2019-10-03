module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.SMALLINT
      },
      active: DataTypes.BOOLEAN,
      activation_token: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
      }
    },
    {
      timestamps: false
    }
  );
  return User;
};
