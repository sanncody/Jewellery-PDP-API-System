const express = require('express');
const diamondControllers = require('../controllers/diamond.controller');

const router = express.Router();

/**
 * @swagger
 * /api/diamonds/create:
 *   post:
 *     summary: Create a new diamond entry
 *     description: Create a new diamond information entry with carat, quality, and price per carat
 *     tags: [Diamonds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carat
 *               - pricePerCarat
 *             properties:
 *               carat:
 *                 type: number
 *                 format: decimal
 *                 description: Carat weight of the diamond
 *                 example: 1.50
 *               quality:
 *                 type: string
 *                 description: Quality grade of the diamond (e.g., VS1, VS2, SI1, etc.)
 *                 example: "VS1"
 *               pricePerCarat:
 *                 type: number
 *                 format: decimal
 *                 description: Price per carat for the diamond
 *                 example: 50000.00
 *     responses:
 *       201:
 *         description: Diamond information created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     diamond_id:
 *                       type: integer
 *                       description: Unique diamond identifier
 *                       example: 1
 *                     diamond_carat:
 *                       type: number
 *                       format: decimal
 *                       example: 1.50
 *                     diamond_quality:
 *                       type: string
 *                       example: "VS1"
 *                     diamond_price_per_carat:
 *                       type: number
 *                       format: decimal
 *                       example: 50000.00
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Internal server error
 */
router.post('/create', diamondControllers.createDiamondInfo);

/**
 * @swagger
 * /api/diamonds:
 *   get:
 *     summary: Get all diamonds
 *     description: Retrieve a list of all available diamond information
 *     tags: [Diamonds]
 *     responses:
 *       200:
 *         description: Successfully retrieved all diamonds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       diamond_id:
 *                         type: integer
 *                         description: Unique diamond identifier
 *                         example: 1
 *                       diamond_carat:
 *                         type: number
 *                         format: decimal
 *                         description: Carat weight of the diamond
 *                         example: 1.50
 *                       diamond_quality:
 *                         type: string
 *                         description: Quality grade of the diamond
 *                         example: "VS1"
 *                       diamond_price_per_carat:
 *                         type: number
 *                         format: decimal
 *                         description: Price per carat for the diamond
 *                         example: 50000.00
 *       500:
 *         description: Internal server error
 */
router.get('/', diamondControllers.getAllDiamonds);

/**
 * @swagger
 * /api/diamonds/{diamondId}:
 *   get:
 *     summary: Get diamond details by ID
 *     description: Retrieve detailed information about a specific diamond by its ID
 *     tags: [Diamonds]
 *     parameters:
 *       - in: path
 *         name: diamondId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique diamond identifier
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved diamond details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     diamond_id:
 *                       type: integer
 *                       description: Unique diamond identifier
 *                       example: 1
 *                     diamond_carat:
 *                       type: number
 *                       format: decimal
 *                       description: Carat weight of the diamond
 *                       example: 1.50
 *                     diamond_quality:
 *                       type: string
 *                       description: Quality grade of the diamond
 *                       example: "VS1"
 *                     diamond_price_per_carat:
 *                       type: number
 *                       format: decimal
 *                       description: Price per carat for the diamond
 *                       example: 50000.00
 *       400:
 *         description: Bad request - Diamond ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Diamond Id is required to fetch particular diamond details"
 *       500:
 *         description: Internal server error
 */
router.get('/:diamondId', diamondControllers.getDiamondDetails);


module.exports = router;