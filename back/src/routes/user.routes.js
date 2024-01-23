const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth.middleware")
const checkRoleAuth = require("../middleware/roleAuth.middleware")

const userController = require("../controllers/user.controller");

router.get("/users", checkAuth, checkRoleAuth(['admin']), userController.findAll);
router.get("/users/:id", checkAuth, checkRoleAuth(['admin']), userController.findOne);
router.post("/users", checkAuth, checkRoleAuth(['admin']), userController.create);
router.put("/users/:id", checkAuth, checkRoleAuth(['admin']), userController.update);
router.delete("/users/:id", checkAuth, checkRoleAuth(['admin']), userController.delete);

module.exports = router;