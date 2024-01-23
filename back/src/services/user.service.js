const User = require("../models/user.model");
const { encrypt } = require("../helpers/handleBcrypt.helper")

class UserService {
    async findAll() {
        return await User.findAll();
    }

    async findOne(id) {
        return await User.findOne({ where: { id } });
    }

    async create(data) {
        await User.sync();
        const { password } = data
        const passwordHash = await encrypt(password)

        return await User.create({
            name: data.name,
            email: data.email,
            password: passwordHash,
            is_admin: data.is_admin
        })
    }

    async update(id, data) {
        return await User.update({
            name: data.name
        }, { where: { id } });
    }

    async delete(id) {
        await User.destroy({ where: { id } });
    }
}

module.exports = new UserService();