const User = require("../models/user.model");
const { encrypt } = require("../helpers/handleBcrypt.helper")

class UserService {
    async findAll(req, res) {
        try {
            const data = await User.findAll();
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
            const data = await User.findOne({ where: { id } });    
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

        if (!data.name || !data.email || !data.password) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }

        const email = data.email;
        const validateEmail = await User.findOne({ where: { email } });
        if (validateEmail){
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El correo ingresado ya existe"
            });
        }
        try {
            await User.sync();
            const { password } = data
            const passwordHash = await encrypt(password)
    
            const user = await User.create({
                name: data.name,
                email: data.email,
                password: passwordHash,
                is_admin: data.is_admin
            })
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
            const exist = await User.findOne({ where: { id } });    
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un usuario con el ID ${id}`
                });
            }
            const user = await User.update({
                name: data.name
            }, { where: { id } });

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
            const exist = await User.findOne({ where: { id } });    
            if (!exist){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: `No existe un usuario con el ID ${id}`
                });
            }
            await User.destroy({ where: { id } });
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

module.exports = new UserService();