const express = require('express');
const diamondControllers = require('../controllers/diamond.controller');

const router = express.Router();

/* Create Diamond Info */
router.post('/create', diamondControllers.createDiamondInfo);

/* Get All Diamonds Info */
router.get('/', diamondControllers.getAllDiamonds);

/* Get Particular Diamond details */
router.get('/:diamondId', diamondControllers.getDiamondDetails);


module.exports = router;