const { verifyToken } = require('../helpers/generateToken.helper');

const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
};

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Token no proporcionado',
      });
    }

    const tokenData = await verifyToken(token);

    const userRole = tokenData.is_admin ? ROLES.ADMIN : ROLES.CLIENT;

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: 'No tienes permisos para esta ruta',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error interno del servidor',
    });
  }
};

module.exports = checkRoleAuth;