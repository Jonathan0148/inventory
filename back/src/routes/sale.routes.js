const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth.middleware")
const checkRoleAuth = require("../middleware/roleAuth.middleware")

const saleController = require("../controllers/sale.controller");

router.get("/sales", checkAuth, checkRoleAuth(['admin']), saleController.findAll);
router.get("/sales/:id", checkAuth, checkRoleAuth(['admin']), saleController.findOne);
router.post("/sales", checkAuth, checkRoleAuth(['client', 'admin']), saleController.create);

module.exports = router;