const express = require('express');
const metalControllers = require('../controllers/metal.controller');

const router = express.Router();

/* Create Metal */
router.post('/create', metalControllers.createMetalInfo);

/* Get All Metals */
router.get('/', metalControllers.getAllMetals);

/* Get Particular Metal details */
router.get('/:metalId', metalControllers.getMetalDetails);


module.exports = router;