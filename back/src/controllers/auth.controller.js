const authService = require("../services/auth.service");

class AuthController {
    async login(req, res) {
        return await authService.login(req, res);
    }
}

module.exports = new AuthController();