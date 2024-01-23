const jwt = require("jsonwebtoken")

const tokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }