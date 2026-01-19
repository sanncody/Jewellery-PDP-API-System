const express = require('express');

const app = express();

app.use(express.json());

/* Using Routes */
app.use('/api/products', productRoutes);

module.exports = app;