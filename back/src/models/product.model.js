const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db");

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lot_number: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },        
        quantity_available: {
            type: DataTypes.INTEGER,
            allowNull: false
        }  
    }, {
        sequelize,
        modelName: "Product"
    }
);

module.exports = Product;