const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "user"
    }
);

module.exports = User;