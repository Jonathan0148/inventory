require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const productRoutes = require("../routes/product.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Inventario');
});

app.use("/api/v1", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = app;