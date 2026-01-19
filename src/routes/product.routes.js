const express = require('express');
const prodControllers = require('../controllers/product.controller')

const router = express.Router();


/* Get All Products */
router.get('/', prodControllers.getAllProducts);

/* Get Particular Product details */
router.get('/:prodId', prodControllers.getProductDetails);

/* Calculate Pricing route */
router.post('/calcPrice', prodControllers.calculateProductPricing);


module.exports = router;