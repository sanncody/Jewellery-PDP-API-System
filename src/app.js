const express = require('express');
const productRoutes = require('./routes/product.routes');
const errorHandlingMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

/* Using Routes */
app.use('/api/products', productRoutes);

/* Error Handling Middleware */
app.use(errorHandlingMiddleware);

module.exports = app;