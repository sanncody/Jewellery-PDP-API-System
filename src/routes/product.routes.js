const express = require('express');
const prodControllers = require('../controllers/product.controller')

const router = express.Router();

/* Create Product */
router.post('/create', prodControllers.createProduct);

/* Get All Products */
router.get('/', prodControllers.getAllProducts);

/* Calculate Pricing route */
router.get('/calcPrice', prodControllers.calculateProductPricing);

/* Check Product Availability whether it is out of stock or not on basis of metal, purity, ringSize */
router.get('/availability', prodControllers.checkProdAvailability);

/* Get Particular Product details */
router.get('/:prodId', prodControllers.getProductDetails);


module.exports = router;