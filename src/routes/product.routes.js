const express = require('express');
const prodControllers = require('../controllers/product.controller')

const router = express.Router();

router.get('/:id', prodControllers.getProductDetails);