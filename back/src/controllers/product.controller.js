const productService = require("../services/product.service");

class ProductController {
    async findAll(req, res) {
        return await productService.findAll(req, res);
    }

    async findOne(req, res) {
        return await productService.findOne(req, res);
    }

    async create(req, res) {
        return await productService.create(req, res);
    }

    async update(req, res) {
        return await productService.update(req, res);
    }

    async delete(req, res) {
        return await productService.delete(req, res);
    }
}

module.exports = new ProductController();