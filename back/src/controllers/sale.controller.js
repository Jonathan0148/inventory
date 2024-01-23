const saleService = require("../services/sale.service");

class SaleController {
    async findAll(req, res) {
        return await saleService.findAll(req, res);
    }

    async findOne(req, res) {
        return await saleService.findOne(req, res);
    }

    async create(req, res) {
        return await saleService.create(req, res);
    }
}

module.exports = new SaleController();