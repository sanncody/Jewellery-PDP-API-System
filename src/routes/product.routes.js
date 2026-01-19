const express = require('express');
const prodControllers = require('../controllers/product.controller')

const router = express.Router();


router.get('/', prodControllers.getAllProducts);
router.get('/:prodId', prodControllers.getProductDetails);

module.exports = router;