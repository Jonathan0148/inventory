const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth.middleware")
const checkRoleAuth = require("../middleware/roleAuth.middleware")

const productController = require("../controllers/product.controller");

router.get("/products", checkAuth, checkRoleAuth(['admin']), productController.findAll);
router.get("/products/:id", checkAuth, checkRoleAuth(['admin']), productController.findOne);
router.post("/products", checkAuth, checkRoleAuth(['admin']), productController.create);
router.put("/products/:id", checkAuth, checkRoleAuth(['admin']), productController.update);
router.delete("/products/:id", checkAuth, checkRoleAuth(['admin']), productController.delete);

module.exports = router;