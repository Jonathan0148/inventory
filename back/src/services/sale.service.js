const Sale = require("../models/sale.model");
const SaleDetail = require("../models/saleDetail.model");

class SaleService {
    async findAll() {
        return await Sale.findAll();
    }

    async findOne(id) {
        return await Sale.findOne({ where: { id } });
    }

    async create(data) {
        await Sale.sync();
        const sale = await Sale.create({ user_id: data.user_id });

        const saleDetails = data.products.map(product => ({
            sale_id: sale.id,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price
        }));
        await SaleDetail.sync();
        await SaleDetail.bulkCreate(saleDetails);

        return sale;
    }
}

module.exports = new SaleService();
