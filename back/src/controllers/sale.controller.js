const saleService = require("../services/sale.service");

class SaleController {
    async findAll(req, res) {
        try {
            const data = await saleService.findAll();
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
            const data = await saleService.findOne(id);
            if (!data){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe una venta con el ID ${id}`
                });
            }
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
                message: `Error al obtener venta por ID ${id}`
            });
        }
    }

    async create(req, res) {
        const data = req.body;
        if (!data.user_id) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }

        try {
            const sale = await saleService.create(data);
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Compra realizada exitosamente",
                body: sale
            });
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

module.exports = new SaleController();