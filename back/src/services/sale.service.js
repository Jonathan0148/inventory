const sequelize = require("../config/db");
const Sale = require("../models/sale.model");
const SaleDetail = require("../models/saleDetail.model");
const Product = require("../models/product.model");

class SaleService {
    async findAll(req, res) {
        try {
            const data = await Sale.findAll();
            res.status(200).json({
                ok: true,
                status: 200,
                body: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al obtener las ventas"
            });
        }
    }
    
    async findOne(req, res) {
        const id = req.params.id;
        try {
            const sale = await Sale.findOne({ where: { id } });

            if (!sale) {
              return res.status(404).json({
                ok: false,
                status: 404,
                message: `No existe una venta con el ID ${id}`
              });
            }
            
            const saleDetails = await SaleDetail.findAll({ where: { sale_id: sale.id } });
            res.status(200).json({
                ok: true,
                status: 200,
                body: { sale, saleDetails }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: `Error al obtener venta por ID ${id}`
            });
        }
    }

    async create(req, res) {
        const data = req.body;
        if (!(data.user_id ?? !data.products) || !Array.isArray(data.products) || data.products.length === 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }
    
        const productIds = data.products.map(product => product.product_id);
        const products = await Product.findAll({ where: { id: productIds } });
    
        try {
            for (const product of data.products) {
                const productConsult = products.find(p => p.id === product.product_id);
    
                if (!productConsult || productConsult.quantity_available < product.quantity) {
                    return res.status(400).json({
                        ok: false,
                        status: 400,
                        message: `No puede comprar ${product.quantity} ${productConsult?.name || 'producto'} porque quedan ${productConsult?.quantity_available || 0}`
                    });
                }
            }
    
            const transaction = await sequelize.transaction();
    
            try {
                for (const product of data.products) {
                    const productConsult = products.find(p => p.id === product.product_id);
                    const amount = productConsult.quantity_available - product.quantity;
                    await Product.update({ quantity_available: amount }, { where: { id: product.product_id }, transaction });
                }
    
                const sale = await Sale.create({ user_id: data.user_id }, { transaction });
    
                const saleDetails = data.products.map(product => ({
                    sale_id: sale.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    price: product.price
                }));
                await SaleDetail.bulkCreate(saleDetails, { transaction });
    
                await transaction.commit();
    
                res.status(201).json({
                    ok: true,
                    status: 201,
                    message: "Compra realizada exitosamente",
                    body: sale
                });
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al realizar la compra"
            });
        }
    }
}

module.exports = new SaleService();
