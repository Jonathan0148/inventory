const userService = require("../services/user.service");

class UserController {
    async findAll(req, res) {
        try {
            const data = await userService.findAll();
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
                message: "Error al obtener los usuarios"
            });
        }
    }

    async findOne(req, res) {
        const id = req.params.id;
        try {
            const data = await userService.findOne(id);
            if (!data){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un usuario con el ID ${id}`
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
                message: `Error al obtener usuario por ID ${id}`
            });
        }
    }

    async create(req, res) {
        const data = req.body;
        if (!data.name || !data.email || !data.password || !data.is_admin) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }

        try {
            const user = await userService.create(data);
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Usuario creado exitosamente",
                body: user
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al crear usuario"
            });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const data = req.body;

        try {
            const exist = await userService.findOne(id);
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un usuario con el ID ${id}`
                });
            }
            const user = await userService.update(id, data);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Usuario actualizado exitosamente",
                body: user
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al actualizar el usuario"
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const exist = await userService.findOne(id);
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un usuario con el ID ${id}`
                });
            }
            await userService.delete(id);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Usuario eliminado exitosamente"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                status: 500,
                message: "Error al eliminar usuario"
            });
        }
    }
}

module.exports = new UserController();