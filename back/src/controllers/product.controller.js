const productService = require("../services/product.service");

class ProductController {
    async findAll(req, res) {
        try {
            const data = await productService.findAll();
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
                message: "Error al obtener los productos"
            });
        }
    }

    async findOne(req, res) {
        const id = req.params.id;
        try {
            const data = await productService.findOne(id);
            if (!data){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un producto con el ID ${id}`
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
                message: `Error al obtener el producto por ID ${id}`
            });
        }
    }

    async create(req, res) {
        const data = req.body;
        if (!data.lot_number || !data.name || !data.price || !data.quantity_available) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }

        try {
            const product = await productService.create(data);
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Producto creado exitosamente",
                body: product
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al crear el producto"
            });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const data = req.body;

        try {
            const exist = await productService.findOne(id);
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un producto con el ID ${id}`
                });
            }
            const product = await productService.update(id, data);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Producto actualizado exitosamente",
                body: product
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al actualizar el producto"
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const exist = await productService.findOne(id);
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un producto con el ID ${id}`
                });
            }
            await productService.delete(id);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Producto eliminado exitosamente"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al eliminar el producto"
            });
        }
    }
}

module.exports = new ProductController();