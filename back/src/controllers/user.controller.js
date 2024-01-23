const userService = require("../services/user.service");

class UserController {
    async findAll(req, res) {
        return await userService.findAll(req, res);
    }

    async findOne(req, res) {
        return await userService.findOne(req, res);
    }

    async create(req, res) {
        return await userService.create(req, res);
    }

    async update(req, res) {
        return await userService.update(req, res);
    }

    async delete(req, res) {
        return await userService.delete(req, res);
    }
}

module.exports = new UserController();