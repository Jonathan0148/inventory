const User = require("../models/user.model");
const { compare } = require("../helpers/handleBcrypt.helper");
const { tokenSign } = require("../helpers/generateToken.helper");

class AuthService {
    async login(req, res) {
        const data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Faltan campos obligatorios en la solicitud"
            });
        }

        const email = data.email;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: `No existe un usuario registrado con el correo ${data.email}`
            });
        }
        
        const checkPassword = await compare(data.password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "La contraseña ingresada es incorrecta"
            });
        }

        const token = await tokenSign(user)

        res.status(200).json({
            ok: true,
            status: 200,
            body: user,
            token
        });
    }
}

module.exports = new AuthService();
