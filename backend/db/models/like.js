module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('like', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(),
      }
    }, {
        timestamps: false
      });
    return Like;
  }