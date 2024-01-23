const User = require("../models/user.model");
const { compare } = require("../helpers/handleBcrypt.helper");

class AuthService {
    async findOne(email) {
        return await User.findOne({ where: { email } });
    }

    async login(password, user) {
        const checkPassword = await compare(password, user.password);

        if (!checkPassword) return false

        return true;
    }
}

module.exports = new AuthService();
