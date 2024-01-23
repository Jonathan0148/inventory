require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/product.routes");
const saleRoutes = require("../routes/sale.routes")

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Inventario');
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", saleRoutes);

module.exports = app;