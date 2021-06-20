const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Park extends Model { }
Park.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    park_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activities: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fees: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    contact: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    weather: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'park'
  }
);
module.exports = Park;