const express = require('express');

const productRoutes = require('./routes/product.routes');
const metalRoutes = require('./routes/metal.routes');
const diamondRoutes = require('./routes/diamond.routes');

const errorHandlingMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

/* Using Routes */

// Product Routes
app.use('/api/products', productRoutes);

// Metal Routes
app.use('/api/metals', metalRoutes);

// Diamond Routes
app.use('/api/diamonds', diamondRoutes);


/* Error Handling Middleware */
app.use(errorHandlingMiddleware);

module.exports = app;