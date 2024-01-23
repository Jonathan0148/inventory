const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Sale = require("../models/sale.model")
const Product = require("../models/product.model")

class SaleDetail extends Model {}

SaleDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },      
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },      
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },      
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },      
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "sale_detail"
    }
);

SaleDetail.belongsTo(Sale, { foreignKey: 'sale_id' });
SaleDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = SaleDetail;