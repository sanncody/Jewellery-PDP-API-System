const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const productRoutes = require('./routes/product.routes');
const metalRoutes = require('./routes/metal.routes');
const diamondRoutes = require('./routes/diamond.routes');
const tokenRoutes = require('./routes/token.routes');

const globalErrorHandler = require('./middlewares/globalErrorHandler.middleware');

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


/* Using Routes */

// Product Routes
app.use('/api/products', productRoutes);

// Metal Routes
app.use('/api/metals', metalRoutes);

// Diamond Routes
app.use('/api/diamonds', diamondRoutes);

// Implementing access and refresh tokens
app.use('/api/token', tokenRoutes);

/* Error Handling Middleware */
app.use(globalErrorHandler);

module.exports = app;