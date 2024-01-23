const Product = require("../models/product.model");

class ProductService {
    async findAll(req, res) {
        try {
            const data = await Product.findAll();
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
        const data = await Product.findOne({ where: { id } });
        try {
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
                message: `Error al obtener producto por ID ${id}`
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

        const lot_number = data.lot_number;
        const validateProduct = await Product.findOne({ where: { lot_number } });
        if (validateProduct){
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El número de lote ingresado ya existe"
            });
        }

        try {
            await Product.sync();
            const product = await Product.create(data);
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
            const exist = await Product.findOne({ where: { id } });
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un producto con el ID ${id}`
                });
            }
            
            const product = await Product.update(data, { where: { id } });
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
            const exist = await Product.findOne({ where: { id } });
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un producto con el ID ${id}`
                });
            }
            await Product.destroy({ where: { id } });
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
                message: "Error al eliminar producto"
            });
        }
    }
}

module.exports = new ProductService();
