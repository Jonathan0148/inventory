const { verifyToken } = require("../helpers/generateToken.helper")

const checkAuth = async (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "No autorizado"
        });
    }
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    if (tokenData){
        next()
    }else{
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Debe iniciar sesión primero"
        });
    }
}

module.exports = checkAuth