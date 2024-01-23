const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/user.model");

class Sale extends Model {}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "sale"
  }
);

Sale.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Sale;