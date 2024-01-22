const Product = require("../models/product.model");

class ProductService {
    async findAll() {
        return await Product.findAll();
    }

    async findOne(id) {
        return await Product.findOne({ where: { id } });
    }

    async create(data) {
        await Product.sync();
        return await Product.create(data);
    }

    async update(id, data) {
        return await Product.update(data, { where: { id } });
    }

    async delete(id) {
        await Product.destroy({ where: { id } });
    }
}

module.exports = new ProductService();
