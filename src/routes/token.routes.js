const express = require('express');
const tokenControllers = require('../controllers/token.controller');

const router = express.Router();

router.post('/token-auth', tokenControllers.tokenAuth);

module.exports = router;